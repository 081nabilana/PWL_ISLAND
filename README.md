# 🏝️ SPK Island - Sistema Pendukung Keputusan Pemilihan Pulau

Aplikasi Decision Support System (DSS) untuk membantu memilih lokasi terbaik bagi digital nomad menggunakan metode PROMETHEE.

## 🚀 Quick Start

### Prasyarat

- Node.js 18+ atau 20.9+ terinstall
- Git Bash atau terminal lainnya

### 1️⃣ Setup Database (MySQL)

✅ Database akan berjalan di `localhost:3307` dengan data yang sudah terimpor otomatis dari `db_spk_island.sql`

### 2️⃣ Jalankan Backend

```bash
cd uas-spk-island/backend

# Install dependencies
npm install

# Jalankan server (development mode dengan auto-reload)
npm run dev
```

✅ Backend berjalan di: **http://localhost:3000**

### 3️⃣ Jalankan Frontend

```bash
cd uas-spk-island/frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

✅ Frontend berjalan di: **http://localhost:5173**

### 4️⃣ Akses Aplikasi

Buka browser dan akses: **http://localhost:5173**

**Login Admin:**

- Username: `admin`
- Password: `admin123`

## 📁 Struktur Project

```
uas-spk-island/
├── backend/           # Express.js REST API
│   ├── app.js        # Entry point
│   ├── config/       # Database config
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth & validation
│   └── routes/       # API endpoints
│
└── frontend/         # Vue.js 3 + Vite
│    ├── src/
│    │   ├── views/    # Pages
│    │   ├── router/   # Vue Router
│    │   └── layouts/  # Layout components
│    └── vite.config.js
│
└── screenshots/
```

## 🔧 Konfigurasi

### Backend Environment Variables

File: `uas-spk-island/backend/.env`

```env
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=
DB_NAME=db_spk_island
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=3000
```

### Database Connection

- **Host:** localhost
- **Port:** 3307 (Docker MySQL)
- **User:** root
- **Password:** (kosong)
- **Database:** db_spk_island

## 📊 Fitur Aplikasi

- 🔐 Authentication & Authorization (JWT)
- 🏙️ Manajemen Data Kota
- 📏 Manajemen Kriteria Penilaian
- 📈 Input & Manajemen Score
- 🧮 Perhitungan PROMETHEE (Decision Support)
- 👤 Profile Management

## 🛠️ Commands

### Backend

```bash
npm run dev      # Development (auto-reload)
npm start        # Production
```

### Frontend

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## ❓ Troubleshooting

### Problem: Port 3306 already in use

**Solution:** Project sudah dikonfigurasi untuk menggunakan port 3307

### Problem: Node.js version error di frontend

**Solution:** Project sudah dikonfigurasi untuk Node.js 20.9+. Jika masih error:

```bash
cd uas-spk-island/frontend
rm -rf node_modules package-lock.json
npm install
```

### Problem: Backend can't connect to database

**Solution:**

1. Cek file `.env` ada di folder backend
2. Verifikasi port di `.env` (harus 3307)

### Problem: "Missing script: start" di backend

**Solution:** Project sudah diperbaiki. Gunakan `npm run dev` untuk development

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### Cities

- `GET /api/cities` - Get all cities
- `POST /api/cities` - Create city (admin only)
- `PUT /api/cities/:id` - Update city (admin only)
- `DELETE /api/cities/:id` - Delete city (admin only)

### Criteria

- `GET /api/criteria` - Get all criteria
- `POST /api/criteria` - Create criteria (admin only)
- `PUT /api/criteria/:id` - Update criteria (admin only)
- `DELETE /api/criteria/:id` - Delete criteria (admin only)

### Scores

- `GET /api/scores` - Get all scores
- `POST /api/scores` - Create/update score (admin only)

### PROMETHEE

- `GET /api/promethee/calculate` - Calculate PROMETHEE ranking

## 👥 Tim Pengembang

Tubes PWL - Sistem Pendukung Keputusan
Nabila Noor Azizah [F1D0202081]
Nabila Noor Azizah [F1D0202081]
Nabila Noor Azizah [F1D0202081]

## 📄 License

ISC

---
