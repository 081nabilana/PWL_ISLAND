<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const form = ref({ username: '', email: '', password: '' });
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
const config = { headers: { Authorization: `Bearer ${token}` } };

onMounted(() => {
    form.value.username = user.username;
    // Email tidak disimpan di localstorage saat login tadi, jadi ambil default dulu atau kosong
    form.value.email = user.email || ''; 
});

const handleUpdate = async () => {
    try {
        await axios.put('http://localhost:3000/api/auth/profile', form.value, config);
        alert('Profil diperbarui! Silakan login ulang.');
        localStorage.clear();
        window.location.href = '/';
    } catch (e) { alert('Gagal update profil'); }
};
</script>

<template>
    <div class="card shadow-sm" style="max-width: 500px; margin: 0 auto;">
        <div class="card-header bg-warning text-dark"><h4>Edit Profil Saya</h4></div>
        <div class="card-body">
            <form @submit.prevent="handleUpdate">
                <div class="mb-3">
                    <label>Username</label>
                    <input v-model="form.username" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label>Email</label>
                    <input v-model="form.email" type="email" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label>Password Baru (Kosongkan jika tidak diganti)</label>
                    <input v-model="form.password" type="password" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary w-100">Simpan Perubahan</button>
            </form>
        </div>
    </div>
</template>