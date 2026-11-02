<template>
  <v-app-bar class="px-5" dark>
    
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <!-- <v-spacer/> -->
    <v-toolbar-title>{{ router.currentRoute.value.meta.title }}</v-toolbar-title>
     <div style="display: flex; align-items: center; gap: 20px;">
       <v-icon size="30" @click="toggleTheme">
         {{ isLight ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
       </v-icon>
       <v-icon size="30" @click="logout">
         {{ 'mdi-logout' }}
       </v-icon>
     </div>
  </v-app-bar>
  
  <v-navigation-drawer
    v-model="drawer"
    temporary
  >
    <v-list-item
      :title="auth.user?.name"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.name"
        :prepend-icon="item.meta.icon"
        :to="{ name: item.name }"
        :title="item.meta.title"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
import { ref } from 'vue';
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@stores/auth';


const auth = useAuthStore();
const router = useRouter();
const theme = useTheme();
const isLight = computed(() => theme.global.name.value === 'light');
const drawer = ref(false);

const menuItems = computed(() => {
  const layout = router.options.routes.find((r) => r.component?.__name === 'MainLayout');
  return (layout?.children ?? []).filter(
    (r) => r.name && r.meta?.title && r.meta?.nav !== false
  );
});

function toggleTheme() {
  theme.change(isLight.value ? 'dark' : 'light');
}
async function logout() {
  await auth.logout();
  window.location.href = '/login'; 
}
</script>