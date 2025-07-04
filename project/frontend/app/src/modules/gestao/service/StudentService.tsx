import { ID } from "../../../share/service/BaseEntity";
import CrudService from "../../../share/service/CrudService";
import api from "../../../share/utils/AxiosConfig";
import { Student, StudentNew, StudentRead, StudentWrite } from "../types/Student";


export default class StudentService extends CrudService<Student>
{
    public constructor()
    {
        super("student");
    }

    override async list(): Promise<Student[]>
    {
        return (await super.list()) as StudentRead[];    
    }

    override async getById(id: ID): Promise<StudentRead>
    {
        return (await super.getById(id)) as StudentRead;
    }

    public async new(student: StudentNew): Promise<any>
    {
        return (await api.post(`${this.url}/`, student)).data;
    }
}

