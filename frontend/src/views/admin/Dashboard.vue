<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("Admin");

onMounted(() => {
	// Ambil username dari localStorage jika ada
	const user = localStorage.getItem("username");
	if (user) {
		username.value = user;
	}
});

const navigateTo = (path) => {
	router.push(path);
};
</script>

<template>
	<div>
		<div class="hero-section">
			<h2>Selamat Datang, {{ username }}!</h2>
			<p class="lead mb-0">
				Anda dapat mengoperasikan sistem pengambilan keputusan ini melalui menu
				di bawah.
			</p>
		</div>

		<div class="row g-4">
			<div class="col-lg-3 col-md-6">
				<a
					@click="navigateTo('/admin/cities')"
					class="text-decoration-none cursor-pointer"
				>
					<div class="card shadow-sm h-100 menu-card">
						<div class="card-body text-center p-4">
							<i class="bi bi-table display-4 text-primary mb-3"></i>
							<h5 class="card-title text-dark">Data Kota</h5>
						</div>
					</div>
				</a>
			</div>

			<div class="col-lg-3 col-md-6">
				<a
					@click="navigateTo('/admin/criteria')"
					class="text-decoration-none cursor-pointer"
				>
					<div class="card shadow-sm h-100 menu-card">
						<div class="card-body text-center p-4">
							<i class="bi bi-list-check display-4 text-success mb-3"></i>
							<h5 class="card-title text-dark">Data Kriteria</h5>
						</div>
					</div>
				</a>
			</div>

			<div class="col-lg-3 col-md-6">
				<a
					@click="navigateTo('/admin/hasil')"
					class="text-decoration-none cursor-pointer"
				>
					<div class="card shadow-sm h-100 menu-card">
						<div class="card-body text-center p-4">
							<i class="bi bi-trophy-fill display-4 text-warning mb-3"></i>
							<h5 class="card-title text-dark">Hasil Peringkat</h5>
						</div>
					</div>
				</a>
			</div>

			<div class="col-lg-3 col-md-6">
				<a
					@click="navigateTo('/admin/users')"
					class="text-decoration-none cursor-pointer"
				>
					<div class="card shadow-sm h-100 menu-card">
						<div class="card-body text-center p-4">
							<i class="bi bi-person-fill-gear display-4 text-danger mb-3"></i>
							<h5 class="card-title text-dark">Manajemen Admin</h5>
						</div>
					</div>
				</a>
			</div>
		</div>

		<div class="card mt-4 info-card">
			<div class="card-body">
				<h5 class="card-title text-primary">
					<i class="bi bi-info-circle-fill me-2"></i>Informasi Sistem
				</h5>
				<p class="mb-0">
					Website ini merupakan sistem pengambilan keputusan berbasis metode
					Promethee yang membantu pengguna dalam menentukan pilihan kota terbaik
					untuk kebutuhan kerja jarak jauh.
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.hero-section {
	background: linear-gradient(135deg, #0d6efd, #0d95fd);
	color: white;
	padding: 2.5rem;
	border-radius: 0.75rem;
	margin-bottom: 2rem;
}

.hero-section h2 {
	font-weight: 700;
}

.menu-card {
	transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	cursor: pointer;
}

.menu-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.info-card {
	background-color: #e9f5ff;
	border-left: 5px solid #0d6efd;
}

.cursor-pointer {
	cursor: pointer;
}

.text-danger {
	color: #dc3545;
}

.text-dark {
	color: #212529;
}

.display-4 {
	font-size: 3rem;
	font-weight: 300;
	line-height: 1.2;
}
</style>
