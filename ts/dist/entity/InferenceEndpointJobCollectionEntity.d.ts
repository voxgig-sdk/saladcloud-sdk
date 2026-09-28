import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { InferenceEndpointJobCollection, InferenceEndpointJobCollectionListMatch } from '../SaladcloudTypes';
declare class InferenceEndpointJobCollectionEntity extends SaladcloudEntityBase<InferenceEndpointJobCollection> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: InferenceEndpointJobCollectionEntity): InferenceEndpointJobCollectionEntity;
    list(this: any, reqmatch?: InferenceEndpointJobCollectionListMatch, ctrl?: Control): Promise<InferenceEndpointJobCollectionEntity[]>;
}
export { InferenceEndpointJobCollectionEntity };
