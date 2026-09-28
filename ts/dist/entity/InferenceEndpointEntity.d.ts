import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { InferenceEndpoint, InferenceEndpointLoadMatch, InferenceEndpointListMatch, InferenceEndpointRemoveMatch } from '../SaladcloudTypes';
declare class InferenceEndpointEntity extends SaladcloudEntityBase<InferenceEndpoint> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: InferenceEndpointEntity): InferenceEndpointEntity;
    load(this: any, reqmatch?: InferenceEndpointLoadMatch, ctrl?: Control): Promise<InferenceEndpointEntity>;
    list(this: any, reqmatch?: InferenceEndpointListMatch, ctrl?: Control): Promise<InferenceEndpointEntity[]>;
    remove(this: any, reqmatch?: InferenceEndpointRemoveMatch, ctrl?: Control): Promise<InferenceEndpointEntity>;
}
export { InferenceEndpointEntity };
