<template>
  <div>
    <h1>Welcome to the Git Tutorial page!</h1>
    <v-btn class="mt-4" prepend-icon="mdi-home" @click="home()">Home</v-btn>
    <v-btn @click="store.success('It works!')">Snackbar Test</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from '@stores/store';

const store = useStore();
const router = useRouter();

  // NOTE - Temp Home button
  function home() {
    router.push('/');
  } 
</script>

<style>
  
</style>