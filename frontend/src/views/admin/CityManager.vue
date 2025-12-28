<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const cities = ref([]);
const criteria = ref([]); // Data kriteria untuk form nilai
const showModalCity = ref(false);
const showModalScore = ref(false);

// State Form Kota (SUDAH DISESUAIKAN)
const formCity = ref({
    name: '', 
    num_coworking: '', // Dulu population
    last_updated: '',  // Dulu established_date
    image_url: ''
});

// State Form Nilai
const selectedCityId = ref(null);
const selectedCityName = ref('');
const formScores = ref({}); // { criteria_id: value }

const token = localStorage.getItem('token');
const config = { headers: { Authorization: `Bearer ${token}` } };

// --- FETCH DATA ---
const fetchData = async () => {
    try {
        const resCity = await axios.get('http://localhost:3000/api/cities');
        const resCrit = await axios.get('http://localhost:3000/api/criteria');
        cities.value = resCity.data;
        criteria.value = resCrit.data;
    } catch (e) {
        console.error(e);
    }
};

// --- LOGIKA KOTA ---
const submitCity = async () => {
    try {
        // Kirim data dengan nama field baru
        await axios.post('http://localhost:3000/api/cities', formCity.value, config);
        alert('Kota Berhasil Disimpan');
        showModalCity.value = false;
        fetchData();
        // Reset form
        formCity.value = { name: '', num_coworking: '', last_updated: '', image_url: '' };
    } catch (e) { 
        alert(e.response?.data?.msg || 'Gagal simpan kota'); 
    }
};

const deleteCity = async (id) => {
    if(!confirm('Hapus kota ini?')) return;
    try {
        await axios.delete(`http://localhost:3000/api/cities/${id}`, config);
        fetchData();
    } catch (e) {
        alert('Gagal hapus data');
    }
};

// --- LOGIKA NILAI (SCORING) ---
const openScoreModal = async (city) => {
    selectedCityId.value = city.id;
    selectedCityName.value = city.name;
    formScores.value = {}; // Reset

    // Ambil nilai yang sudah ada (kalau ada)
    try {
        const res = await axios.get(`http://localhost:3000/api/scores/${city.id}`, config);
        // Mapping hasil ke formScores
        res.data.forEach(item => {
            formScores.value[item.criteria_id] = item.value;
        });
    } catch (e) { console.log("Belum ada nilai"); }

    showModalScore.value = true;
};

const submitScore = async () => {
    // Ubah format object ke array untuk backend
    const scoresArray = Object.keys(formScores.value).map(key => ({
        criteria_id: key,
        value: formScores.value[key]
    }));

    try {
        await axios.post('http://localhost:3000/api/scores', {
            city_id: selectedCityId.value,
            scores: scoresArray
        }, config);
        alert('Penilaian Berhasil Disimpan!');
        showModalScore.value = false;
    } catch (e) { alert('Gagal simpan penilaian'); }
};

onMounted(fetchData);
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Data Kota</h2>
            <button @click="showModalCity = true" class="btn btn-primary">
                <i class="bi bi-plus-circle"></i> Tambah Kota
            </button>
        </div>

        <div class="card shadow-sm">
            <div class="card-body">
                <table class="table table-striped align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Nama Kota</th>
                            <th>Jml Coworking Space</th> <th>Terakhir Update</th>     <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="city in cities" :key="city.id">
                            <td>{{ city.name }}</td>
                            <td>{{ city.num_coworking }}</td> 
                            <td>{{ city.last_updated }}</td>
                            <td>
                                <button @click="openScoreModal(city)" class="btn btn-sm btn-warning me-2 text-white">
                                    <i class="bi bi-pencil-square"></i> Input Nilai
                                </button>
                                <button @click="deleteCity(city.id)" class="btn btn-sm btn-danger">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="showModalCity" class="modal d-block" style="background: rgba(0,0,0,0.5)">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">Tambah Kota Baru</h5>
                        <button @click="showModalCity = false" class="btn-close"></button>
                    </div>
                    <form @submit.prevent="submitCity">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Nama Kota</label>
                                <input v-model="formCity.name" class="form-control" placeholder="Contoh: Yogyakarta" required>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">Jumlah Coworking Space</label>
                                <input v-model="formCity.num_coworking" type="number" class="form-control" placeholder="Contoh: 15" required>
                                <div class="form-text text-muted">Syarat kolom angka.</div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Tanggal Update Data</label>
                                <input v-model="formCity.last_updated" type="date" class="form-control" required>
                                <div class="form-text text-muted">Syarat kolom tanggal.</div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">URL Gambar (Opsional)</label>
                                <input v-model="formCity.image_url" type="text" class="form-control" placeholder="http://...">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success">Simpan Data</button>
                            <button type="button" @click="showModalCity = false" class="btn btn-secondary">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="showModalScore" class="modal d-block" style="background: rgba(0,0,0,0.5)">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-dark">
                        <h5 class="modal-title">Penilaian: {{ selectedCityName }}</h5>
                        <button @click="showModalScore = false" class="btn-close"></button>
                    </div>
                    <form @submit.prevent="submitScore">
                        <div class="modal-body">
                            <div v-for="crit in criteria" :key="crit.id" class="mb-3">
                                <label class="fw-bold">{{ crit.name }} ({{ crit.code }})</label>
                                <input v-model="formScores[crit.id]" type="number" step="0.01" class="form-control" placeholder="Masukkan nilai..." required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-success">Simpan Nilai</button>
                            <button type="button" @click="showModalScore = false" class="btn btn-secondary">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>