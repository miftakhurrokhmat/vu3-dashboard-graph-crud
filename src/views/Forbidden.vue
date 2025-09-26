<!-- src/views/Forbidden.vue -->
<template>
    <div class="forbidden">
        <h1>403 - Forbidden</h1>
        <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <router-link to="/">Kembali ke Dashboard</router-link>
    </div>
</template>

<script setup>
// tidak perlu script khusus untuk halaman sederhana
</script>

<style scoped>
.forbidden {
    text-align: center;
    margin-top: 50px;
}

.forbidden h1 {
    color: #e74c3c;
}
</style>
