import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { SystemLog, SystemLogListMatch } from '../SaladcloudTypes';
declare class SystemLogEntity extends SaladcloudEntityBase<SystemLog> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: SystemLogEntity): SystemLogEntity;
    list(this: any, reqmatch?: SystemLogListMatch, ctrl?: Control): Promise<SystemLogEntity[]>;
}
export { SystemLogEntity };
