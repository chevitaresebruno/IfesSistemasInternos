import api from "../utils/AxiosConfig";
import BaseEntity, { ID } from "./BaseEntity";
import BaseService from "./BaseService";


export default class CrudService<T extends BaseEntity> extends BaseService
{
    public constructor(entityName: string)
    {
        super( `${process.env.REACT_APP_API_URL}/${entityName}`);
    }

    public async list(): Promise<T[]>
    {
        return await (await api.get(this.url)).data as T[];
    }

    public async getById(id: ID): Promise<T>
    {
        return (await api.get(this.idUrl(id))).data as T;
    }

    public async save(entity: T): Promise<any>
    {
        if(entity.id)
            { return (await api.put(this.idUrl(entity.id), entity)).data; }

        let response = await api.post(this.url, entity);

        entity.id = response.data.id;

        return response;
    }

    public async delete(entity: T): Promise<any>
    {
        return (await api.delete(this.idUrl(entity.id))).data;
    }
}

