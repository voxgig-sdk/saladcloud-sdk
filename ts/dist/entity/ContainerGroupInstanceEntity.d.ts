import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { ContainerGroupInstance, ContainerGroupInstanceListMatch, ContainerGroupInstanceUpdateData } from '../SaladcloudTypes';
declare class ContainerGroupInstanceEntity extends SaladcloudEntityBase<ContainerGroupInstance> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: ContainerGroupInstanceEntity): ContainerGroupInstanceEntity;
    list(this: any, reqmatch?: ContainerGroupInstanceListMatch, ctrl?: Control): Promise<ContainerGroupInstanceEntity[]>;
    update(this: any, reqdata?: ContainerGroupInstanceUpdateData, ctrl?: Control): Promise<ContainerGroupInstanceEntity>;
}
export { ContainerGroupInstanceEntity };
