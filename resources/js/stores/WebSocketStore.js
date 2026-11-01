import { defineStore } from 'pinia';

export const useWebSocketStore = defineStore('WebSocketStore', {
    state: () => ({
        count: 0,
    }),
    getters: {
        double: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++;
        },
    },
});