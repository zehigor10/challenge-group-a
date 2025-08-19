<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useToast} from "vue-toast-notification";
import router from "@/router/index.js";

const toast = useToast();

const states = reactive({
  loading: false,
  form: {
    name: '',
    email: '',
    ra: '',
    cpf: '',
  },
})

const formIsValid = ref(false);

const handleCreateStudent = async () => {
  if (!formIsValid.value) {
    toast.warning("Preencha todos os campos corretamente!", {
      position: "top-right",
    });
    return;
  }

  try {
    states.loading = true;
    const {data} = await axios.post(`http://localhost:4444/api/students`, {
      name: states.form.name,
      email: states.form.email,
      ra: states.form.ra,
      cpf: states.form.cpf
    });
    toast.success(data.message, {
      position: 'top-right',
    })
    await router.push({name: 'Home'})
  } catch (e) {
    toast.error([403, 422].includes(e.response.status) ? e.response.data.message : 'Ocorreu um erro interno no servidor, tente novamente, mais tarde!', {
      position: 'top-right',
    })
  } finally {
    states.loading = false
  }
}

function isValidCPF(cpf) {
  if (!cpf) return false;
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.charAt(10));
}

const formatCPF = (value) => {
  return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
};

</script>
<template>
  <v-card height="100%">
    <v-layout style="position: static">
      <v-row>
        <v-col cols="12">
          <v-card-title class="text-h6 text-center white--text" v-text="'Cadastro de aluno'"/>
          <v-form class="mt-5" v-model="formIsValid" @submit.prevent="handleCreateStudent">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <small class="text-caption text-medium-emphasis" v-text="'* Indica campo obrigatório'"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                      v-model="states.form.name"
                      label="Insira o nome completo"
                      required
                      :maxlength="100"
                      :counter="100"
                      :rules="[
                        v => !!v || 'O nome é obrigatório',
                        v => /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(v) || 'O nome deve conter apenas letras',
                        v => v.length <= 100 || 'Máximo de 100 caracteres'
                      ]"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                      v-model="states.form.email"
                      label="Informe apenas um e-mail"
                      placeholder="exemplo@email.com"
                      :maxlength="150"
                      :counter="150"
                      required
                      :rules="[
                        v => !!v || 'O email é obrigatório',
                        v => /.+@.+\..+/.test(v) || 'Email inválido'
                      ]"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                      v-model="states.form.ra"
                      label="Informe o registro acadêmico"
                      :maxlength="10"
                      :minlength="8"
                      :counter="10"
                      required
                      :rules="[
                        v => !!v || 'O R.A é obrigatório',
                        v => /^\d+$/.test(v) || 'O R.A deve conter apenas números',
                        v => v.length <= 10 || 'Máximo de 10 dígitos',
                        v => v.length >= 8 || 'Mínimo de 8 dígitos'
                      ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                      required
                      @input="states.form.cpf = formatCPF(states.form.cpf)"
                      v-model="states.form.cpf"
                      label="Informe o número do documento"
                      :maxlength="14"
                      :counter="14"
                      :rules="[
                          v => !!v || 'O CPF é obrigatório',
                          v => isValidCPF(v) || 'CPF inválido'
                      ]"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex justify-end ga-3" cols="12">
                  <v-btn @click="async () => await router.push({name: 'Home'})" color="#BB243E" v-text="'Cancelar'"/>
                  <v-btn type="submit" color="#4CAF50" v-text="'Salvar'"/>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
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

</style>