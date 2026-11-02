<template>
  <v-snackbar
    v-model="store.notification.show"
    :color="store.notification.color"
    :timeout="store.notification.timeout"
    location="top center"
    variant="elevated"
    rounded="lg"
    elevation="6"
    timer="rgba(255,255,255,0.6)"
    min-width="300"
  >
    <div class="d-flex align-center ga-3">
      <v-icon :icon="icon" size="24" />
      <span>{{ store.notification.message }}</span>
    </div>

    <template #actions>
      <v-btn
        icon="mdi-close"
        variant="text"
        size="small"
        @click="store.notification.show = false"
      />
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '@stores/store';

const store = useStore();

// Icon for each notification type
const icons = {
  success: 'mdi-check-circle',
  error: 'mdi-alert-circle',
  warning: 'mdi-alert',
  info: 'mdi-information',
};

const icon = computed(() => icons[store.notification.color] ?? 'mdi-bell');
</script>

