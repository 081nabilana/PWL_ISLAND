<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const admins = ref([]);
const showModal = ref(false);
const form = ref({ username: '', email: '', password: '' });
const token = localStorage.getItem('token');
const config = { headers: { Authorization: `Bearer ${token}` } };

const fetchAdmins = async () => {
    const res = await axios.get('http://localhost:3000/api/auth/admins', config);
    admins.value = res.data;
};

const handleSubmit = async () => {
    try {
        await axios.post('http://localhost:3000/api/auth/admins', form.value, config);
        alert('Admin Berhasil Ditambah');
        showModal.value = false;
        fetchAdmins();
    } catch (e) { alert('Gagal tambah admin'); }
};

const handleDelete = async (id) => {
    if(!confirm('Hapus admin ini?')) return;
    try {
        await axios.delete(`http://localhost:3000/api/auth/admins/${id}`, config);
        fetchAdmins();
    } catch (e) { alert(e.response.data.msg); }
};

onMounted(fetchAdmins);
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Manajemen Admin</h2>
            <button @click="showModal = true" class="btn btn-primary"><i class="bi bi-person-plus"></i> Tambah Admin</button>
        </div>

        <div class="card shadow-sm">
            <div class="card-body">
                <table class="table table-striped">
                    <thead class="table-dark">
                        <tr><th>Username</th><th>Email</th><th>Role</th><th>Aksi</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in admins" :key="user.id">
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td><span class="badge bg-info">{{ user.role }}</span></td>
                            <td>
                                <button @click="openEditModal(user)" class="btn btn-sm btn-warning me-1 text-white">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button @click="handleDelete(user.id)" class="btn btn-sm btn-danger">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="showModal" class="modal d-block" style="background: rgba(0,0,0,0.5)">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"><h5>Tambah Admin</h5><button @click="showModal=false" class="btn-close"></button></div>
                    <form @submit.prevent="handleSubmit">
                        <div class="modal-body">
                            <div class="mb-2"><label>Username</label><input v-model="form.username" class="form-control" required></div>
                            <div class="mb-2"><label>Email</label><input v-model="form.email" type="email" class="form-control" required></div>
                            <div class="mb-2"><label>Password</label><input v-model="form.password" type="password" class="form-control" required></div>
                        </div>
                        <div class="modal-footer"><button type="submit" class="btn btn-primary">Simpan</button></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>