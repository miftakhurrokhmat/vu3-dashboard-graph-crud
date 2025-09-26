// src/stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("currentUser")) || null,
        token: localStorage.getItem("token") || null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setUser(user) {
            this.user = user;
            this.token = "dummy-token"; // ganti dengan token real kalau ada dari API
            localStorage.setItem("currentUser", JSON.stringify(this.user));
            localStorage.setItem("token", this.token);
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
        },
        restore() {
            const storedUser = localStorage.getItem("currentUser");
            const storedToken = localStorage.getItem("token");
            if (storedUser && storedToken) {
                this.user = JSON.parse(storedUser);
                this.token = storedToken;
            }
        },
    },
});
