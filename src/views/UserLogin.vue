<template>
    <div class="container mt-5" style="max-width: 400px;">
        <h3 class="mb-4 text-center">Login</h3>
        <form @submit.prevent="loginUser">
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="email" required />
            </div>

            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" v-model="password" required />
            </div>

            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/ApiService";
import { useAuth } from "../composables/useAuth";

export default {
    name: "UserLogin",
    setup() {
        const email = ref("miftakhurrokhmat@gmail.com");
        const password = ref("miftah2025");
        const router = useRouter();
        const { login } = useAuth();

        const loginUser = async () => {
            try {
                const response = await api.get("/users", {
                    params: { email: email.value, password: password.value },
                });

                if (response.data.length > 0) {
                    login(response.data[0]); // lewat Pinia + localStorage
                    router.push("/dashboard");
                } else {
                    alert("Email atau password salah");
                }
            } catch (error) {
                console.error(error);
                alert("Gagal login, coba lagi.");
            }
        };

        return { email, password, loginUser };
    },
};
</script>
