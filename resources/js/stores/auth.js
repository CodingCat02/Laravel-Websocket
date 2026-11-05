import {defineStore} from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
      user: null,
      ready: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async fetchUser() {
      try {
        const { data } = await axios.get('/api/user');
        this.user = data;
      } catch (error) {
        this.user = null;
        if (error.response && error.response.status === 401) {
          console.log('User is not authenticated. Redirecting to login...');
        }
      } finally {
        this.ready = true;
      }
    },
    async login(data) {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/login', data);
      await this.fetchUser();
    },
    async logout() {
      await axios.post('/logout');
      this.user = null;
    },
    async register(data) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/register', data);
    }
  }
});