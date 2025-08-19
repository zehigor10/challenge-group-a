<script setup>
</script>

<template>
  <v-footer class="footer text-center d-flex flex-column ga-2 py-4" color="#2c3b48">
    <div>
      © {{ new Date().getFullYear() }} —
      <strong v-text="'Vue.js 3 + Vuetify'"/>
    </div>
    <p
        class="font-weight-light text-subtitle-2"
        v-text="'Desenvolvido por José Higor'"
    />
  </v-footer>
</template>

<style scoped>
.footer {
  flex: 0;
}
</style>