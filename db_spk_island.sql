-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table db_spk_island.cities
CREATE TABLE IF NOT EXISTS `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `num_coworking` int DEFAULT '0',
  `last_updated` date DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `Desc` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_spk_island.cities: ~4 rows (approximately)
INSERT INTO `cities` (`id`, `name`, `num_coworking`, `last_updated`, `image_url`, `Desc`) VALUES
	(3, 'Depok', 1, '2025-11-01', '', NULL),
	(4, 'Tanggerang', 13000000, '2025-11-05', '', NULL),
	(5, 'Bali', 15, '2025-12-11', '', NULL),
	(6, 'Bandung', 17, '2025-12-05', 'https://i.pinimg.com/736x/6e/95/c6/6e95c67ec97f87f85f7eafb3a6efbefa.jpg', NULL),
	(7, 'Kota Test Postman', 50, '2023-12-12', 'https://google.com/gambar.jpg', NULL);

-- Dumping structure for table db_spk_island.criteria
CREATE TABLE IF NOT EXISTS `criteria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  `weight` float NOT NULL,
  `type` enum('benefit','cost') NOT NULL,
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_spk_island.criteria: ~5 rows (approximately)
INSERT INTO `criteria` (`id`, `name`, `code`, `weight`, `type`, `created_at`) VALUES
	(3, 'Biaya Hidup', 'C1', 0.2, 'cost', NULL),
	(4, 'Kecepatan Internet', 'C2', 0.25, 'benefit', NULL),
	(5, 'Keamanan', 'C3', 0.25, 'cost', NULL),
	(6, 'Mobilitas/Fasilitas', 'C4', 0.15, 'benefit', NULL),
	(7, 'Suasana Sosial', 'C5', 0.15, 'benefit', NULL);

-- Dumping structure for table db_spk_island.scores
CREATE TABLE IF NOT EXISTS `scores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city_id` int DEFAULT NULL,
  `criteria_id` int DEFAULT NULL,
  `value` float DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  KEY `criteria_id` (`criteria_id`),
  CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE,
  CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_spk_island.scores: ~20 rows (approximately)
INSERT INTO `scores` (`id`, `city_id`, `criteria_id`, `value`, `created_at`, `updated_at`) VALUES
	(1, 3, 3, 1000000, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(2, 3, 4, 12, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(3, 3, 5, 31, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(4, 3, 6, 13, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(5, 3, 7, 13, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(6, 4, 3, 12000000, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(7, 4, 4, 150, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(8, 4, 5, 2, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(9, 4, 6, 31, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(10, 4, 7, 132, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(11, 5, 3, 1300000, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(12, 5, 4, 12, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(13, 5, 5, 20, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(14, 5, 6, 2, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(15, 5, 7, 3, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(16, 6, 3, 1200000, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(17, 6, 4, 100, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(18, 6, 5, 100, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(19, 6, 6, 2, '2025-12-28 20:16:43', '2025-12-28 20:17:58'),
	(20, 6, 7, 2, '2025-12-28 20:16:43', '2025-12-28 20:17:58');

-- Dumping structure for table db_spk_island.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_spk_island.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
	(1, 'admin', 'admin@example.com', '$2b$10$nXZTVxA..JC95XOre7GdGeWTw.SeOiYXUasm.qLyusq44QkFDIFya', 'admin'),
	(2, 'admin_lain', 'adminlain@exemple', '$2b$10$sX2yycDb.YW.yeEYRJjAOeHYGUbUyAgcMYfDdy4vmpYGnogws1EVW', 'admin');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
