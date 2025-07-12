import BaseEntity, { ID } from "../service/BaseEntity";


export function findEntity<T extends BaseEntity>(entity: T[], id: ID): T | undefined
{
    return entity.find(e => e.id == id);
}

