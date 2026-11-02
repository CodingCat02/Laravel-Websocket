<template>
  <v-container>
    <h1>Welcome to the Git Tutorial page!</h1>
    <v-btn @click="store.success('It works!')">Snackbar Test</v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '@stores/store';

const store = useStore();
const router = useRouter();

</script>

<style>
  
</style>