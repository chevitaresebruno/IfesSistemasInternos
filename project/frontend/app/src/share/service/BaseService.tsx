import BaseEntity, { ID } from "./BaseEntity";


export default abstract class BaseService
{
    protected url: string;

    public constructor(url: string)
    {
        this.url = url;
    }

    protected idUrl(id: ID): string
    {
        return `${this.url}${id}`;
    }
}

