// src/composables/useAuth.js
import { useAuthStore } from "@/stores/auth"
import { computed } from "vue";

export function useAuth() {
    const auth = useAuthStore()

    const login = (user) => {
        auth.setUser(user)        // simpan di pinia
    };

    const logout = () => {
        auth.logout()
    };

    const getUser = () => {
        if (!auth.user) {
            auth.restore();
        }
        return auth.user
    }

    const isLoggedIn = computed(() => auth.isAuthenticated)

    return { login, logout, getUser, isLoggedIn, user: computed(() => auth.user) }

}
