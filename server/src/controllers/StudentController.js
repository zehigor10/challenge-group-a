import {PrismaClient} from "@prisma/client";
import {z, ZodError} from "zod";

const prisma = new PrismaClient();

export class StudentController {
    static schemaCreateStudent = z.object({
        name: z.string()
            .min(2, {message: "Nome deve ter pelo menos 2 caracteres"})
            .max(100, {message: "Nome muito longo"}),
        email: z.email({message: "Email inválido"}),
        ra: z.string()
            .min(1, {message: "RA é obrigatório"}),
        cpf: z.string()
            .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {message: "CPF inválido. Use o formato 000.000.000-00"}),
    })

    static schemaUpdateStudent = z.object({
        name: z.string()
            .min(2, {message: "Nome deve ter pelo menos 2 caracteres"})
            .max(100, {message: "Nome muito longo"}),
        email: z.email({message: "Email inválido"}),
    })

    static async createStudent(req, res) {
        try {
            const {name, email, ra, cpf} = StudentController.schemaCreateStudent.parse(req.body);

            const alreadyExistsStudent = await prisma.student.findUnique({
                where: {ra}
            })

            if (alreadyExistsStudent) {
                return res.status(403).send({
                    message: 'Já existe um aluno cadastrado com esse R.A'
                })
            }

            await prisma.student.create({
                data: {
                    name, email, ra, cpf
                }
            })

            return res.status(201).send({
                message: 'Aluno criado com sucesso!'
            })
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(422).send({
                    message: "Erro de validação",
                    errors: z.flattenError(error),
                })
            }

            return res.status(500).send({message: 'Ocorreu um erro ao criar um aluno, tente novamente mais tarde!'})
        }
    }

    static async listAllStudents(req, res) {
        try {
            const students = await prisma.student.findMany()

            return res.status(200).send({
                message: 'Alunos listados com sucesso!',
                students: students || []
            })
        } catch (e) {
            return res.status(500).send({message: 'Ocorreu um erro ao listar os alunos, tente novamente mais tarde!'})
        }
    }

    static async getStudentById(req, res) {
        try {
            const studentId = Number(req.params.id) ?? 0

            const student = await prisma.student.findUnique({
                where: {id: studentId}
            })

            if (!student) {
                return res.status(404).send({
                    message: 'Aluno não encontrado!'
                })
            }

            return res.status(200).send({
                message: 'Aluno listado com sucesso!',
                student: student
            })
        } catch (e) {
            return res.status(500).send({message: 'Ocorreu um erro ao lista um aluno, tente novamente mais tarde!'})
        }
    }

    static async updateStudent(req, res) {
        try {
            const {name, email, ra, cpf} = StudentController.schemaCreateStudent.parse(req.body);
            const studentId = Number(req.params.id) ?? 0

            const [alreadyExistsStudent, studentFound] = await Promise.all([
                prisma.student.findUnique({
                    where: {
                        ra, NOT: {
                            id: studentId
                        }
                    },
                }),
                prisma.student.findUnique({
                    where: {
                        id: studentId
                    }
                })
            ])

            if (alreadyExistsStudent) {
                return res.status(403).send({
                    message: 'Já existe um aluno cadastrado com esse R.A'
                })
            }

            if (!studentFound) {
                return res.status(404).send({
                    message: "Aluno não encontrado!"
                })
            }

            await prisma.student.update({
                where: {
                    id: studentId,
                },
                data: {
                    name, email, ra, cpf
                }
            })

            return res.status(200).send({
                message: 'Aluno atualizado com sucesso!'
            })
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(422).send({
                    message: "Erro de validação",
                    errors: z.flattenError(error),
                })
            }

            return res.status(500).send({message: 'Ocorreu um erro ao atualizar um aluno, tente novamente mais tarde!'})
        }
    }

    static async deleteStudent(req, res) {
        try {
            const studentId = Number(req.params.id) ?? 0

            const alreadyExistsStudent = await prisma.student.findUnique({
                where: {id: studentId}
            })

            if (!alreadyExistsStudent) {
                return res.status(404).send({
                    message: 'Aluno não encontrado!'
                })
            }

            await prisma.student.delete({
                where: {id: studentId}
            })

            return res.status(200).send({
                message: 'Aluno deletado com sucesso!'
            })
        } catch (e) {
            return res.status(500).send({message: 'Ocorreu um erro ao exlcuir um aluno, tente novamente mais tarde!'})
        }
    }
}