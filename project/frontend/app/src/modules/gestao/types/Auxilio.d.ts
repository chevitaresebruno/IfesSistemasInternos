import BaseEntity from "../../../share/service/BaseEntity";
import { Student } from "./Student";


export interface Auxilio extends BaseEntity
{
    type: string;
    status: string;
}


export interface AuxilioRelation extends BaseEntity
{
    dataSolicitacao: Date;
    auxilio1?: Auxilio;
    auxilio2?: Auxilio;
    auxilio3?: Auxilio;
    student: Student;
}

