-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 16, 2026 at 10:55 AM
-- Server version: 11.4.12-MariaDB-cll-lve-log
-- PHP Version: 8.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoplgkr_sevault`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `email`, `password_hash`, `created_at`) VALUES
(1, 'admin@sevault.com', '$2y$10$bWOJ3ub.SoKlUiuXZdzOFeHgFVGneJ2iiaHGByzUsanYns9Lpw.BW', '2026-04-15 16:56:38'),
(2, 'answer@sevault.com', '$2y$10$0Y7z2x3kO4VxK4lQ7V4gY.BQxj5z5L6x1mK5b7sLQ1sXJ8mF6dF9K', '2026-07-12 13:20:24');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `caption`, `image_url`, `created_at`) VALUES
(4, '', 'uploads/gallery/1785241282_logo.png', '2026-07-28 12:21:22');

-- --------------------------------------------------------

--
-- Table structure for table `hero_slides`
--

CREATE TABLE `hero_slides` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `subtext` text DEFAULT NULL,
  `cta_text` varchar(255) DEFAULT NULL,
  `cta_link` varchar(255) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `name`, `phone`, `status`, `created_at`) VALUES
(1, 'Ssekaayi Elvis', '076114775948', 'approved', '2026-05-01 21:55:14'),
(2, 'SSEKAYI ELVIS', '0761140132', 'approved', '2026-07-26 14:25:58'),
(3, 'SSEKAAYI ELVIS', '0761140132', 'pending', '2026-08-16 13:54:27');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `subtitle` varchar(255) DEFAULT '',
  `features` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT 'Package',
  `highlighted` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `title`, `description`, `price`, `image_url`, `created_at`, `subtitle`, `features`, `icon`, `highlighted`, `sort_order`) VALUES
(13, 'PRODUCT DEVELOPMENT', 'Elevate your products for local and global markets (artisan package version)', 'UGX 150,000 per product', '', '2026-08-16 13:10:35', 'Branding and packaging', '[\"Branding\",\"Product story development\",\"Packaging design\",\"Labelling standards and techniques\",\"Sustainable packaging materials sourcing guide\",\"Product photography\",\"Product flyer design\"]', 'Package', 0, 0),
(14, 'FORMALIZE AND THRIVE', 'Formalization ensures that a business operates with full legal recognition, enabling access to funding, contracts, and growth opportunities. It also provides credibility with partners, investors, and customers.', 'UGX 350,000', '', '2026-08-16 13:14:26', '', '[\"Business registration support (URSB)\",\"Tax compliance setup\",\"Licensing and permits\",\"Digital record keeping toolkit\",\"Compliance checklist\"]', 'Package', 0, 3),
(15, 'STARTER PLAN', 'suitable for early-stage entrepreneurs and youth startups', 'UGX 350,000-500,000', '', '2026-08-16 13:17:19', 'Localized to Ugandan market realities', '[\"\\u2022\\tExecutive summary and business profile\",\"\\u2022\\tMarket overview (tailored to business and its context operations) can be a region, municipality, town, district or counties\",\"\\u2022\\tFinancial projections (cash flow, breakeven) for 1 year (monthly basis)\",\"\\u2022\\tRegistration checklist and compliance guidance\",\"\\u2022\\t1 hour advisory and training\"]', 'Package', 1, 1),
(16, 'INVESTOR READY PLAN', ' Prepared with the highest level of professional diligence, accuracy, and strategic foresight', 'UGX 800,000-1,000,000', '', '2026-08-16 13:20:29', 'Firms seeking equity investment', '[\"\\u2022\\tComprehensive business plan (20-30 pages)\",\"\\u2022\\tSector specific research (Industry based)\",\"\\u2022\\tFive-year financial projections with ROI analysis\",\"\\u2022\\tCustomized pitch deck\",\"\\u2022\\tCompliance guidance\"]', 'Package', 0, 4),
(17, 'SHOPEXUG.COM', 'A simple entry package that helps artisans list products on ShopexUg.com with professional photos and a polished profile to attract first buyers', 'UGX 150,000 (2 months)', '', '2026-08-16 13:22:42', 'Starter visibility package ', '[\"Artisan profile creation on ShopexUg.com\",\"Online store on shopexug.com platform\",\"Professional logo and brand identity design\",\"Featured placement on ShopexUg.com homepage\",\"Basic training on digital selling\"]', 'Package', 0, 0),
(18, 'GROWTH PLAN', 'Designed and suitable for SME\'s seeking financing and scaling operations', 'UGX 550,000-800,000', '', '2026-08-16 13:26:11', 'Localized to Ugandan market realities', '[\"Full business plan (10-15 pages)\",\"Detailed market analysis. (Urban-rural demand trends, analysis and market overview)\",\"3-year financial projections. Monthly basis (delivered in excel)\",\"Loan proposal format for banks\\/ SACCO\\u2019S and microfinance\",\"Compliance guidance\",\"Pitch deck 5-10 slides\"]', 'Package', 0, 0),
(19, 'STRATEGIC INNOVATION BUNDLE', '', 'UGX 500,000-750,000', '', '2026-08-16 13:42:14', 'Igniting ideas', '[\"Assessing current business processes\",\"Identify gaps\",\"Highlighting opportunities for innovation\",\"Product\\/service development support\",\"Process improvement blueprints\",\"Innovation road map. A plan for implementing new ideas 6-12 months\"]', 'Package', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('announcementEnabled', 'true'),
('announcementText', 'SE Vault partners with Shopexug.com'),
('email', 'Sevault@gmail.com'),
('heroSlide1CtaLink', ''),
('heroSlide1CtaText', ''),
('heroSlide1Heading', ''),
('heroSlide1Subtext', ''),
('heroSlide2CtaLink', ''),
('heroSlide2CtaText', ''),
('heroSlide2Heading', ''),
('heroSlide2Subtext', ''),
('heroSlide3CtaLink', ''),
('heroSlide3CtaText', ''),
('heroSlide3Heading', ''),
('heroSlide3Subtext', ''),
('phone', '0761 140132'),
('vaultCat1Desc', ''),
('vaultCat1Title', ''),
('vaultCat2Desc', ''),
('vaultCat2Title', ''),
('vaultCat3Desc', ''),
('vaultCat3Title', ''),
('vaultHeading', ''),
('vaultSubtitle', '');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `author` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `updates_posts`
--

CREATE TABLE `updates_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `value_vault`
--

CREATE TABLE `value_vault` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `pdf_url` varchar(500) DEFAULT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'Business Templates',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `value_vault`
--

INSERT INTO `value_vault` (`id`, `title`, `description`, `content`, `image_url`, `pdf_url`, `category`, `created_at`) VALUES
(2, '', '', '', '', '', 'Business Templates', '2026-08-16 13:46:53'),
(3, '', '', '', '', '', 'Business Templates', '2026-08-16 13:47:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hero_slides`
--
ALTER TABLE `hero_slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`setting_key`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `updates_posts`
--
ALTER TABLE `updates_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `value_vault`
--
ALTER TABLE `value_vault`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hero_slides`
--
ALTER TABLE `hero_slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `updates_posts`
--
ALTER TABLE `updates_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `value_vault`
--
ALTER TABLE `value_vault`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
