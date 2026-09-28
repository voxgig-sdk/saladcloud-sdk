import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { CpuAvailability, CpuAvailabilityCreateData } from '../SaladcloudTypes';
declare class CpuAvailabilityEntity extends SaladcloudEntityBase<CpuAvailability> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: CpuAvailabilityEntity): CpuAvailabilityEntity;
    create(this: any, reqdata?: CpuAvailabilityCreateData, ctrl?: Control): Promise<CpuAvailabilityEntity>;
}
export { CpuAvailabilityEntity };
