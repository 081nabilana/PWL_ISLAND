// Session Manager untuk handle auto logout
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 menit dalam milidetik
const LAST_ACTIVITY_KEY = "lastActivity";

export const sessionManager = {
	// Update waktu aktivitas terakhir
	updateActivity() {
		localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
	},

	// Cek apakah session sudah expired
	isSessionExpired() {
		const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
		if (!lastActivity) return true;

		const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
		return timeSinceLastActivity > SESSION_TIMEOUT;
	},

	// Hapus session
	clearSession() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("username");
		localStorage.removeItem(LAST_ACTIVITY_KEY);
	},

	// Initialize session
	initSession() {
		this.updateActivity();
	},

	// Setup activity listeners (hanya untuk halaman admin)
	setupActivityListeners(router) {
		const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];

		events.forEach((event) => {
			document.addEventListener(
				event,
				() => {
					// Hanya update jika user di halaman admin
					const token = localStorage.getItem("token");
					const currentPath = router.currentRoute.value.path;
					if (token && currentPath.startsWith("/admin")) {
						this.updateActivity();
					}
				},
				true
			);
		});
	},

	// Check session periodically (hanya di halaman admin)
	startSessionCheck(router) {
		setInterval(() => {
			const token = localStorage.getItem("token");
			const currentPath = router.currentRoute.value.path;

			// Hanya cek jika user di halaman admin
			if (
				token &&
				currentPath.startsWith("/admin") &&
				this.isSessionExpired()
			) {
				this.clearSession();
				alert("Sesi Anda telah berakhir. Silakan login kembali.");
				router.push("/login");
			}
		}, 60000); // Cek setiap 1 menit
	},
};
