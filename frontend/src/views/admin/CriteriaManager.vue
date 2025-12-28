<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const criteria = ref([]);
const showModal = ref(false);
const form = ref({ name: '', code: '', weight: '', type: 'benefit' });
const token = localStorage.getItem('token');
const config = { headers: { Authorization: `Bearer ${token}` } };

const fetchCriteria = async () => {
    const res = await axios.get('http://localhost:3000/api/criteria');
    criteria.value = res.data;
};

const handleSubmit = async () => {
    try {
        await axios.post('http://localhost:3000/api/criteria', form.value, config);
        alert('Kriteria Berhasil Disimpan!');
        showModal.value = false;
        fetchCriteria();
        form.value = { name: '', code: '', weight: '', type: 'benefit' };
    } catch (error) {
        alert('Gagal simpan kriteria');
    }
};

const handleDelete = async (id) => {
    if(!confirm('Hapus kriteria ini?')) return;
    await axios.delete(`http://localhost:3000/api/criteria/${id}`, config);
    fetchCriteria();
};

onMounted(fetchCriteria);
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Data Kriteria</h2>
            <button @click="showModal = !showModal" class="btn btn-primary">
                <i class="bi bi-plus-circle"></i> Tambah Kriteria
            </button>
        </div>

        <div v-if="showModal" class="card mb-4 shadow-sm border-primary">
            <div class="card-header bg-primary text-white">Form Kriteria</div>
            <div class="card-body">
                <form @submit.prevent="handleSubmit">
                    <div class="row">
                        <div class="col-md-6 mb-2">
                            <label>Nama Kriteria</label>
                            <input v-model="form.name" type="text" placeholder="Contoh: Biaya Hidup" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Kode (Unik)</label>
                            <input v-model="form.code" type="text" placeholder="Contoh: C1" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Bobot (Angka)</label>
                            <input v-model="form.weight" type="number" step="0.01" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label>Tipe</label>
                            <select v-model="form.type" class="form-select">
                                <option value="benefit">Benefit (Makin besar makin bagus)</option>
                                <option value="cost">Cost (Makin kecil makin bagus)</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success mt-2">Simpan</button>
                    <button type="button" @click="showModal = false" class="btn btn-secondary mt-2 ms-2">Batal</button>
                </form>
            </div>
        </div>

        <div class="card shadow-sm">
            <div class="card-body">
                <table class="table table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th>Kode</th>
                            <th>Nama</th>
                            <th>Bobot</th>
                            <th>Tipe</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in criteria" :key="item.id">
                            <td>{{ item.code }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.weight }}</td>
                            <td>
                                <span :class="item.type === 'benefit' ? 'badge bg-success' : 'badge bg-danger'">
                                    {{ item.type }}
                                </span>
                            </td>
                            <td>
                                <button @click="handleDelete(item.id)" class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>