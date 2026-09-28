import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { LogEntry, LogEntryCreateData } from '../SaladcloudTypes';
declare class LogEntryEntity extends SaladcloudEntityBase<LogEntry> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: LogEntryEntity): LogEntryEntity;
    create(this: any, reqdata?: LogEntryCreateData, ctrl?: Control): Promise<LogEntryEntity>;
}
export { LogEntryEntity };
