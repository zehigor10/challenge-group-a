<script setup>

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false
  }
})

defineEmits(["deleteStudent"]);

</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="props.openModal" max-width="500" persistent>
      <v-card title="Você tem certeza que deseja excluir este aluno?" subtitle="Esta ação não pode ser desfeita">
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn variant="elevated" color="#BB243E" @click="$emit('deleteStudent', false)" v-text="'Cancelar'"/>
          <v-btn variant="elevated" color="#4CAF50" @click="$emit('deleteStudent', true)" v-text="'Confirmar'"/>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
