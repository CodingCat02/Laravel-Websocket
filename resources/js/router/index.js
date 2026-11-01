import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@pages/Dashboard.vue';
import Login from '@auth/Login.vue';
import { useAuthStore } from '@stores/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
        { path: '/login', name: 'login', component: Login,  meta: { guest: true }},
    ],
}); 
router.beforeEach(async (to) => {
    const auth = useAuthStore();

    if (!auth.ready) await auth.fetchUser();

    if(to.meta.requiresAuth && !auth.isAuthenticated) {
        return { name: 'login', query: { redirect: to.fullPath } }; 
    }
    if(to.meta.guest && auth.isAuthenticated) {
        return { name: 'dashboard' }; 
    }
});

export default router;