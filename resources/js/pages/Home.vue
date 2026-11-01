<script setup>
import { useWebSocketStore } from '@stores/WebSocketStore';

const WebSocketStore = useWebSocketStore();
</script>

<template>
  <v-container>
    <v-btn color="primary" prepend-icon="mdi-plus" @click="WebSocketStore.increment()">
      Count: {{ WebSocketStore.count }} (double: {{ WebSocketStore.double }})
    </v-btn>
  </v-container>
</template>