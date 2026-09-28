import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { GpuClass, GpuClassListMatch } from '../SaladcloudTypes';
declare class GpuClassEntity extends SaladcloudEntityBase<GpuClass> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: GpuClassEntity): GpuClassEntity;
    list(this: any, reqmatch?: GpuClassListMatch, ctrl?: Control): Promise<GpuClassEntity[]>;
}
export { GpuClassEntity };
