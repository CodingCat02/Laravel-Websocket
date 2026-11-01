<template>
  <v-container>
    <h2>Welcome, {{ auth.user?.name }}</h2>
    <v-btn class="mt-4" prepend-icon="mdi-logout" @click="logout">Logout</v-btn>
    <v-btn class="mt-4" prepend-icon="mdi-book" @click="gitTutorial">Git Tutorial</v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@stores/auth';

const auth = useAuthStore();
const router = useRouter();

async function logout() {
  await auth.logout();
  router.push('/login');
}
async function gitTutorial() {
  router.push('/git-tutorial');
}
</script>