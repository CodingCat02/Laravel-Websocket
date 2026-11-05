import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@stores/auth';
import Login from '@auth/Login.vue';
import MainLayout from '@layouts/MainLayout.vue';
import Dashboard from '@pages/Dashboard.vue';
import GitTutorial from '@pages/GitTutorial.vue';

const router = createRouter({
    history: createWebHistory(),    
    routes: [
        {
            path: '/',
            component: MainLayout,
            meta: { requiresAuth: true },
            children:[
                { path: '', name: 'dashboard', component: Dashboard, meta: { title: 'Dashboard', icon: 'mdi-view-dashboard' }, },
                { path: '/git-tutorial', name: 'git-tutorial', component: GitTutorial, meta: { title: 'Git Tutorial', icon: 'mdi-git' } },
            ]
        },
         { path: '/login', name: 'login', component: Login,  meta: { guest: true} },
         { path: '/register', name: 'register', component: Login,  meta: { guest: true} },
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