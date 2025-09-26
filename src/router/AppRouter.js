import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

import UserLogin from "../views/UserLogin.vue";
import UserRegister from "../views/UserRegister.vue";
import UserDashboard from "../views/UserDashboard.vue";
import Forbidden from '@/views/Forbidden.vue';
import Transactions from "../views/Transactions.vue";

const routes = [
    { path: "/", redirect: "/login" },
    { path: '/login', name: 'Login', component: UserLogin },
    { path: "/register", component: UserRegister },
    {
        path: "/dashboard",
        component: UserDashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: Transactions,
        meta: { requiresAuth: true, roles: ['admin'] }
    },
    { path: '/forbidden', name: 'Forbidden', component: Forbidden }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    auth.restore(); // penting: pastikan state sync dengan localStorage

    // 1. Jika route butuh login tapi user belum login
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return next({ name: 'Login' });
    }

    // 2. Jika user sudah login tapi mencoba buka halaman login → redirect ke dashboard
    if (to.name === 'Login' && auth.isAuthenticated) {
        return next({ path: '/dashboard' });
    }

    // 3. Jika route butuh role tertentu dan role user tidak cocok
    if (to.meta.roles && !to.meta.roles.includes(auth.user?.role)) {
        return next({ name: 'Forbidden' });
    }

    // Lolos semua → lanjut
    next();

});

export default router;