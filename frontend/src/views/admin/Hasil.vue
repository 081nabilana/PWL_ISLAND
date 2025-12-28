<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const cities = ref([]);
const criteria = ref([]);
const scores = ref([]);
const perhitungan = ref(null);
const loading = ref(true);

// Fetch data dan hitung Promethee
onMounted(async () => {
	try {
		const [resCities, resCriteria, resScores] = await Promise.all([
			axios.get("http://localhost:3000/api/cities"),
			axios.get("http://localhost:3000/api/criteria"),
			axios.get("http://localhost:3000/api/scores"),
		]);

		cities.value = resCities.data;
		criteria.value = resCriteria.data;
		scores.value = resScores.data;

		console.log("Cities:", cities.value);
		console.log("Criteria:", criteria.value);
		console.log("Scores:", scores.value);

		// Hitung Promethee
		calculatePromethee();
	} catch (e) {
		console.error("Error fetching data:", e);
	} finally {
		loading.value = false;
	}
});

const calculatePromethee = () => {
	if (
		cities.value.length < 2 ||
		criteria.value.length < 1 ||
		scores.value.length < 1
	) {
		perhitungan.value = null;
		return;
	}

	const n = cities.value.length;
	const m = criteria.value.length;

	// 1. Matriks Data Awal
	const dataMap = {};
	cities.value.forEach((city) => {
		dataMap[city.id] = {};
		criteria.value.forEach((crit) => {
			dataMap[city.id][crit.id] = 0;
		});
	});

	scores.value.forEach((score) => {
		if (dataMap[score.city_id]) {
			dataMap[score.city_id][score.criteria_id] = parseFloat(score.value);
		}
	});

	const dataAwal = cities.value.map((city) =>
		criteria.value.map((crit) => dataMap[city.id][crit.id])
	);

	// 2. Matriks Selisih dan Preferensi per Kriteria
	const matriksPerKriteria = criteria.value.map((crit) => {
		const matriksSelisih = [];
		const matriksPreferensi = [];

		for (let i = 0; i < n; i++) {
			const rowSelisih = [];
			const rowPreferensi = [];

			for (let j = 0; j < n; j++) {
				const valA = dataMap[cities.value[i].id][crit.id];
				const valB = dataMap[cities.value[j].id][crit.id];

				let diff = valA - valB;

				// Jika Cost, logikanya dibalik
				if (crit.type === "cost") {
					diff = valB - valA;
				}

				rowSelisih.push(diff);
				rowPreferensi.push(diff > 0 ? 1 : 0);
			}

			matriksSelisih.push(rowSelisih);
			matriksPreferensi.push(rowPreferensi);
		}

		return {
			nama: crit.name,
			bobot: crit.weight,
			tipe: crit.type,
			matriks_selisih: matriksSelisih,
			matriks_preferensi: matriksPreferensi,
		};
	});

	// 3. Matriks Preferensi Agregat
	const matriksPreferensiAgregat = [];
	for (let i = 0; i < n; i++) {
		const row = [];
		for (let j = 0; j < n; j++) {
			let sum = 0;
			criteria.value.forEach((crit, k) => {
				const P = matriksPerKriteria[k].matriks_preferensi[i][j];
				sum += P * parseFloat(crit.weight);
			});
			row.push(sum);
		}
		matriksPreferensiAgregat.push(row);
	}

	// 4. Hitung Leaving Flow, Entering Flow, Net Flow
	const leavingFlow = {};
	const enteringFlow = {};

	cities.value.forEach((city) => {
		leavingFlow[city.id] = 0;
		enteringFlow[city.id] = 0;
	});

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (i !== j) {
				leavingFlow[cities.value[i].id] += matriksPreferensiAgregat[i][j];
				enteringFlow[cities.value[j].id] += matriksPreferensiAgregat[i][j];
			}
		}
	}

	// Normalisasi dan Net Flow
	const hasilAkhir = cities.value.map((city) => {
		const lf = leavingFlow[city.id] / (n - 1);
		const ef = enteringFlow[city.id] / (n - 1);
		const nf = lf - ef;

		return {
			city_id: city.id,
			nama: city.name,
			leaving_flow: lf,
			entering_flow: ef,
			net_flow: nf,
		};
	});

	// Sorting berdasarkan Net Flow
	hasilAkhir.sort((a, b) => b.net_flow - a.net_flow);
	hasilAkhir.forEach((item, index) => {
		item.rank = index + 1;
	});

	perhitungan.value = {
		alternatif: cities.value.map((c) => c.name),
		kriteria: criteria.value.map((c) => c.name),
		data_awal: dataAwal,
		matriks_per_kriteria: matriksPerKriteria,
		matriks_preferensi_agregat: matriksPreferensiAgregat,
		hasil_akhir: hasilAkhir,
	};
};

