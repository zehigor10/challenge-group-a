<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <v-app>
    <Header/>
    <v-container fluid id="container">
      <v-row class="ma-0">
        <v-col cols="3" clas="ma-0 pa-0">
          <Sidebar/>
        </v-col>
        <v-col cols="9">
          <router-view/>
        </v-col>
      </v-row>
    </v-container>
    <Footer/>
  </v-app>
</template>

<style scoped>

#container {
  flex: 1;
  padding: 0;
}

.v-row {
  margin: 0;
  min-height: 100%;
}

</style>
