<?php
declare(strict_types=1);

// Saladcloud SDK base feature

class SaladcloudBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(SaladcloudContext $ctx, array $options): void {}
    public function PostConstruct(SaladcloudContext $ctx): void {}
    public function PostConstructEntity(SaladcloudContext $ctx): void {}
    public function SetData(SaladcloudContext $ctx): void {}
    public function GetData(SaladcloudContext $ctx): void {}
    public function GetMatch(SaladcloudContext $ctx): void {}
    public function SetMatch(SaladcloudContext $ctx): void {}
    public function PrePoint(SaladcloudContext $ctx): void {}
    public function PreSpec(SaladcloudContext $ctx): void {}
    public function PreRequest(SaladcloudContext $ctx): void {}
    public function PreResponse(SaladcloudContext $ctx): void {}
    public function PreResult(SaladcloudContext $ctx): void {}
    public function PreDone(SaladcloudContext $ctx): void {}
    public function PreUnexpected(SaladcloudContext $ctx): void {}
}
