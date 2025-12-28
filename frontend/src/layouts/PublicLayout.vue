<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
			<div class="container-fluid px-5">
				<router-link class="navbar-brand fw-bold" to="/">
					<i class="bi bi-brightness-high-fill"></i> Island
				</router-link>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav ms-auto align-items-center">
						<li class="nav-item mx-lg-2">
							<router-link to="/" class="nav-link" exact-active-class="active"
								>Home</router-link
							>
						</li>
						<li class="nav-item mx-lg-2">
							<router-link to="/tools" class="nav-link" active-class="active"
								>Tools</router-link
							>
						</li>
						<li class="nav-item mx-lg-2">
							<router-link to="/tutorial" class="nav-link" active-class="active"
								>Tutorial</router-link
							>
						</li>
						<li class="nav-item ms-lg-3 mt-2 mt-lg-0">
							<router-link to="/login" class="btn btn-primary">
								<i class="bi bi-person-circle me-1"></i> Admin Login
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<main class="container my-5">
			<router-view />
		</main>

		<footer class="bg-dark text-white text-center py-3 mt-5">
			<p class="mb-0">&copy; 2025 Island SPK. All Rights Reserved.</p>
		</footer>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
body {
	background-color: #f8f9fa;
}

.navbar {
	padding-top: 1rem;
	padding-bottom: 1rem;
}

.navbar .btn {
	padding: 0.375rem 1rem;
}

.navbar-nav .nav-link {
	position: relative;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	transition: color 0.2s ease-in-out;
}

.navbar-nav .nav-link::after {
	content: "";
	position: absolute;
	bottom: 5px;
	left: 50%;
	transform: translateX(-50%);
	width: 0;
	height: 2px;
	background-color: var(--bs-primary);
	transition: width 0.3s ease-in-out;
}

.navbar-nav .nav-link:hover::after {
	width: calc(100% - 1rem);
}

.navbar-nav .nav-link:hover {
	color: var(--bs-dark);
}

.navbar-nav .nav-link.active {
	font-weight: 600;
}
</style>
