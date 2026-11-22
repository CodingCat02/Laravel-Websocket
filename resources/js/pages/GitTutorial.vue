<template>
  <v-container>
   
    <!-- <v-btn @click="store.success('It works!')">Snackbar Test</v-btn> -->
    
    <v-card elevation="6" class="pa-4 mt-4">
      <v-card-title> <h1>Welcome to the Git Tutorial page</h1></v-card-title>
      <v-card-text>
          Learn the basics of Git and how to use it effectively
        <p>This is a simple Git tutorial page.</p>
        <p>Here you can learn the basics of Git and how to use it effectively.</p>
      </v-card-text>
    </v-card>
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