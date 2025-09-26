<template>
    <div class="container mt-5">
        <!-- Card Summary -->
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card text-center shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title text-success">Total Deposit</h5>
                        <p class="fs-4 fw-bold">{{ totalDeposit.toLocaleString("id-ID") }}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-center shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title text-danger">Total Withdraw</h5>
                        <p class="fs-4 fw-bold">{{ totalWithdraw.toLocaleString("id-ID") }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Chart -->
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card shadow-sm p-3">
                    <h5 class="text-center mb-3">Grafik Transaksi (Bar)</h5>
                    <canvas ref="barChart"></canvas>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card shadow-sm p-3">
                    <h5 class="text-center mb-3">Grafik Transaksi (Pie)</h5>
                    <canvas ref="pieChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import api from "../services/ApiService";
import Chart from "chart.js/auto";

export default {
    name: "UserDashboard",
    setup() {
        const barChart = ref(null);
        const pieChart = ref(null);
        const barChartInstance = ref(null);
        const pieChartInstance = ref(null);
        const totalDeposit = ref(0);
        const totalWithdraw = ref(0);
        const currentUser = ref(null);
        const router = useRouter();

        const loadCharts = async () => {
            try {
                const { data } = await api.get("/transactions");

                totalDeposit.value = data
                    .filter((t) => t.type === "deposit")
                    .reduce((sum, t) => sum + t.amount, 0);

                totalWithdraw.value = data
                    .filter((t) => t.type === "withdraw")
                    .reduce((sum, t) => sum + t.amount, 0);

                // Bar Chart
                if (barChartInstance.value) barChartInstance.value.destroy();
                barChartInstance.value = new Chart(barChart.value, {
                    type: "bar",
                    data: {
                        labels: ["Deposit", "Withdraw"],
                        datasets: [
                            {
                                label: "Total Amount",
                                data: [totalDeposit.value, totalWithdraw.value],
                                backgroundColor: ["#4CAF50", "#F44336"],
                            },
                        ],
                    },
                    options: { responsive: true, plugins: { legend: { display: false } } },
                });

                // Pie Chart
                if (pieChartInstance.value) pieChartInstance.value.destroy();
                pieChartInstance.value = new Chart(pieChart.value, {
                    type: "pie",
                    data: {
                        labels: ["Deposit", "Withdraw"],
                        datasets: [
                            {
                                data: [totalDeposit.value, totalWithdraw.value],
                                backgroundColor: ["#4CAF50", "#F44336"],
                            },
                        ],
                    },
                    options: { responsive: true, plugins: { legend: { position: "bottom" } } },
                });
            } catch (error) {
                console.error("Gagal memuat data chart:", error);
            }
        };

        const logoutUser = () => {
            localStorage.removeItem("currentUser");
            router.push("/login");
        };

        onMounted(() => {
            const user = localStorage.getItem("currentUser");
            if (!user) {
                router.push("/login");
                return;
            }
            currentUser.value = JSON.parse(user); // simpan user ke state
            loadCharts();
        });

        onBeforeUnmount(() => {
            if (barChartInstance.value) barChartInstance.value.destroy();
            if (pieChartInstance.value) pieChartInstance.value.destroy();
        });

        return { totalDeposit, totalWithdraw, logoutUser, barChart, pieChart, currentUser };
    },
};
</script>
