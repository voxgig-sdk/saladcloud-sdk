import { SaladcloudEntityBase } from '../SaladcloudEntityBase';
import type { SaladcloudSDK } from '../SaladcloudSDK';
import type { Control } from '../types';
import type { Container, ContainerLoadMatch, ContainerListMatch, ContainerCreateData, ContainerUpdateData, ContainerRemoveMatch } from '../SaladcloudTypes';
declare class ContainerEntity extends SaladcloudEntityBase<Container> {
    constructor(client: SaladcloudSDK, entopts: any);
    make(this: ContainerEntity): ContainerEntity;
    load(this: any, reqmatch?: ContainerLoadMatch, ctrl?: Control): Promise<ContainerEntity>;
    list(this: any, reqmatch?: ContainerListMatch, ctrl?: Control): Promise<ContainerEntity[]>;
    create(this: any, reqdata?: ContainerCreateData, ctrl?: Control): Promise<ContainerEntity>;
    update(this: any, reqdata?: ContainerUpdateData, ctrl?: Control): Promise<ContainerEntity>;
    remove(this: any, reqmatch?: ContainerRemoveMatch, ctrl?: Control): Promise<ContainerEntity>;
}
export { ContainerEntity };
