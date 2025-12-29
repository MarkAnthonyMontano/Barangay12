-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2025 at 06:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barangay_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit`
--

CREATE TABLE `audit` (
  `id` int(11) NOT NULL,
  `actor_id` int(11) DEFAULT NULL,
  `actor_name` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit`
--

INSERT INTO `audit` (`id`, `actor_id`, `actor_name`, `message`, `role`, `created_at`) VALUES
(2, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Updated resident information in Incident Page', 'SuperAdmin', '2026-01-28 07:15:41'),
(4, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Deleted resident information in Incident Page', 'SuperAdmin', '2025-12-27 07:23:37'),
(5, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Updated resident record in Residents Page', 'SuperAdmin', '2025-12-27 09:20:09'),
(6, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Added a new resident record in Resident Page', 'SuperAdmin', '2025-12-27 09:22:19'),
(7, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Print the barangay id of a resident in Residents Page', 'SuperAdmin', '2025-12-27 09:25:08'),
(8, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Added a new member in the household hELLO in Household Pages', 'SuperAdmin', '2025-12-27 09:33:11'),
(9, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Added new household record in Household Page', 'SuperAdmin', '2025-12-27 09:34:14'),
(10, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Deleted resident information in Incident Page', 'SuperAdmin', '2025-12-27 09:37:52'),
(11, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Updated resident information in Incident Page', 'SuperAdmin', '2025-12-27 09:39:16'),
(12, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Export the data into excel file in Services Page', 'SuperAdmin', '2025-12-27 09:44:39'),
(13, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Added a new beneficiary Mecasio, Arden Bandoja Jr in service AKAP Certification in Services Page', 'SuperAdmin', '2025-12-27 09:53:11'),
(14, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Deleted beneficary asdasd, asda asdas as in service AKAP Certification', 'SuperAdmin', '2025-12-27 09:56:47'),
(15, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Deleted beneficary Mecasio, Arden Bandoja Jr in service AKAP Certification in Service Page', 'SuperAdmin', '2025-12-27 09:57:21'),
(16, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Deleted a service asd in Services Page', 'SuperAdmin', '2025-12-27 09:58:51'),
(17, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Updated a service record in Services Page', 'SuperAdmin', '2025-12-27 09:59:54'),
(18, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Added a new service record in Services Page', 'SuperAdmin', '2025-12-27 10:00:54'),
(19, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Deleted a service asdasd in Services Page', 'SuperAdmin', '2025-12-27 10:01:51'),
(20, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Added a new beneficiary Montano, Mark Anthony Placido in service AKAP Certifications in Services Page', 'SuperAdmin', '2025-12-27 10:02:01'),
(21, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Exported a certificates in pdf file of in Certificate Page', 'SuperAdmin', '2025-12-27 10:10:09'),
(22, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Exported a certificates in pdf file of in Certificate Page', 'SuperAdmin', '2025-12-27 10:11:22'),
(23, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Added a new record sdad in Official Page', 'SuperAdmin', '2025-12-27 10:20:59'),
(24, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Grant User sdad an access to dashboard,residents,households,incidents,services,certificates,requestpanel,adminsecuritysettings,residentidcard in Official Page', 'SuperAdmin', '2025-12-27 10:21:42'),
(25, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Updated the record of sdadqwqw in Official Page', 'SuperAdmin', '2025-12-27 10:22:24'),
(26, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Deleted the record of  in Official Page', 'SuperAdmin', '2025-12-27 10:22:43'),
(27, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Added a new record asdad in Official Page', 'SuperAdmin', '2025-12-27 10:24:06'),
(28, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Deleted the record of asdad in Official Page', 'SuperAdmin', '2025-12-27 10:24:18'),
(29, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Deleted an event 7 in Event Page', 'SuperAdmin', '2025-12-27 10:28:53'),
(30, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Added a new event Birthday in Event Page', 'SuperAdmin', '2025-12-27 10:30:26'),
(31, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Updated an event Birthday21 in Event Page', 'SuperAdmin', '2025-12-27 10:31:04'),
(32, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) Change the settings', 'SuperAdmin', '2025-12-27 10:34:58'),
(33, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) removed asda asdasd from household hELLO', 'SuperAdmin', '2025-12-28 04:00:25'),
(34, 15, 'dhani (mecasio.a.bsinfotech@gmail.com)', 'User dhani (mecasio.a.bsinfotech@gmail.com) removed asd Dr from household hELLO', 'SuperAdmin', '2025-12-28 04:00:28'),
(35, 3, 'Richard U. Benitez (markmontano999@gmail.com)', 'User Richard U. Benitez (markmontano999@gmail.com) Grant User Fregilda P. Matabang an access to dashboard,residents,households,incidents,services,certificates,officials,calendarpage,settings,requestpanel,audits,adminsecuritysettings,residentidcard in Offi', 'User', '2025-12-28 07:49:14'),
(36, 3, 'Richard U. Benitez (markmontano999@gmail.com)', 'User Richard U. Benitez (markmontano999@gmail.com) Grant User Fregilda P. Matabang an access to dashboard,residents,households,incidents,services,certificates,officials,calendarpage,settings,requestpanel,audits,adminsecuritysettings,residentidcard in Offi', 'User', '2025-12-28 07:56:21'),
(37, 3, 'Richard U. Benitez (markmontano999@gmail.com)', 'User Richard U. Benitez (markmontano999@gmail.com) Grant User Fregilda P. Matabang an access to dashboard,residents,households,incidents,services,certificates,officials,calendarpage,settings,requestpanel,audits,adminsecuritysettings,residentidcard in Offi', 'User', '2025-12-28 07:59:10'),
(38, 3, 'Richard U. Benitez (markmontano999@gmail.com)', 'User Richard U. Benitez (markmontano999@gmail.com) Grant User Fregilda P. Matabang an access to dashboard,residents,households,incidents,services,certificates,officials,calendarpage,settings,requestpanel,auditpage,adminsecuritysettings,residentidcard in O', 'User', '2025-12-28 08:02:12'),
(39, 2, 'Fregilda P. Matabang (markmontano522@gmail.com)', 'User Fregilda P. Matabang (markmontano522@gmail.com) Updated access of Fregilda P. Matabang in Officials Page', 'SuperAdmin', '2025-12-29 03:34:03'),
(40, 2, 'Fregilda P. Matabang (markmontano522@gmail.com)', 'User Fregilda P. Matabang (markmontano522@gmail.com) Updated access of Fregilda P. Matabang in Officials Page', 'SuperAdmin', '2025-12-29 03:34:16'),
(41, 2, 'Fregilda P. Matabang (markmontano522@gmail.com)', 'User Fregilda P. Matabang (markmontano522@gmail.com) Updated access of Fregilda P. Matabang in Officials Page', 'SuperAdmin', '2025-12-29 03:34:17'),
(42, 2, 'Fregilda P. Matabang (markmontano522@gmail.com)', 'User Fregilda P. Matabang (markmontano522@gmail.com) Grant User Romulo O. Enrica an access to dashboard,residents,households,incidents,services,certificates,adminsecuritysettings,residentidcard in Official Page', 'SuperAdmin', '2025-12-29 03:51:14'),
(43, 2, 'Fregilda P. Matabang (markmontano522@gmail.com)', 'User Fregilda P. Matabang (markmontano522@gmail.com) Grant User Engr. Manolito R. Callanta an access to dashboard,residents,households,incidents,services,certificates,officials,requestpanel,adminsecuritysettings,residentidcard in Official Page', 'SuperAdmin', '2025-12-29 03:59:06'),
(44, 4, 'Romulo O. Enrica (romulaenrica@gmail.com)', 'User Romulo O. Enrica (romulaenrica@gmail.com) Print the barangay id of a resident in Residents Page', 'User', '2025-12-29 04:03:18'),
(45, 4, 'Romulo O. Enrica (romulaenrica@gmail.com)', 'User Romulo O. Enrica (romulaenrica@gmail.com) Exported a pdf file of a certificate/document in Certificate Page', 'User', '2025-12-29 04:12:57');

-- --------------------------------------------------------

--
-- Table structure for table `barangay_profile`
--

CREATE TABLE `barangay_profile` (
  `id` int(11) NOT NULL,
  `barangay_name` varchar(150) NOT NULL,
  `municipality` varchar(150) NOT NULL,
  `province` varchar(150) NOT NULL,
  `place_issued` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `certificate_templates`
--

CREATE TABLE `certificate_templates` (
  `template_id` int(11) NOT NULL,
  `template_code` varchar(50) NOT NULL,
  `template_name` varchar(100) NOT NULL,
  `body_html` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `certificate_templates`
--

INSERT INTO `certificate_templates` (`template_id`, `template_code`, `template_name`, `body_html`, `created_at`, `updated_at`) VALUES
(3, 'INDIGENCY', 'Certificate of Indigency', '<p>To Whom It May Concern:</p><p class=\"ql-align-justify\">This is to certify that <strong><u>{{FULL_NAME}}</u></strong>, of legal age, is a bona fide resident of this Barangay with an actual residential address located at <strong><u>{{ADDRESS}}</u></strong>, is known to be an indigent member of this Barangay.</p><p class=\"ql-align-justify\">The aforementioned person requested this certificate in order to fulfill his/her need for <strong><u>{{PURPOSE}}</u></strong>.</p><p class=\"ql-align-justify\">Issued this <strong><u>{{ISSUE_DATE}}</u></strong> at Barangay {{BARANGAY}}, {{MUNICIPALITY}}, {{PROVINCE}}.</p>', '2025-12-25 18:56:09', '2025-12-29 03:24:04');

-- --------------------------------------------------------

--
-- Table structure for table `company_settings`
--

CREATE TABLE `company_settings` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `header_color` varchar(20) NOT NULL,
  `footer_text` text NOT NULL,
  `footer_color` varchar(20) NOT NULL,
  `logo_url` varchar(255) NOT NULL,
  `bg_image` varchar(255) NOT NULL,
  `main_button_color` varchar(20) NOT NULL,
  `sidebar_button_color` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_settings`
--

INSERT INTO `company_settings` (`id`, `company_name`, `address`, `ip_address`, `header_color`, `footer_text`, `footer_color`, `logo_url`, `bg_image`, `main_button_color`, `sidebar_button_color`) VALUES
(1, 'BARANGAY 369', 'BARANGAY 369, ZONE 37, DISTRICT III,  MANILA', '192.168.1.5', '#000000', 'Barangay Information System — All Rights Reserved', '#000000', '/uploads/company_asset/1766978600251-Barangay369.jpg', '/uploads/company_asset/1765726775433-kulet1.jpg', '#000000', '#2e75d1');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `start_time` varchar(10) DEFAULT NULL,
  `end_time` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `start_date`, `end_date`, `created_at`, `start_time`, `end_time`) VALUES
(7, 'Lakbay Aral', '3days ', '2025-12-15', '2025-12-15', '2025-12-14 11:35:50', '10:00', '12:00');

-- --------------------------------------------------------

--
-- Table structure for table `event_images`
--

CREATE TABLE `event_images` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_images`
--

INSERT INTO `event_images` (`id`, `event_id`, `image_path`, `uploaded_at`) VALUES
(7, 7, '/uploads/events/1765712150856-ARDEN 1x1.jpg', '2025-12-14 11:35:50'),
(8, 7, '/uploads/events/1765712150857-BIRTHCERT.jpg', '2025-12-14 11:35:50'),
(9, 7, '/uploads/events/1765712150862-CERT GOOD MORAL.png', '2025-12-14 11:35:50'),
(10, 7, '/uploads/events/1765712150879-CIRUELA 1x1.jpg', '2025-12-14 11:35:50'),
(11, 7, '/uploads/events/1765712150880-DE LA CRUZ 1x1.jpg', '2025-12-14 11:35:50'),
(12, 7, '/uploads/events/1765712150882-Form138.webp', '2025-12-14 11:35:50'),
(13, 7, '/uploads/events/1765712150886-GRADUATING CERT.jpg', '2025-12-14 11:35:50'),
(14, 7, '/uploads/events/1765712150888-VACCINE CARD.jpg', '2025-12-14 11:35:50');

-- --------------------------------------------------------

--
-- Table structure for table `households`
--

CREATE TABLE `households` (
  `id` int(11) NOT NULL,
  `household_name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `purok` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `households`
--

INSERT INTO `households` (`id`, `household_name`, `address`, `purok`, `created_at`) VALUES
(1, 'San Jose Resident', 'Blk 44', 'Sta Cruz', '2025-11-13 03:29:25'),
(2, 'hELLO', 'ASD', 'ASD', '2025-12-13 09:49:18'),
(3, 'hELLO121231', 'Lot1 Blk7 Salmon Alley, Mannunggal St. Brgy. Tatalon', 'ASD', '2025-12-21 08:21:32'),
(4, 'hELLO12231', '1828 CAVITE STREET STA CRUZ MANILA, PHILIPPINES', 'ASD', '2025-12-21 10:41:18');

-- --------------------------------------------------------

--
-- Table structure for table `household_members`
--

CREATE TABLE `household_members` (
  `id` int(11) NOT NULL,
  `household_id` int(11) NOT NULL,
  `resident_id` int(11) NOT NULL,
  `relation_to_head` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `household_members`
--

INSERT INTO `household_members` (`id`, `household_id`, `resident_id`, `relation_to_head`, `created_at`) VALUES
(1, 1, 2, NULL, '2025-11-13 03:29:39'),
(2, 1, 1, 'Head of the Family', '2025-11-13 03:30:05'),
(3, 1, 2, NULL, '2025-12-10 09:03:35'),
(4, 1, 7, NULL, '2025-12-21 08:21:22'),
(5, 3, 3, 'hEAD', '2025-12-21 08:21:54'),
(6, 4, 3, 'asda', '2025-12-21 10:41:42'),
(7, 1, 8, '', '2025-12-28 01:06:18'),
(8, 3, 8, '', '2025-12-28 01:08:01'),
(9, 3, 3, '', '2025-12-28 01:08:03'),
(10, 3, 2, '', '2025-12-28 01:08:06');

-- --------------------------------------------------------

--
-- Table structure for table `incidents`
--

CREATE TABLE `incidents` (
  `id` int(11) NOT NULL,
  `incident_date` datetime NOT NULL,
  `incident_type` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `complainant_id` int(11) DEFAULT NULL,
  `respondent_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Open',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incidents`
--

INSERT INTO `incidents` (`id`, `incident_date`, `incident_type`, `location`, `description`, `complainant_id`, `respondent_id`, `status`, `created_at`) VALUES
(1, '2025-11-13 02:30:00', 'Complaint', 'Malabon', 'Suntukan', 2, 1, 'Under Investigation', '2025-11-13 03:31:33'),
(2, '2005-02-10 02:00:00', 'Domestic Violence', 'Bato12', 'Nothing', 7, 1, 'Open', '2025-12-21 08:22:43'),
(3, '2025-12-21 20:15:00', 'Complaint', 'Barangay 369', 'asdasd', 3, 8, 'Open', '2025-12-21 12:16:14');

-- --------------------------------------------------------

--
-- Table structure for table `officials`
--

CREATE TABLE `officials` (
  `id` int(11) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `full_name` varchar(150) NOT NULL,
  `position` varchar(100) NOT NULL,
  `order_no` int(11) DEFAULT 0,
  `is_captain` tinyint(1) DEFAULT 0,
  `is_secretary` tinyint(1) DEFAULT 0,
  `signature_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `officials`
--

INSERT INTO `officials` (`id`, `profile_img`, `full_name`, `position`, `order_no`, `is_captain`, `is_secretary`, `signature_path`) VALUES
(1, '/uploads/profile_pictures/1766424719366-barangaychairman.png', 'Engr. Manolito R. Callanta', 'Punong Barangay', 1, 0, 1, '/uploads/signatures/1765435266321-sign.png'),
(2, '/uploads/profile_pictures/1765343113752-matabang.png', 'Fregilda P. Matabang', 'Barangay Secretary', 10, 0, 1, '/uploads/signatures/1765435258769-sign1.png'),
(3, '/uploads/profile_pictures/1765342951031-Rrichard.jpg', 'Richard U. Benitez', 'Barangay Kagawad', 2, 0, 0, NULL),
(4, '/uploads/profile_pictures/1765342968700-Romolou.jpg', 'Romulo O. Enrica', 'Barangay Kagawad', 3, 0, 0, NULL),
(5, '/uploads/profile_pictures/1765342989468-kim.jpg', 'Kim Louise M. Descuatan', 'Barangay Kagawad', 4, 0, 0, NULL),
(6, '/uploads/profile_pictures/1765343022794-runas.jpg', 'Mercileta A. Runas', 'Barangay Kagawad', 5, 0, 0, NULL),
(7, '/uploads/profile_pictures/1765342895273-RamonM.png', 'Ramon M. Marcellana', 'Barangay Kagawad', 6, 0, 0, NULL),
(8, '/uploads/profile_pictures/1765343003076-AngelitoV.png', 'Angelito P. Velasco', 'Barangay Kagawad', 8, 0, 0, NULL),
(9, '/uploads/profile_pictures/1765343352523-JoelM.png', 'Joel M. Figueroa', 'Barangay Kagawad', 7, 0, 0, NULL),
(10, NULL, 'Norbie F. Salud', 'Sangguniang Kabataan Chairperson', 12, 0, 0, NULL),
(11, '/uploads/profile_pictures/1765342917549-Marilou.png', 'Marilou M. Congco', 'Barangay Treasurer', 11, 0, 0, NULL),
(12, '/uploads/profile_pictures/1765435605912-JessicaM.jpg', 'Jessica C. Morit', 'Barangay Kagawad', 9, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `page_access`
--

CREATE TABLE `page_access` (
  `id` int(11) NOT NULL,
  `page_key` varchar(100) NOT NULL,
  `page_label` varchar(255) NOT NULL,
  `official_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `page_access`
--

INSERT INTO `page_access` (`id`, `page_key`, `page_label`, `official_id`) VALUES
(7, 'residentidcard', 'Resident ID Card', 15),
(8, 'dashboard', 'dashboard', 15),
(9, 'residents', 'Residents', 15),
(10, 'households', 'Households', 15),
(11, 'incidents', 'Incidents', 15),
(12, 'services', 'Services', 15),
(13, 'certificates', 'Certificates', 15),
(14, 'officials', 'Officials', 15),
(15, 'calendarpage', 'Calendar', 15),
(16, 'settings', 'Settings', 15),
(17, 'adminsecuritysettings', 'adminsecuritysettings', 15),
(27, 'dashboard', 'Dashboard', 12),
(28, 'residents', 'Residents', 12),
(29, 'households', 'Households', 12),
(30, 'incidents', 'Incidents', 12),
(31, 'services', 'Services', 12),
(32, 'certificates', 'Certificates', 12),
(33, 'adminsecuritysettings', 'Settings', 12),
(34, 'residentidcard', 'Resident ID Card', 12),
(35, 'dashboard', 'Dashboard', 8),
(36, 'residents', 'Residents', 8),
(37, 'households', 'Households', 8),
(38, 'incidents', 'Incidents', 8),
(39, 'services', 'Services', 8),
(40, 'certificates', 'Certificates', 8),
(41, 'officials', 'Officials', 8),
(42, 'adminsecuritysettings', 'Settings', 8),
(43, 'residentidcard', 'Resident ID Card', 8),
(44, 'dashboard', 'Dashboard', 3),
(45, 'residents', 'Residents', 3),
(46, 'households', 'Households', 3),
(47, 'incidents', 'Incidents', 3),
(48, 'services', 'Services', 3),
(49, 'certificates', 'Certificates', 3),
(50, 'officials', 'Officials', 3),
(51, 'adminsecuritysettings', 'Settings', 3),
(52, 'residentidcard', 'Resident ID Card', 3),
(236, 'dashboard', 'Dashboard', 2),
(237, 'residents', 'Residents', 2),
(238, 'households', 'Households', 2),
(239, 'incidents', 'Incidents', 2),
(240, 'services', 'Services', 2),
(241, 'certificates', 'Certificates', 2),
(242, 'officials', 'Officials', 2),
(243, 'calendarpage', 'Calendar', 2),
(244, 'settings', 'Barangay Profile', 2),
(245, 'requestpanel', 'requestpanel', 2),
(246, 'adminsecuritysettings', 'Settings', 2),
(247, 'dashboard', 'Dashboard', 2),
(248, 'residents', 'Residents', 2),
(249, 'households', 'Households', 2),
(250, 'incidents', 'Incidents', 2),
(251, 'services', 'Services', 2),
(252, 'certificates', 'Certificates', 2),
(253, 'officials', 'Officials', 2),
(254, 'calendarpage', 'Calendar', 2),
(255, 'settings', 'Barangay Profile', 2),
(256, 'requestpanel', 'requestpanel', 2),
(257, 'audits', 'audits', 2),
(258, 'adminsecuritysettings', 'Settings', 2),
(259, 'dashboard', 'Dashboard', 2),
(260, 'residents', 'Residents', 2),
(261, 'households', 'Households', 2),
(262, 'incidents', 'Incidents', 2),
(263, 'services', 'Services', 2),
(264, 'certificates', 'Certificates', 2),
(265, 'officials', 'Officials', 2),
(266, 'calendarpage', 'Calendar', 2),
(267, 'settings', 'Barangay Profile', 2),
(268, 'requestpanel', 'requestpanel', 2),
(269, 'audits', 'audits', 2),
(270, 'adminsecuritysettings', 'Settings', 2),
(271, 'dashboard', 'Dashboard', 2),
(272, 'residents', 'Residents', 2),
(273, 'households', 'Households', 2),
(274, 'incidents', 'Incidents', 2),
(275, 'services', 'Services', 2),
(276, 'certificates', 'Certificates', 2),
(277, 'officials', 'Officials', 2),
(278, 'calendarpage', 'Calendar', 2),
(279, 'settings', 'Barangay Profile', 2),
(280, 'requestpanel', 'requestpanel', 2),
(281, 'audits', 'audits', 2),
(282, 'adminsecuritysettings', 'Settings', 2),
(283, 'dashboard', 'Dashboard', 2),
(284, 'residents', 'Residents', 2),
(285, 'households', 'Households', 2),
(286, 'incidents', 'Incidents', 2),
(287, 'services', 'Services', 2),
(288, 'certificates', 'Certificates', 2),
(289, 'officials', 'Officials', 2),
(290, 'calendarpage', 'Calendar', 2),
(291, 'settings', 'Barangay Profile', 2),
(292, 'requestpanel', 'requestpanel', 2),
(293, 'adminsecuritysettings', 'Settings', 2),
(294, 'residentidcard', 'Resident ID Card', 2),
(295, 'auditpage', 'History Logs', 2),
(296, 'dashboard', 'Dashboard', 4),
(297, 'residents', 'Residents', 4),
(298, 'households', 'Households', 4),
(299, 'incidents', 'Incidents', 4),
(300, 'services', 'Services', 4),
(301, 'certificates', 'Certificates', 4),
(302, 'adminsecuritysettings', 'Settings', 4),
(303, 'residentidcard', 'Resident ID Card', 4),
(304, 'dashboard', 'Dashboard', 1),
(305, 'residents', 'Residents', 1),
(306, 'households', 'Households', 1),
(307, 'incidents', 'Incidents', 1),
(308, 'services', 'Services', 1),
(309, 'certificates', 'Certificates', 1),
(310, 'officials', 'Officials', 1),
(311, 'requestpanel', 'requestpanel', 1),
(312, 'adminsecuritysettings', 'Settings', 1),
(313, 'residentidcard', 'Resident ID Card', 1);

-- --------------------------------------------------------

--
-- Table structure for table `print_requests`
--

CREATE TABLE `print_requests` (
  `id` int(11) NOT NULL,
  `resident_id` int(11) NOT NULL,
  `request_type` varchar(100) NOT NULL,
  `requested_by` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `approved_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `printed_at` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `print_requests`
--

INSERT INTO `print_requests` (`id`, `resident_id`, `request_type`, `requested_by`, `status`, `created_at`, `approved_at`, `expires_at`, `printed_at`, `reason`) VALUES
(20, 2, 'barangay_id', 11, 'approved', '2025-12-26 18:10:08', '2025-12-27 02:10:16', '2026-01-03 02:10:16', NULL, NULL),
(21, 3, 'barangay_id', 11, 'approved', '2025-12-26 18:11:45', '2025-12-27 02:11:49', '2026-01-03 02:11:49', NULL, NULL),
(22, 8, 'barangay_id', 17, 'approved', '2025-12-29 03:51:29', '2025-12-29 12:00:39', '2026-01-05 12:00:39', NULL, NULL),
(23, 8, 'barangay_indigency', 17, 'approved', '2025-12-29 04:11:31', '2025-12-29 12:12:39', '2026-01-05 12:12:39', NULL, NULL),
(24, 3, 'indigency_minor', 17, 'approved', '2025-12-29 04:11:36', '2025-12-29 12:12:35', '2026-01-05 12:12:35', NULL, NULL),
(25, 1, 'barangay_id', 17, 'approved', '2025-12-29 04:24:26', '2025-12-29 12:25:00', '2026-01-05 12:25:00', NULL, NULL),
(26, 7, 'barangay_id', 17, 'pending', '2025-12-29 05:01:20', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `request_id_table`
--

CREATE TABLE `request_id_table` (
  `requestID_id` int(11) NOT NULL,
  `resident_id` int(11) NOT NULL,
  `precint_no` varchar(255) NOT NULL,
  `id_number` varchar(255) NOT NULL,
  `date_issue` varchar(255) NOT NULL,
  `valid_until` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_id_table`
--

INSERT INTO `request_id_table` (`requestID_id`, `resident_id`, `precint_no`, `id_number`, `date_issue`, `valid_until`) VALUES
(1, 2, '', 'ID-2-1765550537583', '2025-12-12', 'end of term'),
(2, 1, '', 'ID-1-1765550833164', '2025-12-12', 'END OF TERM');

-- --------------------------------------------------------

--
-- Table structure for table `residents`
--

CREATE TABLE `residents` (
  `id` int(11) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `suffix` varchar(20) DEFAULT NULL,
  `sex` enum('Male','Female','Other') NOT NULL,
  `age` int(11) DEFAULT NULL,
  `birthdate` varchar(255) DEFAULT NULL,
  `civil_status` varchar(50) DEFAULT NULL,
  `work` varchar(255) NOT NULL,
  `monthly_income` int(11) DEFAULT NULL,
  `contact_no` varchar(50) DEFAULT NULL,
  `purok` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `is_voters` int(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `precint_no` varchar(60) DEFAULT NULL,
  `fullname_emergency` varchar(255) DEFAULT NULL,
  `contact_no_emergency` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residents`
--

INSERT INTO `residents` (`id`, `profile_picture`, `last_name`, `first_name`, `middle_name`, `suffix`, `sex`, `age`, `birthdate`, `civil_status`, `work`, `monthly_income`, `contact_no`, `purok`, `address`, `is_voters`, `created_at`, `precint_no`, `fullname_emergency`, `contact_no_emergency`, `status`) VALUES
(1, NULL, 'San Jose', 'Dhani', 'Ignacio', NULL, 'Male', NULL, '1982-01-06', 'Single', '', NULL, '09112345678', NULL, 'Blk 14 Lot 19', 0, '2025-11-13 03:28:13', NULL, NULL, NULL, 1),
(2, '/uploads/profile_pictures/1765711263002-formalpic.jpg', 'Montano', 'Mark Anthony', 'Placido', '', 'Male', 22, '2003-06-26', 'Single', '', 0, '09948183681', 'Dona Yayang', '19 G Dona yayang Street Libis', 1, '2025-11-13 03:28:54', '4033A', 'Mario A. Montano', '09666287280', 1),
(3, '/uploads/profile_pictures/1766305161811-f2dbcf37-7231-4c55-8d65-0c5ffe4ee60f.jfif', 'Mecasio', 'Arden', 'Bandoja', 'Jr', 'Male', 21, '2003-04-10', 'Single', 'Computer Shops', 2, '9079787', 'Bato', 'Lot1 Blk7 Salmon Alley, Mannunggal St. Brgy. Tatalon', 1, '2025-12-14 03:43:16', '4658A', 'Hello World', '20250001231', 1),
(7, 'null', 'Dela Cruz', 'Cedrick Llyod', 'P.', '', 'Male', 22, '2003-01-10', 'Single', 'Computer Shops', 1, '9079787', 'ASD', 'Lot1 Blk7 Salmon Alley, Mannunggal St. Brgy. Tatalon', 1, '2025-12-21 08:20:49', '1213B', 'Arden Mecasio', '0962791313', 1),
(8, '/uploads/profile_pictures/1766313632716-f2dbcf37-7231-4c55-8d65-0c5ffe4ee60f.jfif', 'Ciruela', 'Genny', 'D.', 'as', 'Female', 22, '2003-12-26', 'Single', 'Parlor', 2, '8296183', 'DASDADAS', 'sadasdasd', 1, '2025-12-21 10:40:14', 'asdasd', 'asdas', '21312482681', 0);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `service_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `description`, `service_date`, `location`, `created_at`) VALUES
(6, 'AKAP Certification', NULL, '2025-12-21', 'Barangay 369', '2025-12-21 11:07:39'),
(7, 'asd', NULL, '2025-12-21', 'Barangay 369', '2025-12-21 12:15:52');

-- --------------------------------------------------------

--
-- Table structure for table `service_beneficiaries`
--

CREATE TABLE `service_beneficiaries` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `resident_id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthdate` varchar(60) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `civil_status` varchar(60) DEFAULT NULL,
  `work` varchar(60) DEFAULT NULL,
  `monthly_income` int(11) DEFAULT NULL,
  `is_voters` int(1) DEFAULT 0,
  `contact_no` varchar(60) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_beneficiaries`
--

INSERT INTO `service_beneficiaries` (`id`, `service_id`, `resident_id`, `fullname`, `address`, `birthdate`, `age`, `civil_status`, `work`, `monthly_income`, `is_voters`, `contact_no`, `notes`, `created_at`) VALUES
(20, 6, 8, 'asdasd, asda asdas as', 'sadasdasd', '2000-01-10', 25, 'Single', 'Parlor', 2, 0, '8296183', NULL, '2025-12-21 11:07:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `official_id` int(11) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `role` enum('SuperAdmin','Admin','User') DEFAULT 'User',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `require_otp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `official_id`, `profile_image`, `username`, `password_hash`, `full_name`, `role`, `created_at`, `require_otp`) VALUES
(9, 12, NULL, '4rdenmecasi0@gmail.com', '$2b$10$qb8ULyvxbdk31tiQb7ohYuw2XvRSeglc1amH8NbST/W2r/aofRwqa', 'Jessica C. Morit', 'User', '2025-12-21 12:18:44', 0),
(10, 8, NULL, 'mecasio.a.bsinfotech@gmail.com', '$2b$10$ZaWU8uEz3EXv9zjuzj20ael0.LJ120k0JWfMiIe40OG79N5i3mqma', 'Angelito P. Velasco', 'Admin', '2025-12-21 12:21:05', 0),
(11, 3, NULL, 'markmontano999@gmail.com', '$2b$10$zFGTApAt3yQ8QPYMbH6jPOYvzTaKHqUCewM80gyEojRlVbUcpLCsa', 'Richard U. Benitez', 'User', '2025-12-24 16:27:23', 0),
(16, 2, '/uploads/profile_pictures/1766910247743-sisec.jpg', 'markmontano522@gmail.com', '$2b$10$MYqL6T2twCaEGjh2t.MGuuThyK6.EFN/PpBhUVSF/cykkk7ZAUFJe', 'Fregilda P. Matabang', 'SuperAdmin', '2025-12-28 08:02:12', 0),
(17, 4, NULL, 'romulaenrica@gmail.com', '$2b$10$cmVDP3hQppFtH34v.fAuvOVj0fen.Q28MJGPGMAO7h2DEwWexHjqG', 'Romulo O. Enrica', 'User', '2025-12-29 03:51:14', 0),
(18, 1, NULL, 'manolitocallanta@gmail.com', '$2b$10$MQ/SR4fTgGKiBRCv97cwVeloQtlfXv6FzAookLTSj3m6huXRlikJa', 'Engr. Manolito R. Callanta', 'Admin', '2025-12-29 03:59:05', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit`
--
ALTER TABLE `audit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `barangay_profile`
--
ALTER TABLE `barangay_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `certificate_templates`
--
ALTER TABLE `certificate_templates`
  ADD PRIMARY KEY (`template_id`),
  ADD UNIQUE KEY `template_code` (`template_code`);

--
-- Indexes for table `company_settings`
--
ALTER TABLE `company_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_images`
--
ALTER TABLE `event_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `households`
--
ALTER TABLE `households`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `household_members`
--
ALTER TABLE `household_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `household_id` (`household_id`),
  ADD KEY `resident_id` (`resident_id`);

--
-- Indexes for table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `complainant_id` (`complainant_id`),
  ADD KEY `respondent_id` (`respondent_id`);

--
-- Indexes for table `officials`
--
ALTER TABLE `officials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `page_access`
--
ALTER TABLE `page_access`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `print_requests`
--
ALTER TABLE `print_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request_id_table`
--
ALTER TABLE `request_id_table`
  ADD PRIMARY KEY (`requestID_id`);

--
-- Indexes for table `residents`
--
ALTER TABLE `residents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_beneficiaries`
--
ALTER TABLE `service_beneficiaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `resident_id` (`resident_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit`
--
ALTER TABLE `audit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `barangay_profile`
--
ALTER TABLE `barangay_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `certificate_templates`
--
ALTER TABLE `certificate_templates`
  MODIFY `template_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `company_settings`
--
ALTER TABLE `company_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `event_images`
--
ALTER TABLE `event_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `households`
--
ALTER TABLE `households`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `household_members`
--
ALTER TABLE `household_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `incidents`
--
ALTER TABLE `incidents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `officials`
--
ALTER TABLE `officials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `page_access`
--
ALTER TABLE `page_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=314;

--
-- AUTO_INCREMENT for table `print_requests`
--
ALTER TABLE `print_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `request_id_table`
--
ALTER TABLE `request_id_table`
  MODIFY `requestID_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `residents`
--
ALTER TABLE `residents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `service_beneficiaries`
--
ALTER TABLE `service_beneficiaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event_images`
--
ALTER TABLE `event_images`
  ADD CONSTRAINT `event_images_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `household_members`
--
ALTER TABLE `household_members`
  ADD CONSTRAINT `household_members_ibfk_1` FOREIGN KEY (`household_id`) REFERENCES `households` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `household_members_ibfk_2` FOREIGN KEY (`resident_id`) REFERENCES `residents` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `incidents`
--
ALTER TABLE `incidents`
  ADD CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`complainant_id`) REFERENCES `residents` (`id`),
  ADD CONSTRAINT `incidents_ibfk_2` FOREIGN KEY (`respondent_id`) REFERENCES `residents` (`id`);

--
-- Constraints for table `service_beneficiaries`
--
ALTER TABLE `service_beneficiaries`
  ADD CONSTRAINT `service_beneficiaries_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `service_beneficiaries_ibfk_2` FOREIGN KEY (`resident_id`) REFERENCES `residents` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
