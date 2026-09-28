import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { Quota, QuotaLoadMatch } from '../SaladcloudTypes';
declare class QuotaEntity extends SaladcloudEntityBase<Quota> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: QuotaEntity): QuotaEntity;
    load(this: any, reqmatch?: QuotaLoadMatch, ctrl?: Control): Promise<QuotaEntity>;
}
export { QuotaEntity };