const handlePrint = () => {
	window.print();
};
</script>

<template>
	<div>
		<div class="d-flex justify-content-between align-items-center mb-4 noprint">
			<h2 class="mb-0">
				<i class="bi bi-trophy-fill me-2"></i>Hasil Peringkat & Perhitungan
			</h2>
			<button class="btn btn-success" @click="handlePrint">
				<i class="bi bi-file-earmark-pdf-fill me-1"></i> Cetak / Simpan PDF
			</button>
		</div>

		<div v-if="loading" class="text-center py-5">
			<div class="spinner-border text-primary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>

		<div v-else-if="perhitungan">
			<!-- Tabel Peringkat Akhir -->
			<div class="card shadow-sm mb-4">
				<div class="card-header bg-primary text-white">
					<h4 class="mb-0">
						<i class="bi bi-bar-chart-line-fill me-2"></i>Tabel Peringkat Akhir
					</h4>
				</div>
				<div class="card-body">
					<p>
						Tabel di bawah ini adalah hasil akhir yang mengurutkan kota
						berdasarkan <strong>Net Flow</strong>. Nilai Net Flow yang lebih
						tinggi menunjukkan alternatif yang lebih baik secara keseluruhan.
					</p>
					<div class="table-responsive">
						<table class="table table-bordered table-striped table-hover">
							<thead class="table-dark">
								<tr>
									<th class="text-center">Peringkat</th>
									<th>Nama Kota</th>
									<th class="text-end">Leaving Flow (Φ+)</th>
									<th class="text-end">Entering Flow (Φ-)</th>
									<th class="text-end">Net Flow (Φ)</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="row in perhitungan.hasil_akhir" :key="row.city_id">
									<td class="text-center">
										<span
											class="badge fs-6"
											:class="{
												'bg-success': row.rank === 1,
												'bg-info': row.rank === 2,
												'bg-warning': row.rank === 3,
												'bg-secondary': row.rank > 3,
											}"
											>{{ row.rank }}</span
										>
									</td>
									<td>{{ row.nama }}</td>
									<td class="text-end">{{ row.leaving_flow.toFixed(4) }}</td>
									<td class="text-end">{{ row.entering_flow.toFixed(4) }}</td>
									<td class="text-end fw-bold">
										{{ row.net_flow.toFixed(4) }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- Rincian Proses Perhitungan -->
			<div class="card shadow-sm">
				<div class="card-header bg-primary text-white">
					<h4 class="mb-0">
						<i class="bi bi-calculator me-2"></i>Rincian Proses Perhitungan
						Promethee
					</h4>
				</div>
				<div class="card-body">
					<div class="accordion" id="accordionPanelsStayOpenExample">
						<!-- Langkah 1: Matriks Data Awal -->
						<div class="accordion-item">
							<h2 class="accordion-header" id="panelsStayOpen-headingOne">
								<button
									class="accordion-button collapsed"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#panelsStayOpen-collapseOne"
									aria-expanded="false"
									aria-controls="panelsStayOpen-collapseOne"
								>
									<strong>Langkah 1: Matriks Data Awal</strong>
								</button>
							</h2>
							<div
								id="panelsStayOpen-collapseOne"
								class="accordion-collapse collapse"
								aria-labelledby="panelsStayOpen-headingOne"
							>
								<div class="accordion-body">
									<p>
										Tabel ini berisi data nilai dari setiap alternatif (baris)
										untuk setiap kriteria (kolom).
									</p>
									<div class="table-responsive">
										<table class="table table-bordered table-sm">
											<thead class="table-light">
												<tr>
													<th>Alternatif</th>
													<th
														class="text-center"
														v-for="krit in perhitungan.kriteria"
														:key="krit"
													>
														{{ krit }}
													</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="(row, idx) in perhitungan.data_awal"
													:key="idx"
												>
													<td>
														<strong>{{ perhitungan.alternatif[idx] }}</strong>
													</td>
													<td
														class="text-center"
														v-for="(val, vidx) in row"
														:key="vidx"
													>
														{{ val }}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

						<!-- Langkah 2: Matriks Selisih dan Preferensi per Kriteria -->
						<div class="accordion-item">
							<h2 class="accordion-header" id="panelsStayOpen-headingTwo">
								<button
									class="accordion-button collapsed"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#panelsStayOpen-collapseTwo"
									aria-expanded="false"
									aria-controls="panelsStayOpen-collapseTwo"
								>
									<strong
										>Langkah 2: Matriks Selisih dan Preferensi per
										Kriteria</strong
									>
								</button>
							</h2>
							<div
								id="panelsStayOpen-collapseTwo"
								class="accordion-collapse collapse"
								aria-labelledby="panelsStayOpen-headingTwo"
							>
								<div class="accordion-body">
									<p>
										Untuk setiap kriteria, dihitung selisih nilai antar
										alternatif (d) dan ditentukan nilai preferensi (P)
										berdasarkan tipe kriteria (Benefit/Cost).
									</p>

									<div
										v-for="(
											kriteria_matrix, kidx
										) in perhitungan.matriks_per_kriteria"
										:key="kidx"
									>
										<h5 class="mt-3">
											Kriteria:
											<span class="fw-bold">{{ kriteria_matrix.nama }}</span>
											(Bobot: {{ kriteria_matrix.bobot }}, Tipe:
											{{
												kriteria_matrix.tipe.charAt(0).toUpperCase() +
												kriteria_matrix.tipe.slice(1)
											}})
										</h5>

										<h6>Matriks Selisih d(a, b)</h6>
										<div class="table-responsive mb-3">
											<table class="table table-bordered table-sm">
												<thead class="table-light">
													<tr>
														<th>a \ b</th>
														<th
															class="text-center"
															v-for="alt in perhitungan.alternatif"
															:key="alt"
														>
															{{ alt }}
														</th>
													</tr>
												</thead>
												<tbody>
													<tr
														v-for="(
															row, idx
														) in kriteria_matrix.matriks_selisih"
														:key="idx"
													>
														<td>
															<strong>{{ perhitungan.alternatif[idx] }}</strong>
														</td>
														<td
															class="text-center"
															v-for="(val, vidx) in row"
															:key="vidx"
														>
															{{ val.toFixed(2) }}
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<h6>Matriks Preferensi P(a, b)</h6>
										<div class="table-responsive">
											<table class="table table-bordered table-sm">
												<thead class="table-light">
													<tr>
														<th>a \ b</th>
														<th
															class="text-center"
															v-for="alt in perhitungan.alternatif"
															:key="alt"
														>
															{{ alt }}
														</th>
													</tr>
												</thead>
												<tbody>
													<tr
														v-for="(
															row, idx
														) in kriteria_matrix.matriks_preferensi"
														:key="idx"
													>
														<td>
															<strong>{{ perhitungan.alternatif[idx] }}</strong>
														</td>
														<td
															class="text-center"
															v-for="(val, vidx) in row"
															:key="vidx"
														>
															{{ val }}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
										<hr />
									</div>
								</div>
							</div>
						</div>

						<!-- Langkah 3: Indeks Preferensi Agregat -->
						<div class="accordion-item">
							<h2 class="accordion-header" id="panelsStayOpen-headingThree">
								<button
									class="accordion-button collapsed"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#panelsStayOpen-collapseThree"
									aria-expanded="false"
									aria-controls="panelsStayOpen-collapseThree"
								>
									<strong>Langkah 3: Indeks Preferensi Agregat π(a, b)</strong>
								</button>
							</h2>
							<div
								id="panelsStayOpen-collapseThree"
								class="accordion-collapse collapse"
								aria-labelledby="panelsStayOpen-headingThree"
							>
								<div class="accordion-body">
									<p>
										Matriks ini menggabungkan semua nilai preferensi dari setiap
										kriteria yang telah dikalikan dengan bobotnya masing-masing.
									</p>
									<div class="table-responsive">
										<table class="table table-bordered table-sm">
											<thead class="table-light">
												<tr>
													<th>a \ b</th>
													<th
														class="text-center"
														v-for="alt in perhitungan.alternatif"
														:key="alt"
													>
														{{ alt }}
													</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="(
														row, idx
													) in perhitungan.matriks_preferensi_agregat"
													:key="idx"
												>
													<td>
														<strong>{{ perhitungan.alternatif[idx] }}</strong>
													</td>
													<td
														class="text-end"
														v-for="(val, vidx) in row"
														:key="vidx"
													>
														{{ val.toFixed(4) }}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

						<!-- Langkah 4: Perhitungan Leaving, Entering, dan Net Flow -->
						<div class="accordion-item">
							<h2 class="accordion-header" id="panelsStayOpen-headingFour">
								<button
									class="accordion-button collapsed"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#panelsStayOpen-collapseFour"
									aria-expanded="false"
									aria-controls="panelsStayOpen-collapseFour"
								>
									<strong
										>Langkah 4: Perhitungan Leaving, Entering, dan Net
										Flow</strong
									>
								</button>
							</h2>
							<div
								id="panelsStayOpen-collapseFour"
								class="accordion-collapse collapse"
								aria-labelledby="panelsStayOpen-headingFour"
							>
								<div class="accordion-body">
									<ul>
										<li>
											<strong>Leaving Flow (Φ+):</strong> Seberapa kuat suatu
											alternatif lebih unggul dari semua alternatif lain.
											(Jumlah nilai per baris pada matriks agregat).
										</li>
										<li>
											<strong>Entering Flow (Φ-):</strong> Seberapa kuat semua
											alternatif lain lebih unggul dari alternatif ini. (Jumlah
											nilai per kolom pada matriks agregat).
										</li>
										<li>
											<strong>Net Flow (Φ):</strong> Selisih antara Leaving dan
											Entering Flow, yang menentukan peringkat akhir.
										</li>
									</ul>
									<div class="table-responsive">
										<table class="table table-bordered">
											<thead class="table-light">
												<tr>
													<th>Alternatif</th>
													<th class="text-end">Leaving Flow (Φ+)</th>
													<th class="text-end">Entering Flow (Φ-)</th>
													<th class="text-end">Net Flow (Φ)</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="flow_data in perhitungan.hasil_akhir
														.slice()
														.sort((a, b) => a.nama.localeCompare(b.nama))"
													:key="flow_data.city_id"
												>
													<td>
														<strong>{{ flow_data.nama }}</strong>
													</td>
													<td class="text-end">
														{{ flow_data.leaving_flow.toFixed(4) }}
													</td>
													<td class="text-end">
														{{ flow_data.entering_flow.toFixed(4) }}
													</td>
													<td class="text-end">
														{{ flow_data.net_flow.toFixed(4) }}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Alert jika data tidak cukup -->
		<div v-else class="alert alert-warning" role="alert">
			<h4 class="alert-heading">
				<i class="bi bi-exclamation-triangle-fill"></i> Data Tidak Cukup!
			</h4>
			<p class="mb-2">
				<strong>Status Data:</strong>
			</p>
			<ul class="mb-3">
				<li>
					Jumlah Kota: <strong>{{ cities.length }}</strong>
					{{ cities.length < 2 ? "❌ (Minimal 2 kota diperlukan)" : "✅" }}
				</li>
				<li>
					Jumlah Kriteria: <strong>{{ criteria.length }}</strong>
					{{
						criteria.length < 1 ? "❌ (Minimal 1 kriteria diperlukan)" : "✅"
					}}
				</li>
				<li>
					Jumlah Penilaian: <strong>{{ scores.length }}</strong>
					{{ scores.length < 1 ? "❌ (Belum ada penilaian kota)" : "✅" }}
				</li>
			</ul>
			<div class="alert alert-info mb-3">
				<strong><i class="bi bi-info-circle"></i> Catatan Penting:</strong
				><br />
				Setelah menambahkan kota, Anda harus mengisi
				<strong>penilaian/nilai</strong> untuk setiap kota dengan mengklik
				tombol <span class="badge bg-warning text-dark">Input Nilai</span> di
				halaman Data Kota.
			</div>
			<hr />
			<p class="mb-0">Silakan kembali ke halaman:</p>
			<div class="mt-2">
				<router-link to="/admin/cities" class="btn btn-sm btn-primary me-2">
					<i class="bi bi-building"></i> Data Kota
				</router-link>
				<router-link to="/admin/criteria" class="btn btn-sm btn-success">
					<i class="bi bi-list-check"></i> Data Kriteria
				</router-link>
			</div>
		</div>
	</div>
</template>

<style scoped>
@media print {
	.noprint {
		display: none;
	}
}
</style>
