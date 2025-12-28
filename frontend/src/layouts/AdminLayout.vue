<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { sessionManager } from "../utils/sessionManager";

const router = useRouter();
const username = ref("Admin");
const showLogoutModal = ref(false);

onMounted(() => {
	// Ambil username dari localStorage
	const user = localStorage.getItem("username");
	if (user) {
		username.value = user;
	}
});

// Fungsi Logout
const handleLogout = () => {
	sessionManager.clearSession();
	showLogoutModal.value = false;
	router.push("/login"); // Kembali ke login
};

const confirmLogout = () => {
	showLogoutModal.value = true;
};

const closeLogoutModal = () => {
	showLogoutModal.value = false;
};
</script>

<template>
	<div class="d-flex" style="height: 100vh; overflow: hidden">
		<div class="bg-dark text-white p-3 d-flex flex-column sidebar">
			<h4 class="mb-4 text-center">
				<i class="bi bi-brightness-high-fill"></i> Island
			</h4>

			<ul class="nav flex-column mb-auto">
				<li class="nav-item mb-2">
					<router-link
						to="/admin/dashboard"
						class="nav-link text-white"
						active-class="active-link"
					>
						<i class="bi bi-grid-fill me-2"></i> Dashboard
					</router-link>
				</li>

				<li class="nav-item mb-2">
					<router-link
						to="/admin/cities"
						class="nav-link text-white"
						active-class="active-link"
					>
						<i class="bi bi-building me-2"></i> Data Kota
					</router-link>
				</li>

				<li class="nav-item mb-2">
					<router-link
						to="/admin/criteria"
						class="nav-link text-white"
						active-class="active-link"
					>
						<i class="bi bi-list-check me-2"></i> Kriteria
					</router-link>
				</li>

				<li class="nav-item mb-2">
					<router-link
						to="/admin/hasil"
						class="nav-link text-white"
						active-class="active-link"
					>
						<i class="bi bi-trophy-fill me-2"></i> Hasil Peringkat
					</router-link>
				</li>

				<li class="nav-item mb-2">
					<router-link
						to="/admin/users"
						class="nav-link text-white"
						active-class="active-link"
					>
						<i class="bi bi-people-fill me-2"></i> Data Admin
					</router-link>
				</li>
			</ul>
		</div>

		<div class="flex-grow-1 bg-light overflow-auto d-flex flex-column">
			<!-- Topbar -->
			<div
				class="topbar bg-white border-bottom px-4 py-2 d-flex justify-content-end align-items-center"
			>
				<div class="dropdown">
					<a
						class="d-flex align-items-center text-decoration-none dropdown-toggle"
						href="#"
						role="button"
						id="profileDropdown"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<span class="me-2 fw-semibold text-dark"
							>Welcome, {{ username }}</span
						>
						<i class="bi bi-person-circle fs-3 text-secondary"></i>
					</a>
					<ul
						class="dropdown-menu dropdown-menu-end"
						aria-labelledby="profileDropdown"
					>
						<li>
							<router-link to="/admin/profile" class="dropdown-item">
								<i class="bi bi-person-fill-gear me-2"></i> Edit Profile
							</router-link>
						</li>
						<li><hr class="dropdown-divider" /></li>
						<li>
							<a
								class="dropdown-item text-danger"
								href="#"
								@click.prevent="confirmLogout"
							>
								<i class="bi bi-box-arrow-left me-2"></i> Logout
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- Main Content -->
			<div class="container-fluid p-4 flex-grow-1 overflow-auto">
				<router-view />
			</div>
		</div>

		<!-- Logout Confirmation Modal -->
		<div
			v-if="showLogoutModal"
			class="modal d-block"
			style="background: rgba(0, 0, 0, 0.5)"
			tabindex="-1"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">
							<i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>
							Konfirmasi Logout
						</h5>
						<button
							type="button"
							class="btn-close"
							@click="closeLogoutModal"
						></button>
					</div>
					<div class="modal-body">
						Apakah Anda yakin ingin keluar dari sesi ini?
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							@click="closeLogoutModal"
						>
							Batal
						</button>
						<button type="button" class="btn btn-primary" @click="handleLogout">
							Ya, Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.sidebar {
	width: 250px;
	min-width: 250px;
	max-width: 250px;
	flex-shrink: 0;
	overflow-y: auto;
}

.active-link {
	background-color: #0d6efd;
	border-radius: 5px;
	font-weight: bold;
}

.nav-link:hover {
	background-color: #495057;
	border-radius: 5px;
}

.topbar {
	min-height: 60px;
}

.dropdown-toggle::after {
	margin-left: 0.5rem;
}
</style>
