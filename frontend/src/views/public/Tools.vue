<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { sessionManager } from "../../utils/sessionManager";

const router = useRouter();
const cities = ref([]);
const selectedCities = ref([]);
const resultData = ref(null);
const loading = ref(false);
const isLoggedIn = ref(false);

onMounted(async () => {
	try {
		const res = await axios.get("http://localhost:3000/api/cities");
		cities.value = res.data;

		const token = localStorage.getItem("token");
		if (token && !sessionManager.isSessionExpired()) {
			isLoggedIn.value = true;
		}
	} catch (e) {
		console.error(e);
	}
});

const handleAnalyze = async () => {
	if (selectedCities.value.length < 2) {
		alert("Pilih minimal 2 kota!");
		return;
	}
	loading.value = true;
	try {
		const res = await axios.post(
			"http://localhost:3000/api/promethee/analyze",
			{
				city_ids: selectedCities.value,
			}
		);
		resultData.value = res.data.data;
	} catch (e) {
		alert(
			"Gagal menghitung. Pastikan kota yang dipilih sudah dinilai oleh admin."
		);
	} finally {
		loading.value = false;
	}
};

const goToDashboard = () => {
	router.push("/admin/dashboard");
};
</script>

<template>
	<div class="bg-light py-5">
		<div class="container">
			<!-- Header -->
			<div class="text-center mb-5">
				<h1 class="display-5 fw-bold text-primary mb-3">Cari Kota Terbaik</h1>
				<p class="text-muted fs-5">
					Pilih kota-kota yang ingin Anda bandingkan, kami akan hitung rankingnya.
				</p>
			</div>

			<!-- Main Content -->
			<div class="row g-4">
				<!-- Sidebar - Pilih Kota -->
				<div class="col-lg-4">
					<div class="card shadow-sm border-0 h-100">
						<!-- Header Card -->
						<div class="card-header bg-primary text-white py-3">
							<i class="bi bi-check-circle me-2"></i>
							<strong>Pilih Kota</strong>
						</div>

						<!-- Body Card - Daftar Kota -->
						<div class="card-body" style="max-height: 350px; overflow-y: auto">
							<div v-for="city in cities" :key="city.id" class="form-check mb-3">
								<input
									class="form-check-input"
									type="checkbox"
									:value="city.id"
									v-model="selectedCities"
									:id="'city-' + city.id"
								/>
								<label class="form-check-label" :for="'city-' + city.id">
									{{ city.name }}
								</label>
							</div>
						</div>

						<!-- Footer Card - Tombol Hitung -->
						<div class="card-footer bg-light border-top">
							<button
								@click="handleAnalyze"
								class="btn btn-success w-100 fw-bold py-2"
								:disabled="loading || selectedCities.length === 0"
							>
								{{ loading ? "Menghitung..." : "Hitung Sekarang" }}
							</button>
						</div>
					</div>
				</div>

				<!-- Main Content - Hasil -->
				<div class="col-lg-8">
					<div v-if="resultData" class="card shadow-sm border-0 h-100">
						<!-- Header Result -->
						<div class="card-header bg-warning text-dark py-3">
							<i class="bi bi-trophy-fill me-2"></i>
							<strong>Hasil Rekomendasi</strong>
						</div>

						<!-- Table Result -->
						<div class="card-body p-0">
							<div class="table-responsive">
								<table class="table table-hover mb-0">
									<thead class="table-dark">
										<tr>
											<th class="text-center" style="width: 80px">Rank</th>
											<th>Nama Kota</th>
											<th class="text-end" style="width: 150px">Net Flow (Nilai Akhir)</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="res in resultData" :key="res.city_id">
											<td class="text-center">
												<span
													:class="
														res.rank === 1
															? 'badge bg-warning text-dark fs-6'
															: 'badge bg-secondary fs-6'
													"
												>
													#{{ res.rank }}
												</span>
											</td>
											<td class="align-middle">{{ res.city_name }}</td>
											<td class="align-middle text-end fw-bold">
												{{ res.net_flow.toFixed(4) }}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<!-- Empty State -->
					<div v-else class="card shadow-sm border-0 h-100">
						<div class="card-body d-flex flex-column align-items-center justify-content-center py-5">
							<div class="text-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="80"
									height="80"
									fill="currentColor"
									class="bi bi-search text-info opacity-50 mb-3"
									viewBox="0 0 16 16"
								>
									<path
										d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.003-.003.007-.007.012-.011a6.507 6.507 0 0 0 1.386-1.387z"
									/>
									<path d="M12.996 13.004l2.96 2.96a.75.75 0 1 0 1.061-1.061l-2.96-2.96a.75.75 0 1 0-1.061 1.061z" />
								</svg>
								<h5 class="fw-bold text-dark mt-3">Belum ada hasil</h5>
								<p class="text-muted">
									Silakan pilih kota di samping dan klik tombol Hitung.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.card {
	border-radius: 0.5rem;
	transition: box-shadow 0.3s ease;
}

.card:hover {
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card-header {
	border-radius: 0.5rem 0.5rem 0 0;
	font-size: 1.1rem;
}

.form-check-input:checked {
	background-color: #0d6efd;
	border-color: #0d6efd;
}

.form-check-input:focus {
	border-color: #0d6efd;
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.table-hover tbody tr:hover {
	background-color: #f5f5f5;
}

.badge {
	padding: 0.5rem 0.75rem;
	font-size: 0.9rem;
}

.btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
</style>
