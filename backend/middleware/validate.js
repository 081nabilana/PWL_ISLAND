// File: backend/middleware/validate.js
exports.validateCity = (req, res, next) => {
	const { name, num_coworking, last_updated } = req.body;

	// Cek apakah ada data yang kosong
	if (!name || !num_coworking || !last_updated) {
		return res.status(400).json({
			status: "error",
			msg: "Data tidak lengkap! Nama, Jumlah Coworking Space, dan Tanggal Update wajib diisi.",
		});
	}

	// Validasi tambahan: Jumlah Coworking Space harus angka
	if (isNaN(num_coworking)) {
		return res
			.status(400)
			.json({
				status: "error",
				msg: "Jumlah Coworking Space harus berupa angka!",
			});
	}

	next(); // Lanjut ke Controller
};
