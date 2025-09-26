<template>
    <div v-if="visible" class="modal-backdrop">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ localTransaction.id ? 'Edit Transaksi' : 'Tambah Transaksi' }}</h5>
                    <button type="button" class="btn-close" @click="close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Tipe</label>
                        <select v-model="localTransaction.type" class="form-select">
                            <option value="deposit">Deposit</option>
                            <option value="withdraw">Withdraw</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Jumlah</label>
                        <input type="number" v-model.number="localTransaction.amount" class="form-control" />
                        <div v-if="errors.amount" class="text-danger mt-1">{{ errors.amount }}</div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Kategori</label>
                        <input type="text" v-model="localTransaction.category" class="form-control" />
                        <div v-if="errors.category" class="text-danger mt-1">{{ errors.category }}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="close">Batal</button>
                    <button class="btn btn-primary" @click="save">Simpan</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
    visible: Boolean,
    transaction: Object
})

const emit = defineEmits(["close", "save"])

// Copy lokal untuk edit tanpa mutasi prop langsung
const localTransaction = ref({ id: null, type: "deposit", amount: 0, category: "" })
const errors = ref({ amount: "", category: "" })

// Update localTransaction setiap props.transaction berubah
watch(
    () => props.transaction,
    (newVal) => {
        if (newVal) {
            localTransaction.value = { ...newVal }
        } else {
            localTransaction.value = { id: null, type: "deposit", amount: 0, category: "" }
        }
        errors.value = { amount: "", category: "" } // reset error
    },
    { immediate: true }
)

// Validasi sebelum emit save
const validate = () => {
    let valid = true
    errors.value = { amount: "", category: "" }

    if (!localTransaction.value.amount || localTransaction.value.amount <= 0) {
        errors.value.amount = "Jumlah harus lebih dari 0"
        valid = false
    }

    if (!localTransaction.value.category || localTransaction.value.category.trim() === "") {
        errors.value.category = "Kategori wajib diisi"
        valid = false
    }

    return valid
}

const save = () => {
    if (!validate()) return
    emit("save", localTransaction.value)
    emit("close")
}

const close = () => {
    emit("close")
}
</script>


<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    /* penuh layar */
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    /* overlay gelap */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
}

.modal-dialog {
    max-width: 500px;
    width: 100%;
}

.modal-content {
    background: #fff;
    /* wajib: isi modal solid putih */
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    z-index: 1100;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    /* biar ada depth */
}
</style>