# Vue Dashboard App  

Aplikasi dashboard berbasis **Vue 3 + Vite** dengan autentikasi user, manajemen transaksi, dan integrasi API menggunakan json-server.  

## 🚀 Fitur  
- 🔑 **Autentikasi User** (login, register, logout)  
- 📊 **Dashboard User** untuk melihat data transaksi  
- 💵 **Manajemen Transaksi** (list & modal input transaksi)  
- 🚫 **Halaman Forbidden** untuk akses yang tidak memiliki izin  
- ⚡ Dibangun dengan **Vite** untuk kecepatan development  
- 🎨 UI modular dengan **Vue Components**  

## 📂 Struktur Proyek  
```
├── public/              # static assets
├── src/
│   ├── assets/          # gambar/logo
│   ├── components/      # komponen UI (Navbar, Modal, dll)
│   ├── composables/     # composables (useAuth)
│   ├── router/          # konfigurasi routing Vue Router
│   ├── services/        # service API (fetch data)
│   ├── stores/          # Pinia/Vuex store untuk auth
│   └── views/           # halaman utama (Login, Register, Dashboard, dsb.)
├── db.json              # fake database untuk json-server
├── package.json         # dependencies & scripts
├── vite.config.js       # konfigurasi Vite
```

## 🛠️ Instalasi & Menjalankan  

### 1. Clone repo  
```bash
git clone https://github.com/miftakhurrokhmat/vue3-dashboard-graph-crud.git
cd vue3-dashboard-graph-crud
```

### 2. Install dependencies  
```bash
npm install
```

### 3. Jalankan backend (json-server)  
```bash
npx json-server --watch db.json --port 3000
```

### 4. Jalankan frontend  
```bash
npm run dev
```

Aplikasi akan berjalan di:  
👉 [http://localhost:5173](http://localhost:5173)  

Backend API tersedia di:  
👉 [http://localhost:3000](http://localhost:3000)  

## 🔑 Akun Demo  
Jika tersedia, tambahkan akun dummy untuk testing, contoh:  
```
email: charlie@mail.com  
password: 456
```

## 📦 Dependencies Utama  
- [Vue 3](https://vuejs.org/)  
- [Vite](https://vitejs.dev/)  
- [Vue Router](https://router.vuejs.org/)  
- [Pinia](https://pinia.vuejs.org/)  
- [json-server](https://github.com/typicode/json-server)  

## 📜 License  
MIT License © 2025  
