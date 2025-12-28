<script setup>
// No imports needed for now
</script>

<template>
	<div class="container my-5">
		<div class="text-center mb-5">
			<h1 class="fw-bolder">Panduan Penggunaan Island</h1>
			<p class="lead fw-normal text-muted mb-0">
				Ikuti langkah-langkah mudah di bawah ini untuk memulai analisis Anda.
			</p>
		</div>

		<div class="accordion shadow-sm" id="tutorialAccordion">
			<div class="accordion-item">
				<h2 class="accordion-header" id="headingOne">
					<button
						class="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseOne"
						aria-expanded="true"
						aria-controls="collapseOne"
					>
						<span class="accordion-icon">1</span>
						<strong>Tentukan Jumlah Kota yang Akan Dibandingkan</strong>
					</button>
				</h2>
				<div
					id="collapseOne"
					class="accordion-collapse collapse show"
					aria-labelledby="headingOne"
					data-bs-parent="#tutorialAccordion"
				>
					<div class="accordion-body step-content">
						<p>
							Pertama, buka halaman "Tools". Masukkan berapa banyak kota atau
							alternatif yang ingin Anda bandingkan pada kolom yang tersedia,
							lalu klik tombol "Simpan & Lanjutkan".
						</p>
					</div>
				</div>
			</div>

			<div class="accordion-item">
				<h2 class="accordion-header" id="headingTwo">
					<button
						class="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseTwo"
						aria-expanded="false"
						aria-controls="collapseTwo"
					>
						<span class="accordion-icon">2</span>
						<strong>Pilih Kota dari Daftar</strong>
					</button>
				</h2>
				<div
					id="collapseTwo"
					class="accordion-collapse collapse"
					aria-labelledby="headingTwo"
					data-bs-parent="#tutorialAccordion"
				>
					<div class="accordion-body step-content">
						<p>
							Setelah jumlah kota ditentukan, akan muncul beberapa menu
							dropdown. Pilih kota yang berbeda untuk setiap menu. Anda juga
							bisa mengetik nama kota untuk mencarinya. Jika sudah, klik
							"Analisa Sekarang".
						</p>
					</div>
				</div>
			</div>

			<div class="accordion-item">
				<h2 class="accordion-header" id="headingThree">
					<button
						class="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseThree"
						aria-expanded="false"
						aria-controls="collapseThree"
					>
						<span class="accordion-icon">3</span>
						<strong>Lihat Hasil Peringkat</strong>
					</button>
				</h2>
				<div
					id="collapseThree"
					class="accordion-collapse collapse"
					aria-labelledby="headingThree"
					data-bs-parent="#tutorialAccordion"
				>
					<div class="accordion-body step-content">
						<p>
							Aplikasi akan menampilkan tabel hasil peringkat destinasi
							berdasarkan perbandingan kriteria yang telah Anda pilih. Kota
							dengan peringkat teratas adalah rekomendasi terbaik untuk Anda.
						</p>
					</div>
				</div>
			</div>

			<div class="accordion-item">
				<h2 class="accordion-header" id="headingFour">
					<button
						class="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseFour"
						aria-expanded="false"
						aria-controls="collapseFour"
					>
						<span class="accordion-icon">4</span>
						<strong>Pahami Rincian Proses Perhitungan</strong>
					</button>
				</h2>
				<div
					id="collapseFour"
					class="accordion-collapse collapse"
					aria-labelledby="headingFour"
					data-bs-parent="#tutorialAccordion"
				>
					<div class="accordion-body step-content">
						<p>
							Di bawah tabel hasil utama, Anda dapat melihat rincian lengkap
							proses perhitungan metode Promethee, mulai dari matriks
							perbandingan, indeks preferensi, hingga nilai leaving, entering,
							dan net flow untuk setiap alternatif.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- BAGIAN PETA LOKASI -->
	<div class="container my-5 py-5">
		<div class="text-center mb-5">
			<h2 class="fw-bolder">Temukan Kami</h2>
			<p class="lead fw-normal text-muted">
				Kunjungi kami di Universitas Mataram.
			</p>
		</div>
		<div
			class="map-responsive shadow-lg"
			style="border-radius: 1rem; overflow: hidden"
		>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.987!2d116.1159!3d-8.5833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdbf8ff0e1e5a9%3A0xf9f4b0b1f9f4b0b1!2sJl.%20Majapahit%20No.62%2C%20Gomong%2C%20Kec.%20Selaparang%2C%20Kota%20Mataram%2C%20Nusa%20Tenggara%20Bar.%2083115!5e0!3m2!1sen!2sid!4v1733302800000!5m2!1sen!2sid"
				width="100%"
				height="450"
				style="border: 0"
				allowfullscreen=""
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</div>

	<!-- BAGIAN KONTAK -->
	<div class="bg-light">
		<div class="container py-5">
			<div class="text-center mb-5">
				<h2 class="fw-bolder">Hubungi Kami</h2>
				<p class="lead fw-normal text-muted">
					Punya pertanyaan atau masukan? Kami siap membantu.
				</p>
			</div>
			<div class="row gx-5 justify-content-center">
				<div class="col-lg-10 col-xl-8">
					<div class="card p-4 shadow-sm border-0">
						<div class="card-body">
							<div class="row gx-5">
								<div class="col-lg-5 mb-5 mb-lg-0">
									<div class="d-flex align-items-start mb-4">
										<div
											class="feature-icon-contact bg-primary bg-gradient text-white me-3"
										>
											<i class="bi bi-geo-alt-fill"></i>
										</div>
										<div>
											<h5 class="fw-bold">Alamat</h5>
											<p class="text-muted small">
												Jl. Majapahit No.62, Gomong, Kec. Selaparang, Kota
												Mataram, Nusa Tenggara Bar. 83115
											</p>
										</div>
									</div>
									<div class="d-flex align-items-start mb-4">
										<div
											class="feature-icon-contact bg-primary bg-gradient text-white me-3"
										>
											<i class="bi bi-envelope-fill"></i>
										</div>
										<div>
											<h5 class="fw-bold">Email</h5>
											<p class="text-muted small">kontak@islandapp.com</p>
										</div>
									</div>
									<div class="d-flex align-items-start">
										<div
											class="feature-icon-contact bg-primary bg-gradient text-white me-3"
										>
											<i class="bi bi-telephone-fill"></i>
										</div>
										<div>
											<h5 class="fw-bold">Telepon</h5>
											<p class="text-muted small">+62 123 4567 890</p>
										</div>
									</div>
								</div>
								<div class="col-lg-7">
									<form @submit.prevent="handleSubmit">
										<div class="form-floating mb-3">
											<input
												class="form-control"
												id="name"
												type="text"
												placeholder="Masukkan nama Anda..."
												required
											/>
											<label for="name">Nama Lengkap</label>
										</div>
										<div class="form-floating mb-3">
											<input
												class="form-control"
												id="email"
												type="email"
												placeholder="nama@contoh.com"
												required
											/>
											<label for="email">Alamat Email</label>
										</div>
										<div class="form-floating mb-3">
											<textarea
												class="form-control"
												id="message"
												placeholder="Masukkan pesan Anda di sini..."
												style="height: 10rem"
												required
											></textarea>
											<label for="message">Pesan</label>
										</div>
										<div class="d-grid">
											<button class="btn btn-primary btn-lg" type="submit">
												Kirim Pesan
											</button>
										</div>
									</form>
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
.accordion-button:not(.collapsed) {
	color: #fff;
	background-color: #0d6efd;
}

.accordion-button:focus {
	box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.accordion-icon {
	font-size: 1.5rem;
	margin-right: 1rem;
	width: 40px;
	text-align: center;
}

.step-content img {
	max-width: 100%;
	border-radius: 0.5rem;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
	margin-top: 1rem;
}

.feature-icon-contact {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 3.5rem;
	width: 3.5rem;
	font-size: 1.5rem;
	border-radius: 0.75rem;
	flex-shrink: 0;
}
</style>
