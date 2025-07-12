import { ID } from "../../../share/service/BaseEntity";
import CrudService from "../../../share/service/CrudService";
import api from "../../../share/utils/AxiosConfig";
import { Student, StudentAcompanhar, StudentNew, StudentRead, StudentWrite } from "../types/Student";
import { backendDateFormat } from "../../../share/utils/DateHandler";
import { Auxilio, AuxilioRelation } from "../types/Auxilio";


interface StudentMasker extends ConvertDatesToString<Student>
{
    matrCode: string;
}


function studentMasker(student: Student): StudentMasker
{
    return {
            ...student,
            bornDate: backendDateFormat(student.bornDate),
            ingresseDate: backendDateFormat(student.ingresseDate),
            matrCode: student.matricula
        };
}


export const emptyStudentWrite: StudentWrite = {
    id: "",
    bornDate: new Date(),
    ingresseDate: new Date(),
    course: {id: "", abr: "", name: ""},
    cpf: "",
    matricula: "",
    name: "",
    semester: 1,
    email: [],
    phone: [],
}


export const emptyStudentAcompanhar: StudentAcompanhar = {
    id: "",
    bornDate: new Date(),
    ingresseDate: new Date(),
    course: { id: "", abr: "", name: "" },
    cpf: "",
    matricula: "",
    name: "",
    semester: 1,
    phone: [],
    email: [],
}




export default class StudentService extends CrudService<Student, StudentMasker>
{
    public constructor()
    {
        super("student");
    }

    override async list(): Promise<StudentRead[]>
    {
        const list = (await super.list()) as StudentRead[];
        list.forEach(e => StudentService.studentGetParser(e));
        return list;    
    }

    override async getById(id: ID): Promise<StudentRead>
    {
        const student = (await super.getById(id)) as StudentRead;
        StudentService.studentGetParser(student);
        return student;
    }

    override async save(entity: StudentWrite): Promise<any>
    {
        return await super.save(entity);
    } 

    protected override serialize(entity: Student): StudentMasker
    {
        return studentMasker(entity);    
    }

    public async new(student: StudentNew): Promise<any>
    {
        return (await api.post(`${this.url}/new/`, this.serialize(student))).data;
    }

    public async getAcompanhar(id: ID): Promise<StudentAcompanhar>
    {
        return await this.getById(id);
    }

    public async getAuxilioFromAluno(id: ID, year: number, semester: 1 | 2): Promise<AuxilioRelation | null>
    {
        try
        {
            let response = api.get(`auxilio/getAuxilioFromAluno/${id}/${year}/${semester}`);
            let data = (await response).data;
            data.auxilio1.type = data.auxilio1?._type;
            data.auxilio2.type = data.auxilio2?._type;
            data.auxilio3.type = data.auxilio3?._type;
            return (await response).data as AuxilioRelation;
        }
        catch(e)
        {
            return null;
        }
    }

    public static studentGetFullMat(student: Student): string
    {
        return `${student.ingresseDate.getFullYear()}${student}`;
    }

    protected static studentGetParser(s: StudentRead): void
    {
        s.ingresseDate = new Date(s.ingresseDate);
        s.bornDate = new Date(s.bornDate);
    }

    public static readToWrite(s: StudentRead): StudentWrite
    {
        return {
            ...s,
            matricula: s.matricula.slice(8),
            course: s.course.id,
        }
    }
}


export const auxilioEmpty: Auxilio = {
    id: 0,
    status: "",
    type: "",
}


export const auxilioRelacaoEmpty: AuxilioRelation = {
    dataSolicitacao: new Date(),
    id: 0,
    student: emptyStudentAcompanhar,
    auxilio1: auxilioEmpty,
    auxilio2: auxilioEmpty,
    auxilio3: auxilioEmpty,
}

