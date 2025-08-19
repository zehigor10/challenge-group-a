import {createRouter, createWebHistory} from "vue-router";
import StudentListView from "../views/StudentListView.vue";
import StudentNewView from "../views/StudentNewView.vue";
import StudentEditView from "../views/StudentEditView.vue";

const routes = [
    {path: '/', name: 'Home', component: StudentListView},
    {path: '/aluno/novo', name: 'CreateStudent', component: StudentNewView},
    {path: '/aluno/editar/:id', name: 'UpdateStudent', component: StudentEditView},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router