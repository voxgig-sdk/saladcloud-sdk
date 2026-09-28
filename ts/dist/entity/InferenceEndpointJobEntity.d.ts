import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { InferenceEndpointJob, InferenceEndpointJobLoadMatch, InferenceEndpointJobCreateData } from '../SaladcloudTypes';
declare class InferenceEndpointJobEntity extends SaladcloudEntityBase<InferenceEndpointJob> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: InferenceEndpointJobEntity): InferenceEndpointJobEntity;
    load(this: any, reqmatch?: InferenceEndpointJobLoadMatch, ctrl?: Control): Promise<InferenceEndpointJobEntity>;
    create(this: any, reqdata?: InferenceEndpointJobCreateData, ctrl?: Control): Promise<InferenceEndpointJobEntity>;
}
export { InferenceEndpointJobEntity };
