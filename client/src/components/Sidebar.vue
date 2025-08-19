<script setup>
import router from "@/router/index.js";
</script>

<template>
  <v-card height="100%">
    <v-layout style="position: static">
      <v-navigation-drawer permanent>
        <v-list>
          <v-list-item
              subtitle=""
              title="Módulo Acadêmico"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
              @click="async () => await router.push({ name: 'Home'})"
              prepend-icon="mdi-school"
              title="Alunos"
              value="students"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
.v-navigation-drawer {
  width: 100% !important;
}
</style>
