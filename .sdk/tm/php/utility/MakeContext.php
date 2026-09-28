<?php
declare(strict_types=1);

// Saladcloud SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class SaladcloudMakeContext
{
    public static function call(array $ctxmap, ?SaladcloudContext $basectx): SaladcloudContext
    {
        return new SaladcloudContext($ctxmap, $basectx);
    }
}
