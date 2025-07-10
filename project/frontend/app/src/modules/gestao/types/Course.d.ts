import BaseEntity from "../../../share/service/BaseEntity";

// altissmo vibe coding
export interface Course extends BaseEntity
{
    abr: string;
    name: string;
}

// Tipo base - estrutura comum
export interface Course extends BaseEntity {
    name: string;
    abr: string;
    description?: string;
    duration: number; // em semestres
    isActive: boolean;
}

// Para LEITURA - o que vem do backend
export interface CourseRead extends Course {
    // Campos adicionais que vêm do backend
    createdAt: Date;
    updatedAt: Date;
    studentsCount: number;        // quantos alunos estão matriculados
    totalGraduates: number;       // quantos já se formaram
    averageGrade: number;         // média das notas dos alunos
    
    // Relacionamentos expandidos
    coordinator?: {
        id: string;
        name: string;
        email: string;
    };
}

// Para ESCRITA - atualização de curso existente
export interface CourseWrite extends Course {
    // Apenas campos editáveis
    // Não inclui campos calculados pelo backend
    coordinatorId?: string;  // ID do coordenador (relacionamento)
    
    // Campos que podem ser null na atualização
    description?: string;
}

// Para CRIAÇÃO - criar novo curso
export interface CourseNew extends Omit<Course, 'id'> {
    // Sem ID (será gerado pelo backend)
    coordinatorId: string;  // Obrigatório na criação
    
    // Campos com valores padrão na criação
    isActive?: boolean;     // padrão: true
    duration?: number;      // padrão: 8 semestres
    
    // Campos específicos para criação
    initialBudget?: number;
    departmentId: string;   // curso deve pertencer a um departamento
}