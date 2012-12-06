-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 05, 2012 at 02:53 PM
-- Server version: 5.5.28
-- PHP Version: 5.4.6-1ubuntu1.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `picpost`
--

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `description` varchar(4000) NOT NULL,
  `filename` varchar(256) NOT NULL,
  `thumb_filename` varchar(256) NOT NULL,
  `popularity` int(11) NOT NULL DEFAULT '0',
  `uploaded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `popularity` (`popularity`),
  KEY `uploaded` (`uploaded`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `title`, `description`, `filename`, `thumb_filename`, `popularity`, `uploaded`) VALUES
(10, 'croc', 'lalala', '10.jpg', '', 0, '2012-12-05 06:07:45'),
(11, 'asd', 'fdas', '11.jpg', '', 0, '2012-12-05 06:07:56'),
(12, 'asd', 'fdas', '12.jpg', '', 0, '2012-12-05 06:08:03'),
(13, 'fdas', 'asdf', '13.jpg', '', 0, '2012-12-05 06:08:08'),
(14, 'asdf', 'fdas', '14.jpg', '', 0, '2012-12-05 06:08:13'),
(15, 'asdf', 'fdas', '15.jpg', '', 0, '2012-12-05 06:08:19'),
(16, 'asdf', 'fdas', '16.jpg', '', 0, '2012-12-05 06:08:24'),
(17, 'asd', 'fdsa', '17.jpg', '', 0, '2012-12-05 06:08:29'),
(18, 'asdf', 'fdas', '18.jpg', '', 0, '2012-12-05 06:08:34'),
(19, 'asdf', 'fdas', '19.jpg', '', 0, '2012-12-05 06:08:38'),
(20, 'asdf', 'fdas', '20.jpg', '', 0, '2012-12-05 06:13:30'),
(21, 'Git Cheat Sheet', '', '21.png', '', 0, '2012-12-05 10:56:32'),
(22, 'Crayola Color Wheel', '', '22.jpg', '', 0, '2012-12-05 10:56:53'),
(23, 'Sound Barrier', '', '23.jpg', '', 0, '2012-12-05 10:57:25'),
(24, 'Sri Lanka', '', '24.jpg', '', 0, '2012-12-05 10:58:15'),
(25, 'HTML5', '', '25.jpg', '', 0, '2012-12-05 10:58:26'),
(26, 'Montenegro', '', '26.jpg', '', 0, '2012-12-05 10:58:37'),
(27, 'Airplane Seating', '', '27.gif', '', 0, '2012-12-05 10:58:54'),
(28, 'Color Theory', '', '28.jpg', '', 0, '2012-12-05 10:59:05'),
(29, 'Hardware Identification', '', '29.png', '', 0, '2012-12-05 10:59:19'),
(30, 'HTML5 Specifications', 'The nice thing about standards, is that you can always make more.', '30.png', '', 0, '2012-12-05 11:00:15'),
(31, 'HTML5 Canvas', '', '31.png', '', 0, '2012-12-05 11:00:32'),
(32, 'Ranca Buaya', '', '32.jpg', '', 0, '2012-12-05 11:00:50'),
(33, 'Philly Park', '', '33.jpg', '', 0, '2012-12-05 11:02:58'),
(34, 'Matrimandir Pondicherry', '', '34.jpg', '', 0, '2012-12-05 11:03:29');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
