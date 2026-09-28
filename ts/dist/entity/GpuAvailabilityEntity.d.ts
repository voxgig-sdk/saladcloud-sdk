import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { GpuAvailability, GpuAvailabilityCreateData } from '../SaladcloudTypes';
declare class GpuAvailabilityEntity extends SaladcloudEntityBase<GpuAvailability> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: GpuAvailabilityEntity): GpuAvailabilityEntity;
    create(this: any, reqdata?: GpuAvailabilityCreateData, ctrl?: Control): Promise<GpuAvailabilityEntity>;
}
export { GpuAvailabilityEntity };
