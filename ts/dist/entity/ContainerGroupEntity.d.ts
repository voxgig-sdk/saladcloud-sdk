import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { ContainerGroup, ContainerGroupLoadMatch, ContainerGroupCreateData } from '../SaladcloudTypes';
declare class ContainerGroupEntity extends SaladcloudEntityBase<ContainerGroup> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: ContainerGroupEntity): ContainerGroupEntity;
    load(this: any, reqmatch?: ContainerGroupLoadMatch, ctrl?: Control): Promise<ContainerGroupEntity>;
    create(this: any, reqdata?: ContainerGroupCreateData, ctrl?: Control): Promise<ContainerGroupEntity>;
}
export { ContainerGroupEntity };
