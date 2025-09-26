<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">{{ config.appName }}</router-link>

            <!-- Toggle biar responsive -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item" v-if="isLoggedIn">
                        <span class="text-white me-3">Hi, {{ username }}</span>

                        <button class="btn btn-warning btn-sm me-2" data-bs-toggle="modal"
                            data-bs-target="#changePasswordModal">
                            Change Password
                        </button>

                        <button class="btn btn-danger btn-sm ms-3" @click="logoutUser">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>


            <!-- Modal Change Password -->
            <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="changePasswordModalLabel">
                                Change Password
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="updatePassword">
                                <div class="mb-3">
                                    <label class="form-label">New Password</label>
                                    <input type="password" v-model="newPassword" class="form-control" required />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Confirm Password</label>
                                    <input type="password" v-model="confirmPassword" class="form-control" required />
                                </div>
                                <button type="submit" class="btn btn-primary">
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END MODAL -->

        </div>
    </nav>
</template>

<script>
import { ref, computed } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";
import config  from "@/config"

export default {
    name: "AppNavbar",
    setup() {
        const { isLoggedIn, logout, user } = useAuth(); // user diharapkan ref atau reactive
        const router = useRouter();

        const newPassword = ref("");
        const confirmPassword = ref("");

        // computed supaya reactive dan aman (tidak crash saat user belum tersedia)
        const username = computed(() => {
            // jika user adalah ref: user.value; jika user adalah object langsung: user.username
            const u = user && user.value !== undefined ? user.value : user;
            return (u && u.username) ? u.username : "User";
        });

        const logoutUser = () => {
            logout();
            router.push("/login");
        };

        const updatePassword = async () => {
            if (newPassword.value !== confirmPassword.value) {
                alert("Passwords do not match!");
                return;
            }
            // pastikan kita punya id user
            const u = user && user.value !== undefined ? user.value : user;
            if (!u || !u.id) {
                alert("User not available. Please login again.");
                return;
            }

            try {
                const res = await fetch(`http://localhost:3000/users/${u.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password: newPassword.value }),
                });

                if (!res.ok) throw new Error("Failed to update");

                // tutup modal (butuh Bootstrap JS tersedia di window.bootstrap)
                try {
                    const modalEl = document.getElementById("changePasswordModal");
                    const bsModal =
                        window.bootstrap && window.bootstrap.Modal
                            ? window.bootstrap.Modal.getInstance(modalEl) ||
                            new window.bootstrap.Modal(modalEl)
                            : null;
                    if (bsModal) bsModal.hide();
                } catch (e) {
                    // ignore jika bootstrap tidak ditemukan
                }

                alert("Password updated successfully!");
                newPassword.value = "";
                confirmPassword.value = "";
            } catch (error) {
                console.error("Error updating password:", error);
                alert("Failed to update password.");
            }
        };

        return {
            isLoggedIn,
            logoutUser,
            username,
            newPassword,
            confirmPassword,
            updatePassword,
            config
        };
    },
};
</script>
