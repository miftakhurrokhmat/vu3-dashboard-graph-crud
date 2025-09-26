<template>
    <div class="container mt-5">
        <h3 class="mb-4">Daftar Transaksi</h3>

        <div class="d-flex align-items-center gap-2 mb-3">
            <input v-model="searchValue" type="text" placeholder="Cari transaksi..." class="form-control"
                style="height: 38px; flex: 1" />
            <button class="btn btn-success" style="height: 38px" @click="openAddModal">
                Tambah
            </button>
            <button class="btn btn-danger" style="height: 38px" @click="downloadPDF">
                Unduh PDF
            </button>
        </div>

        <!-- Filter kategori -->
        <div class="mb-3">
            <label class="fw-bold mb-2">Filter Kategori:</label>
            <div class="d-flex flex-wrap gap-3">
                <div v-for="cat in categories" :key="cat" class="form-check">
                    <input type="checkbox" class="form-check-input" :id="cat" :value="cat"
                        v-model="selectedCategories" />
                    <label :for="cat" class="form-check-label">{{ cat }}</label>
                </div>
            </div>
        </div>

        <!-- Tabel -->
        <EasyDataTable :headers="headers" :items="filteredTransactions" :rows-per-page="5" :search-value="searchValue"
            :sort-by="sortBy" :sort-type="sortType" @update:sort-by="val => sortBy = val"
            @update:sort-type="val => sortType = val">
            <template #item-action="{ id, row }">
                <button class="btn btn-sm btn-outline-primary me-2" @click="openEditModal(id)">Edit</button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteTransaction(id)">Hapus</button>
            </template>

        </EasyDataTable>

        <!-- Modal -->
        <TransactionModal :visible="showModal" :transaction="editingTransaction" @close="closeModal"
            @save="saveTransaction" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

import EasyDataTable from "vue3-easy-data-table"
import "vue3-easy-data-table/dist/style.css"

import api from "../services/ApiService"
import { useAuth } from "../composables/useAuth"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

import TransactionModal from "../components/TransactionModal.vue"

const { getUser } = useAuth()

const headers = [
    { text: "ID", value: "id", sortable: true },
    { text: "Tipe", value: "type", sortable: true },
    { text: "Jumlah", value: "amount", sortable: true },
    { text: "Kategori", value: "category", sortable: true },
    { text: "Aksi", value: "action" }
]

const transactions = ref([])
const searchValue = ref("")
const sortBy = ref("id")
const sortType = ref("asc")
const selectedCategories = ref([])
const categories = ref([])

const showModal = ref(false)
const editingTransaction = ref(null)

const filteredTransactions = computed(() => {
    let data = transactions.value
    if (selectedCategories.value.length > 0) {
        data = data.filter(t => selectedCategories.value.includes(t.category))
    }
    return data
})

onMounted(async () => {
    try {
        const currentUser = getUser()
        const res = await api.get("/transactions", {
            params: { userId: Number(currentUser?.id) }
        })
        transactions.value = res.data
        categories.value = [...new Set(res.data.map(t => t.category))]
    } catch (err) {
        console.error(err)
    }
})

const downloadPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(14)
    doc.text("Laporan Transaksi", 14, 15)

    const tableColumn = ["ID", "Tipe", "Jumlah", "Kategori"]
    const tableRows = filteredTransactions.value.map(t => [
        t.id,
        t.type,
        t.amount,
        t.category
    ])
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 25 })
    doc.save("laporan-transaksi.pdf")
}

// buka modal tambah transaksi
const openAddModal = () => {
    editingTransaction.value = null
    showModal.value = true
}

// buka modal edit transaksi
const openEditModal = async (id) => {
    try {
        const res = await api.get(`/transactions/${id}`)
        editingTransaction.value = res.data
        showModal.value = true
    } catch (err) {
        console.error("Gagal ambil transaksi:", err)
    }
}


// hapus transaksi
const deleteTransaction = async (id) => {
    if (!confirm("Yakin ingin menghapus transaksi ini?")) return
    try {
        await api.delete(`/transactions/${id}`)
        transactions.value = transactions.value.filter(t => t.id !== id)
    } catch (err) { console.error(err) }
}

const closeModal = () => {
    showModal.value = false
    editingTransaction.value = null
}

const saveTransaction = async (trans) => {
    try {
        if (trans.id) {
            // EDIT
            await api.put(`/transactions/${trans.id}`, trans)
            transactions.value = transactions.value.map(t =>
                t.id === trans.id ? trans : t
            )
        } else {
            // ADD
            const currentUser = getUser()
            const { id, ...payload } = trans
            payload.userId = Number(currentUser?.id)

            const res = await api.post(`/transactions`, payload)
            transactions.value.push(res.data)
        }

        closeModal()
    } catch (err) {
        console.error("Gagal simpan transaksi:", err)
    }
}
</script>