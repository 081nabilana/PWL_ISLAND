import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import PublicLayout from "../layouts/PublicLayout.vue";
import CityManager from "../views/admin/CityManager.vue";
import CriteriaManager from "../views/admin/CriteriaManager.vue";
import Home from "../views/public/Home.vue";
import Tutorial from "../views/public/Tutorial.vue";
import Tools from "../views/public/Tools.vue";
import AdminManager from "../views/admin/AdminManager.vue";
import Profile from "../views/admin/Profile.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import Hasil from "../views/admin/Hasil.vue";
// import { sessionManager } from "../utils/sessionManager"; // Kita matikan dulu biar ga bikin ribet

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: PublicLayout,
            children: [
                { path: "", component: Home },
                { path: "tutorial", component: Tutorial },
                { path: "tools", component: Tools },
            ],
        },
        { 
            path: "/login", 
            name: "login", 
            component: Login 
        },
        {
            path: "/admin",
            component: AdminLayout,
            meta: { requiresAuth: true }, // Gembok Induk
            children: [
                { path: "dashboard", component: Dashboard },
                { path: "cities", component: CityManager },
                { path: "criteria", component: CriteriaManager },
                { path: "hasil", component: Hasil },
                { path: "users", component: AdminManager },
                { path: "profile", component: Profile },
            ],
        },
        // Redirect halaman nyasar ke Home
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ],
});

// SATPAM ANTI-LOOP
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // ATURAN 1 (PENTING): Kalau mau ke halaman Login, LANGSUNG BOLEHIN.
    // Ini biar gak terjadi looping "loading terus".
    if (to.name === 'login' || to.path === '/login') {
        return next();
    }

    // ATURAN 2: Kalau mau masuk area Admin (requiresAuth) TAPI gak punya token
    if (requiresAuth && !token) {
        // Tendang ke login
        return next('/login');
    }

    // ATURAN 3: Sisanya boleh lewat (Halaman Home, atau Admin yg sudah login)
    next();
});

export default router;