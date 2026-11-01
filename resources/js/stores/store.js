import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
    state: () => ({
        // Snackbar Notifications
        notification: [{
            show: false,
            message: '',
            color: '',
            timeout: 3000,
        }],
        loading: false,

    }),
    getters: {

    },
    actions: {
        notify(message, color = 'success', timeout = 3000) {
            this.notification.show = false;
            setTimeout(() => {
                this.notification = { show: true, message, color, timeout };
            }, 50);
        },
        success(message) { this.notify(message, 'success'); },
        error(message)   { this.notify(message, 'error', 5000); },
        info(message)    { this.notify(message, 'info'); },
        warning(message) { this.notify(message, 'warning'); },
    },
});