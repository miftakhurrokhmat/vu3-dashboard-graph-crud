<template>
    <div>
        <div v-if="!authStore.isAuthenticated" class="auth-container">
            <router-view />
        </div>
        <div v-else class="app-layout d-flex">
            <!-- Sidebar -->
            <div :class="['sidebar bg-dark text-white p-3', { collapsed }]">
                <button class="btn btn-sm btn-outline-light mb-3" @click="toggleSidebar">
                    <i class="bi" :class="collapsed ? 'bi-list' : 'bi-x-lg'"></i>
                </button>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2">
                        <router-link to="/dashboard" class="nav-link text-white">
                            <i class="bi bi-house"></i>
                            <span v-if="!collapsed"> Dashboard</span>
                        </router-link>
                    </li>
                    <li class="nav-item mb-2">
                        <router-link to="/transactions" class="nav-link text-white">
                            <i class="bi bi-receipt"></i>
                            <span v-if="!collapsed"> Transactions</span>
                        </router-link>
                    </li>
                    <li class="nav-item mb-2">
                        <router-link to="/users" class="nav-link text-white">
                            <i class="bi bi-people"></i>
                            <span v-if="!collapsed"> Users</span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <!-- Main -->
            <div class="flex-grow-1">
                <AppNavbar />
                <main class="p-4">
                    <router-view />
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "./stores/auth";
import AppNavbar from "./components/AppNavbar.vue";

const authStore = useAuthStore();
const collapsed = ref(false);
const toggleSidebar = () => (collapsed.value = !collapsed.value);
</script>

<style scoped>
.app-layout {
    min-height: 100vh;
}

.sidebar {
    width: 220px;
    transition: width 0.3s;
}

.sidebar.collapsed {
    width: 70px;
}

.auth-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}
</style>
