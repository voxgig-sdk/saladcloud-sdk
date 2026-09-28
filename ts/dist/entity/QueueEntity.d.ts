import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { Queue, QueueLoadMatch, QueueListMatch, QueueCreateData, QueueUpdateData, QueueRemoveMatch } from '../SaladcloudTypes';
declare class QueueEntity extends SaladcloudEntityBase<Queue> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: QueueEntity): QueueEntity;
    load(this: any, reqmatch?: QueueLoadMatch, ctrl?: Control): Promise<QueueEntity>;
    list(this: any, reqmatch?: QueueListMatch, ctrl?: Control): Promise<QueueEntity[]>;
    create(this: any, reqdata?: QueueCreateData, ctrl?: Control): Promise<QueueEntity>;
    update(this: any, reqdata?: QueueUpdateData, ctrl?: Control): Promise<QueueEntity>;
    remove(this: any, reqmatch?: QueueRemoveMatch, ctrl?: Control): Promise<QueueEntity>;
}
export { QueueEntity };
