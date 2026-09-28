import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { WebhookSecretKey, WebhookSecretKeyLoadMatch, WebhookSecretKeyCreateData } from '../SaladcloudTypes';
declare class WebhookSecretKeyEntity extends SaladcloudEntityBase<WebhookSecretKey> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: WebhookSecretKeyEntity): WebhookSecretKeyEntity;
    load(this: any, reqmatch?: WebhookSecretKeyLoadMatch, ctrl?: Control): Promise<WebhookSecretKeyEntity>;
    create(this: any, reqdata?: WebhookSecretKeyCreateData, ctrl?: Control): Promise<WebhookSecretKeyEntity>;
}
export { WebhookSecretKeyEntity };
