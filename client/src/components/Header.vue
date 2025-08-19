<script setup>
import router from "@/router/index.js";
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <img @click="async () => await router.push({ name: 'Home'})" class="header-image" width="64" height="64"
             src="@/assets/logo.svg"
             alt="Logo A+ Educação">
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px 0 20px 40px;
}

.header-image {
  cursor: pointer;
}
</style>