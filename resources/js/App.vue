<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Notification/>
  </v-app>
</template>

<script setup>
  import Notification from '@components/Notification.vue';
</script>