<?php
declare(strict_types=1);

// Saladcloud SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class SaladcloudSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new SaladcloudUtility();
        $this->_utility = $utility;

        $config = SaladcloudConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = SaladcloudHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = SaladcloudHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!SaladcloudFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, SaladcloudFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return SaladcloudUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = SaladcloudHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = SaladcloudHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = SaladcloudHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new SaladcloudSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new SaladcloudError($op . "_allow",
                "SaladcloudSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = SaladcloudHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = SaladcloudHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new SaladcloudError("graphql_error",
                "SaladcloudSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_container = null;

    // Canonical facade: $client->Container()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->container()
    // resolves here too.
    public function Container($data = null)
    {
        require_once __DIR__ . '/entity/container_entity.php';
        if ($data === null) {
            if ($this->_container === null) {
                $this->_container = new ContainerEntity($this, null);
            }
            return $this->_container;
        }
        return new ContainerEntity($this, $data);
    }


    private $_container_group = null;

    // Canonical facade: $client->ContainerGroup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->container_group()
    // resolves here too.
    public function ContainerGroup($data = null)
    {
        require_once __DIR__ . '/entity/container_group_entity.php';
        if ($data === null) {
            if ($this->_container_group === null) {
                $this->_container_group = new ContainerGroupEntity($this, null);
            }
            return $this->_container_group;
        }
        return new ContainerGroupEntity($this, $data);
    }


    private $_container_group_instance = null;

    // Canonical facade: $client->ContainerGroupInstance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->container_group_instance()
    // resolves here too.
    public function ContainerGroupInstance($data = null)
    {
        require_once __DIR__ . '/entity/container_group_instance_entity.php';
        if ($data === null) {
            if ($this->_container_group_instance === null) {
                $this->_container_group_instance = new ContainerGroupInstanceEntity($this, null);
            }
            return $this->_container_group_instance;
        }
        return new ContainerGroupInstanceEntity($this, $data);
    }


    private $_cpu_availability = null;

    // Canonical facade: $client->CpuAvailability()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cpu_availability()
    // resolves here too.
    public function CpuAvailability($data = null)
    {
        require_once __DIR__ . '/entity/cpu_availability_entity.php';
        if ($data === null) {
            if ($this->_cpu_availability === null) {
                $this->_cpu_availability = new CpuAvailabilityEntity($this, null);
            }
            return $this->_cpu_availability;
        }
        return new CpuAvailabilityEntity($this, $data);
    }


    private $_gpu_availability = null;

    // Canonical facade: $client->GpuAvailability()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gpu_availability()
    // resolves here too.
    public function GpuAvailability($data = null)
    {
        require_once __DIR__ . '/entity/gpu_availability_entity.php';
        if ($data === null) {
            if ($this->_gpu_availability === null) {
                $this->_gpu_availability = new GpuAvailabilityEntity($this, null);
            }
            return $this->_gpu_availability;
        }
        return new GpuAvailabilityEntity($this, $data);
    }


    private $_gpu_class = null;

    // Canonical facade: $client->GpuClass()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->gpu_class()
    // resolves here too.
    public function GpuClass($data = null)
    {
        require_once __DIR__ . '/entity/gpu_class_entity.php';
        if ($data === null) {
            if ($this->_gpu_class === null) {
                $this->_gpu_class = new GpuClassEntity($this, null);
            }
            return $this->_gpu_class;
        }
        return new GpuClassEntity($this, $data);
    }


    private $_inference_endpoint = null;

    // Canonical facade: $client->InferenceEndpoint()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->inference_endpoint()
    // resolves here too.
    public function InferenceEndpoint($data = null)
    {
        require_once __DIR__ . '/entity/inference_endpoint_entity.php';
        if ($data === null) {
            if ($this->_inference_endpoint === null) {
                $this->_inference_endpoint = new InferenceEndpointEntity($this, null);
            }
            return $this->_inference_endpoint;
        }
        return new InferenceEndpointEntity($this, $data);
    }


    private $_inference_endpoint_job = null;

    // Canonical facade: $client->InferenceEndpointJob()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->inference_endpoint_job()
    // resolves here too.
    public function InferenceEndpointJob($data = null)
    {
        require_once __DIR__ . '/entity/inference_endpoint_job_entity.php';
        if ($data === null) {
            if ($this->_inference_endpoint_job === null) {
                $this->_inference_endpoint_job = new InferenceEndpointJobEntity($this, null);
            }
            return $this->_inference_endpoint_job;
        }
        return new InferenceEndpointJobEntity($this, $data);
    }


    private $_inference_endpoint_job_collection = null;

    // Canonical facade: $client->InferenceEndpointJobCollection()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->inference_endpoint_job_collection()
    // resolves here too.
    public function InferenceEndpointJobCollection($data = null)
    {
        require_once __DIR__ . '/entity/inference_endpoint_job_collection_entity.php';
        if ($data === null) {
            if ($this->_inference_endpoint_job_collection === null) {
                $this->_inference_endpoint_job_collection = new InferenceEndpointJobCollectionEntity($this, null);
            }
            return $this->_inference_endpoint_job_collection;
        }
        return new InferenceEndpointJobCollectionEntity($this, $data);
    }


    private $_log_entry = null;

    // Canonical facade: $client->LogEntry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->log_entry()
    // resolves here too.
    public function LogEntry($data = null)
    {
        require_once __DIR__ . '/entity/log_entry_entity.php';
        if ($data === null) {
            if ($this->_log_entry === null) {
                $this->_log_entry = new LogEntryEntity($this, null);
            }
            return $this->_log_entry;
        }
        return new LogEntryEntity($this, $data);
    }


    private $_queue = null;

    // Canonical facade: $client->Queue()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->queue()
    // resolves here too.
    public function Queue($data = null)
    {
        require_once __DIR__ . '/entity/queue_entity.php';
        if ($data === null) {
            if ($this->_queue === null) {
                $this->_queue = new QueueEntity($this, null);
            }
            return $this->_queue;
        }
        return new QueueEntity($this, $data);
    }


    private $_quota = null;

    // Canonical facade: $client->Quota()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->quota()
    // resolves here too.
    public function Quota($data = null)
    {
        require_once __DIR__ . '/entity/quota_entity.php';
        if ($data === null) {
            if ($this->_quota === null) {
                $this->_quota = new QuotaEntity($this, null);
            }
            return $this->_quota;
        }
        return new QuotaEntity($this, $data);
    }


    private $_system_log = null;

    // Canonical facade: $client->SystemLog()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->system_log()
    // resolves here too.
    public function SystemLog($data = null)
    {
        require_once __DIR__ . '/entity/system_log_entity.php';
        if ($data === null) {
            if ($this->_system_log === null) {
                $this->_system_log = new SystemLogEntity($this, null);
            }
            return $this->_system_log;
        }
        return new SystemLogEntity($this, $data);
    }


    private $_webhook_secret_key = null;

    // Canonical facade: $client->WebhookSecretKey()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->webhook_secret_key()
    // resolves here too.
    public function WebhookSecretKey($data = null)
    {
        require_once __DIR__ . '/entity/webhook_secret_key_entity.php';
        if ($data === null) {
            if ($this->_webhook_secret_key === null) {
                $this->_webhook_secret_key = new WebhookSecretKeyEntity($this, null);
            }
            return $this->_webhook_secret_key;
        }
        return new WebhookSecretKeyEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new SaladcloudSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
