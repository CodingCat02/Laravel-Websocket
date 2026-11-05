<template>
  <v-container class="fill-height" style="max-width: 420px">
    <v-card class="pa-6 w-100">
      <v-form @submit.prevent="submitLogin">
        <v-card-title class="text-h5 mb-2">
          <span class="mdi mdi-web">Laravel WebSocket</span>
        </v-card-title>
        <v-card-subtitle class="mb-4">
          <span>Login</span>
        </v-card-subtitle>
        <v-card-text class="mb-4">
          <v-text-field
            v-model="loginForm.email"
            label="Email"
            type="email"
            prepend-inner-icon="mdi-email"
            :error-messages="errors.email"
          />
          <v-text-field
            v-model="loginForm.password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            :error-messages="errors.password"
          />
          <p>Don't have an account? Register
            <span color="bg-purple-darken-2" @click="openRegisterDialog = true" class="text-decoration-underline cursor-pointer">
              here
            </span>
          </p>
        </v-card-text>
        <v-card-actions class="mt-4">
          <v-btn
            type="submit" 
            class="text-white flex-grow-1 text-none"
            color="blue darken-2"
            variant="flat"
            :loading="loading"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>

 <v-dialog
    v-model="openRegisterDialog"
    width="400"
    persistent
 >
  <v-card>
  <v-form ref="registerForm" @submit.prevent="submitRegister">
    <v-card-title class="d-flex justify-space-between">
      Register Account
      <v-icon @click="openRegisterDialog = false">mdi-close</v-icon>
    </v-card-title>
    <v-divider :thickness="3"></v-divider>
    <v-card-text>
        <v-text-field
          v-for="(fields, key) in registerTextfields"
          :key="key"
          :rules="fields.rules"
          v-model="fields.model"
          :prepend-inner-icon="fields.icon"
          :error-messages="fields.error"
          :placeholder="fields.placeholder"
          :type="fields.type"
          persistent-placeholder
        >
        </v-text-field>
    </v-card-text>
    <v-divider :thickness="3"></v-divider>
    <v-card-actions class="pa-2">
      <v-btn
        type="submit" 
        class="text-white flex-grow-1 text-none"
        color="blue darken-2"
        variant="flat"
        :loading="loading"
      >
        Register
    </v-btn>
    </v-card-actions>
  </v-form>
  </v-card>
 </v-dialog>
</template>

<script setup>
import { reactive, ref, watch} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@stores/auth';
import { useStore } from '@stores/store';

const auth = useAuthStore();
const route = useRoute();
const store = useStore();

const loginForm = reactive({ email: '', password: '' });
const required = (label) => (v) => !!v || `${label} is required`
const registerTextfields = reactive({ 
  name: { model: '', placeholder: 'Name', type: 'text', icon: 'mdi-account', error: [], rules: [required('Name')], },
  email: { model: '', placeholder: 'Email', type: 'email', icon: 'mdi-email', error: [], rules: [required('Email')] }, 
  password:{ model: '', placeholder: 'Password', type: 'password', icon: 'mdi-lock', error: [], rules: [required('Password')] },
  password_confirmation: { model: '', placeholder: 'Confirm Password', type: 'password', icon: 'mdi-lock-check', error: [], rules: [required('Password Confirmation')] }
});
const registerForm = ref(null)

const errors = ref({});
const loading = ref(false);
const openRegisterDialog = ref(false);

function resetRegisterForm() {
  for (const key in registerTextfields) {
    registerTextfields[key].model = ''
    registerTextfields[key].error = []
  }
  registerForm.value?.resetValidation()
}

watch(openRegisterDialog, (isOpen) => {
  if (!isOpen) resetRegisterForm()
})

async function submitLogin() {
  loading.value = true;
  errors.value = {};
  try {
    await auth.login(loginForm);
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
async function submitRegister(event) {
  const { valid } = await event
  if (!valid) return
  loading.value = true;
  const registerData = {
      name: registerTextfields.name.model,
      email: registerTextfields.email.model,
      password: registerTextfields.password.model,
      password_confirmation: registerTextfields.password_confirmation.model
    };
  try {
    await auth.register(registerData);
    store.success('Registration successful! You can now log in.')
    openRegisterDialog.value = false;
    // registerForm.value?.reset();
  } catch (e){
    const errs = e.response?.data?.errors ?? {}
    for (const key in registerTextfields) {
      registerTextfields[key].error = errs[key] ?? []
    }
  } finally {
    loading.value = false;
  }
}
</script>

