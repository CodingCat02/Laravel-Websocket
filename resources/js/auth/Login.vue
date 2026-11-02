<template>
  <v-container class="fill-height" style="max-width: 420px">
    <v-card class="pa-6 w-100">
      <v-card-title class="text-h5 mb-2">Login</v-card-title>

      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="form.email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          :error-messages="errors.email"
        />
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
          :error-messages="errors.password"
        />
        <v-btn type="submit" color="primary" block :loading="loading">Login</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@stores/auth';

const auth = useAuthStore();
const route = useRoute();

const form = reactive({ email: '', password: '' });
const errors = ref({});
const loading = ref(false);

async function submit() {
  loading.value = true;
  errors.value = {};
  try {
    await auth.login(form);
    const redirect = route.query.redirect;
    const safe = typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//');
    window.location.href = safe ? redirect : '/';
  } catch (e) {
    errors.value = e.response?.data?.errors ?? {};
    store.error(e.response?.data?.message ?? 'Login failed. Please try again.');
  } finally {
    loading.value = false;
  }
}
</script>

