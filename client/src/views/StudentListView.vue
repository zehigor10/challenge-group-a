<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {useToast} from "vue-toast-notification";
import router from "@/router/index.js";
import Modal from "@/components/Modal.vue";

const toast = useToast();

const states = reactive({
  loading: true,
  students: [],
  columns: ['Registro Acadêmico', 'Nome', 'CPF', 'Ações'],
  openModalDeleteStudent: false,
  studentIdToDelete: null,
})

onMounted(() => {
  handleGetStudents()
})

const handleGetStudents = async () => {
  try {
    const {data: {students: students}} = await axios.get('http://localhost:4444/api/students');
    states.students = students
  } catch (e) {
    toast.error('Ocorreu um erro interno no servidor, tente novamente, mais tarde!', {
      position: 'top-right',
    })
  } finally {
    states.loading = false
  }
}

const handleDeleteStudent = async () => {
  try {
    states.loading = true
    const {data} = await axios.delete(`http://localhost:4444/api/students/${states.studentIdToDelete}`);
    states.openModalDeleteStudent = false
    toast.success(data.message, {
      position: 'top-right',
    })
    states.studentIdToDelete = null

    await handleGetStudents()
  } catch (e) {
    states.openModalDeleteStudent = false
    toast.error('Ocorreu um erro interno no servidor, tente novamente, mais tarde!', {
      position: 'top-right',
    })
    states.studentIdToDelete = null
  } finally {
    states.loading = false
  }
}

</script>
<template>
  <Modal :open-modal="states.openModalDeleteStudent" @delete-student="async (isDelete) => {
    if (isDelete) {
      await handleDeleteStudent()
    } else {
    states.studentIdToDelete = null;
    states.openModalDeleteStudent = false;
    }
  }"/>
  <v-card height="100%">
    <v-layout style="position: static">
      <v-row>
        <v-col cols="12">
          <v-card-title class="text-h6 text-center white--text" v-text="'Consulta de alunos'"/>
          <v-divider/>
          <v-card-text>
            <v-row justify="end" dense>
              <v-col cols="auto">
                <v-btn @click="async () => await router.push({ name: 'CreateStudent'})" color="#00a0a6"
                       density="default"
                       append-icon="mdi-plus" variant="elevated">
                  Cadastrar aluno
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider/>
          <v-table class="ma-4" color="#00a0a6" striped="even" density="comfortable" fixed-header>
            <thead>
            <tr>
              <th :class="column === 'Ações' ? 'text-center' : 'text-left'" v-for="(column, index) in states.columns"
                  :id="index"
                  v-text="column"/>
            </tr>
            </thead>
            <tbody>
            <tr v-if="!states.students.length">
              <td colspan="6">
                <p class="text-center"
                   v-text="states.loading ? 'Carregando...' : 'Não temos nenhum aluno cadastrado no momento...'"/>
              </td>
            </tr>
            <tr
                v-else-if="states.students.length"
                v-for="(student, index) in states.students"
                :key="`${student.name}-${index}`"
            >
              <td v-text="student.ra"/>
              <td v-text="student.name"/>
              <td v-text="student.cpf"/>
              <td>
                <v-row>
                  <v-col class="d-flex justify-center ga-3" cols="12">
                    <v-btn @click="async () => await router.push({name: 'UpdateStudent', params: {id: student.id}})"
                           color="#adaaa9"
                           append-icon="mdi-pencil" size="small">
                      Editar
                    </v-btn>
                    <v-btn @click="() => {
                      states.studentIdToDelete = student.id
                      states.openModalDeleteStudent = true
                    }" append-icon="mdi-delete" size="small" color="#BB243E">
                      Excluir
                    </v-btn>
                  </v-col>
                </v-row>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-layout>
  </v-card>
</template>

<style scoped>
.v-card-title {
  background: #2c3b48;
  border-radius: 10px 10px 0 0;
  color: white;
}

.v-table {
  border-radius: 10px;
  border: 1px solid #adaaa9;
  max-height: 500px;
}

th {
  color: white;
  background: #2c3b48 !important;
}

</style>