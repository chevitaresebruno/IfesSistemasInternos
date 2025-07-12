import BaseEntity from "../../../share/service/BaseEntity";
import { Course } from "./Course";
import { Email } from "./Email";
import { Phone } from "./Phone";


export interface Student extends BaseEntity
{
    name: string;
    cpf: string;
    bornDate: Date;
    ingresseDate: Date;
    semester: 1 | 2,
    matricula: string,
    course: Course;
}


export interface StudentRead extends Student
{
    phone: string[];
    email: string[];
}



export interface StudentWrite extends Student
{
    phone: ID[];
    email: ID[];
    course: ID;
}


export interface StudentNew extends Student
{
    phone: Phone[];
    email: Email[];
    course: ID;
}


export interface StudentAcompanhar extends StudentRead
{

}

