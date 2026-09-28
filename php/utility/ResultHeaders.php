<?php
declare(strict_types=1);

// Saladcloud SDK utility: result_headers

class SaladcloudResultHeaders
{
    public static function call(SaladcloudContext $ctx): ?SaladcloudResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
