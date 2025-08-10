import {StudentController} from "../controllers/StudentController.js";

async function routes(fastify) {
    fastify.post("/students", StudentController.createStudent)
    fastify.get("/students", StudentController.listAllStudents)
    fastify.get("/students/:id", StudentController.getStudentById)
    fastify.put("/students/:id", StudentController.updateStudent)
    fastify.delete("/students/:id", StudentController.deleteStudent)
}

export default routes;