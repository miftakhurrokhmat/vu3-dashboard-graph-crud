<template>
    <div class="container mt-5" style="max-width: 400px;">
        <h3 class="mb-4 text-center">Register</h3>
        <form @submit.prevent="registerUser">
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="formData.email" type="email" class="form-control" required />
            </div>

            <div class="mb-3">
                <label class="form-label">Username</label>
                <input v-model="formData.username" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="formData.password" type="password" class="form-control" required />
            </div>

            <button class="btn btn-success w-100">Register</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/ApiService";
import { useAuth } from "../composables/useAuth";

export default {
    name: "UserRegister",
    setup() {
        const router = useRouter();
        const { login } = useAuth();

        const formData = ref({
            email: "",
            username: "",
            password: "",
            role: "user",
        });

        const registerUser = async () => {
            try {
                const { data } = await api.post("/users", formData.value);
                alert("Register sukses, langsung login!");
                login(data); // langsung login setelah register
                router.push("/dashboard");
            } catch (error) {
                console.error(error);
                alert("Gagal register");
            }
        };

        return { formData, registerUser };
    },
};
</script>
