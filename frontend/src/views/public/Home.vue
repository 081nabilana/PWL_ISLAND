<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { sessionManager } from "../../utils/sessionManager";

const router = useRouter();
const criteria = ref([]);

onMounted(async () => {
	try {
		const resCriteria = await axios.get("http://localhost:3000/api/criteria");
		criteria.value = resCriteria.data;
	} catch (e) {
		console.error(e);
	}
});

const goToTools = () => {
	router.push("/tools");
};

const getIconClass = (name) => {
	if (name.toLowerCase().includes("biaya")) return "bi-cash-stack";
	if (name.toLowerCase().includes("internet")) return "bi-wifi";
	if (name.toLowerCase().includes("keamanan")) return "bi-shield-check";
	if (name.toLowerCase().includes("transportasi")) return "bi-car-front-fill";
	if (
		name.toLowerCase().includes("iklim") ||
		name.toLowerCase().includes("cuaca")
	)
		return "bi-cloud-sun";
	return "bi-check2-circle";
};
</script>

<template>
	<div>
		<!-- Hero Section -->
		<div class="hero-section">
			<div class="hero-content">
				<h1 class="display-4">Temukan Tempat Tinggal Ideal Anda</h1>

				<p class="lead col-lg-8 mx-auto">
					Biarkan <strong>Island</strong> memandu Anda menemukan kota terbaik
					berdasarkan preferensi pribadi Anda melalui analisis data yang
					objektif.
				</p>

				<div class="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
					<button
						@click="goToTools"
						type="button"
						class="btn btn-primary btn-lg px-4 gap-3"
					>
						<i class="bi bi-tools me-1"></i> Mulai Perjalanan Anda
					</button>
					<button
						@click="router.push('/tutorial')"
						type="button"
						class="btn btn-outline-light btn-lg px-4"
					>
						<i class="bi bi-book-half me-1"></i> Lihat Tutorial
					</button>
				</div>
			</div>
		</div>

		<!-- Kriteria Section -->
		<div class="container mb-5">
			<h2 class="section-title">Kriteria Penilaian Kami</h2>
			<div class="row g-3 justify-content-center">
				<div v-for="k in criteria" :key="k.id" class="col-6 col-md-4 col-lg-2">
					<div class="kriteria-card-baru">
						<div class="kriteria-icon-wrapper">
							<i :class="['bi', getIconClass(k.name)]"></i>
						</div>
						<h5 class="mb-0">{{ k.name }}</h5>
					</div>
				</div>
			</div>
			<div class="text-center mt-4 pt-3">
				<p class="text-muted">
					<strong>Sumber Data:</strong> Data kami bersumber dari survei publik,
					badan statistik nasional, dan penyedia layanan pihak ketiga yang
					terverifikasi untuk menjamin keakuratan dan objektivitas dalam setiap
					analisis.
				</p>
			</div>
		</div>

		<!-- Destinasi Section -->
		<div class="bg-light py-5 mb-5">
			<div class="container">
				<h2 class="section-title">Jelajahi Destinasi Pilihan</h2>
				<div class="row g-4">
					<div class="col-md-4">
						<div class="card shadow-sm h-100 city-card">
							<img
								src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=250&fit=crop"
								class="card-img-top"
								alt="Bali"
							/>
							<div class="card-body">
								<h5 class="card-title">Surga Tropis di Bali</h5>
								<p class="card-text">
									Temukan ketenangan di antara tebing kapur dan pantai berpasir
									putih. Bali menawarkan keseimbangan unik antara budaya, alam,
									dan gaya hidup modern.
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card shadow-sm h-100 city-card">
							<img
								src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=500&h=250&fit=crop"
								class="card-img-top"
								alt="Jawa Tengah"
							/>
							<div class="card-body">
								<h5 class="card-title">Kekayaan Budaya Jawa Tengah</h5>
								<p class="card-text">
									Selami warisan sejarah dan spiritual yang kental. Kota-kota di
									sini menawarkan biaya hidup yang terjangkau dengan akses ke
									keindahan alam dan cagar budaya dunia.
								</p>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card shadow-sm h-100 city-card">
							<img
								src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=250&fit=crop"
								class="card-img-top"
								alt="Flores"
							/>
							<div class="card-body">
								<h5 class="card-title">Petualangan Alam di Flores</h5>
								<p class="card-text">
									Bagi jiwa petualang, Flores adalah rumahnya. Dari danau tiga
									warna hingga pulau komodo, keajaiban alam menanti di setiap
									sudutnya.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Tentang Kami Section -->
		<div class="container my-5 py-5">
			<div class="row justify-content-center mb-5">
				<div class="col-lg-8 text-center">
					<h2 class="fw-bolder">Mengenal Visi di Balik Island</h2>
					<p class="lead fw-normal text-muted">
						Kami percaya teknologi dapat menyederhanakan keputusan terbesar
						dalam hidup Anda dengan cara yang indah dan transparan.
					</p>
				</div>
			</div>

			<div class="row gx-5 align-items-center mb-5 pb-4">
				<div class="col-lg-6">
					<img
						class="img-fluid rounded-3 shadow-lg mb-5 mb-lg-0"
						src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
						alt="Keindahan Indonesia"
					/>
				</div>
				<div class="col-lg-6">
					<h3 class="fw-semibold lh-1 mb-3">
						Berawal dari Data & Cinta Indonesia
					</h3>
					<p class="lead fw-normal text-muted">
						Aplikasi <strong>Island</strong> lahir dari kecintaan kami pada data
						dan keindahan Indonesia. Kami adalah sekelompok pengembang dan
						analis yang percaya bahwa teknologi dapat mempermudah salah satu
						keputusan terbesar dalam hidup: memilih tempat tinggal.
					</p>
				</div>
			</div>

			<div class="row gx-5 align-items-center">
				<div class="col-lg-6 order-lg-2">
					<img
						class="img-fluid rounded-3 shadow-lg mb-5 mb-lg-0"
						src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop"
						alt="Misi Island"
					/>
				</div>
				<div class="col-lg-6 order-lg-1">
					<h3 class="fw-semibold lh-1 mb-3">
						Misi Kami: Rekomendasi Jelas & Terpercaya
					</h3>
					<p class="lead fw-normal text-muted">
						Misi kami adalah menyajikan data yang kompleks menjadi sebuah
						rekomendasi yang sederhana, jelas, dan dapat dipercaya, sehingga
						Anda bisa fokus pada hal yang paling penting—memulai babak baru
						kehidupan Anda di tempat yang tepat.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.hero-section {
	position: relative;
	padding: 8rem 2rem;
	border-radius: 1rem;
	background-image: url("https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=900&fit=crop");
	background-size: cover;
	background-position: center;
	color: white;
	text-align: center;
	overflow: hidden;
	margin-bottom: 4rem;
}

.hero-section::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
	z-index: 1;
}

.hero-content {
	position: relative;
	z-index: 2;
}

.hero-content .display-4 {
	font-weight: 700;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.section-title {
	text-align: center;
	margin-bottom: 3rem;
	font-weight: 700;
}

.kriteria-card-baru {
	background-color: #fff;
	border-radius: 1rem;
	padding: 1.5rem 1rem;
	text-align: center;
	transition: all 0.3s ease-in-out;
	border: 1px solid #e9ecef;
	height: 100%;
}

.kriteria-card-baru:hover {
	transform: translateY(-5px);
	box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
	border-color: transparent;
}

.kriteria-icon-wrapper {
	width: 80px;
	height: 80px;
	margin: 0 auto 1.5rem auto;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #e7f3ff;
}

.kriteria-icon-wrapper i {
	font-size: 2.5rem;
	color: #0d6efd;
}

.kriteria-card-baru h5 {
	font-weight: 600;
	color: #343a40;
}

.city-card img {
	height: 250px;
	object-fit: cover;
}
</style>
