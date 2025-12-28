<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { sessionManager } from "../utils/sessionManager";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

// Cek apakah sudah login saat component dimount
onMounted(() => {
	const token = localStorage.getItem("token");
	if (token && !sessionManager.isSessionExpired()) {
		// Sudah login dan session masih aktif, redirect ke dashboard
		router.push("/admin/dashboard");
	}
});

const handleLogin = async () => {
	try {
		// Panggil API Backend (yang sudah kamu tes tadi)
		const response = await axios.post("http://localhost:3000/api/auth/login", {
			username: username.value,
			password: password.value,
		});

		// Simpan Token & Data User di LocalStorage (Browser)
		localStorage.setItem("token", response.data.token);
		localStorage.setItem("user", JSON.stringify(response.data.user));
		localStorage.setItem("username", response.data.user.username);

		// Initialize session
		sessionManager.initSession();

		// Pindah ke Dashboard
		alert("Login Berhasil!");
		router.push("/admin/dashboard");
	} catch (error) {
		errorMessage.value = error.response?.data?.msg || "Login Gagal!";
	}
};
</script>

<template>
	<div class="container login-form-container">
		<div class="row justify-content-center">
			<div class="col-lg-10 col-xl-9">
				<div class="card shadow-lg border-0 rounded-3 overflow-hidden">
					<div class="row g-0">
						<div
							class="col-md-5 d-none d-md-flex bg-primary text-white flex-column justify-content-center align-items-center p-5"
						>
							<i class="bi bi-brightness-high-fill" style="font-size: 5rem"></i>
							<h2 class="text-center fw-bold mt-3">Island</h2>
							<p class="text-center mt-2 opacity-75">
								Temukan kota impian Anda. Silakan login untuk mengakses panel
								admin.
							</p>
						</div>

						<div class="col-md-7 d-flex flex-column justify-content-center">
							<div class="card-body p-4 p-lg-5">
								<h3 class="fw-bold mb-4">Selamat Datang Kembali</h3>

								<div
									v-if="errorMessage"
									class="alert alert-danger alert-dismissible fade show"
									role="alert"
								>
									{{ errorMessage }}
									<button
										type="button"
										class="btn-close"
										@click="errorMessage = ''"
										aria-label="Close"
									></button>
								</div>

								<form @submit.prevent="handleLogin">
									<div class="form-floating mb-3">
										<input
											v-model="username"
											type="text"
											class="form-control"
											id="username"
											placeholder="Username"
											required
										/>
										<label for="username"
											><i class="bi bi-person-fill me-2"></i>Username</label
										>
									</div>
									<div class="form-floating mb-3">
										<input
											v-model="password"
											type="password"
											class="form-control"
											id="password"
											placeholder="Password"
											required
										/>
										<label for="password"
											><i class="bi bi-lock-fill me-2"></i>Password</label
										>
									</div>
									<div class="d-grid mt-4">
										<button
											type="submit"
											class="btn btn-primary btn-lg fw-bold"
										>
											Login
										</button>
									</div>
								</form>

								<div class="text-center mt-4">
									<router-link to="/" class="text-decoration-none">
										<i class="bi bi-arrow-left-circle me-1"></i> Kembali ke
										Halaman Utama
									</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.login-form-container {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 0;
	background-color: #f8f9fa;
}

.login-form-container .form-control,
.login-form-container .btn {
	transition: all 0.2s ease-in-out;
}

.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label {
	color: #0d6efd;
}

.form-floating > .form-control:focus ~ label > .bi,
.form-floating > .form-control:not(:placeholder-shown) ~ label > .bi {
	color: #0d6efd;
}
</style>
