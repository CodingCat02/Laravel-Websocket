<script setup>
import { useCounterStore } from '../stores/counter';

const counter = useCounterStore();
</script>

<template>
  <v-container>
    <v-btn color="primary" prepend-icon="mdi-plus" @click="counter.increment()">
      Count: {{ counter.count }} (double: {{ counter.double }})
    </v-btn>
  </v-container>
</template>