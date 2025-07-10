import { ID } from "../../../share/service/BaseEntity";
import CrudService from "../../../share/service/CrudService";
import api from "../../../share/utils/AxiosConfig";
import { Course, CourseNew, CourseRead, CourseWrite } from "../types/Course";

export default class CourseService extends CrudService<Course> {
    public constructor() {
        super("course");
    }

    override async list(): Promise<CourseRead[]> {
        return (await super.list()) as CourseRead[];    
    }

    override async getById(id: ID): Promise<CourseRead> {
        return (await super.getById(id)) as CourseRead;
    }

    public async new(course: CourseNew): Promise<any> {
        return (await api.post(`${this.url}/`, course)).data;
    }

    public async update(id: ID, course: CourseWrite): Promise<any> {
        return (await api.put(`${this.url}/${id}/`, course)).data;
    }

    public async getByAbr(abr: string): Promise<CourseRead | null> {
        const courses = await this.list();
        return courses.find(course => course.abr === abr) || null;
    }

    public static getCourseDisplayName(course: Course): string {
        return `${course.name} (${course.abr})`;
    }
}