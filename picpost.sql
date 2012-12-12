-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 12, 2012 at 01:41 AM
-- Server version: 5.1.53
-- PHP Version: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


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
  `thumb` varchar(256) NOT NULL,
  `popularity` int(11) NOT NULL DEFAULT '0',
  `uploaded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `popularity` (`popularity`),
  KEY `uploaded` (`uploaded`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=82 ;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `title`, `description`, `filename`, `thumb`, `popularity`, `uploaded`) VALUES
(49, '', '', 'images/gallery/49.jpg', 'images/thumbs/49.jpg', 0, '2012-12-10 16:07:33'),
(50, '', '', 'images/gallery/50.jpg', 'images/thumbs/50.jpg', 0, '2012-12-10 16:08:34'),
(51, 'Powered by', '<a href="http://nodejs.org/">node</a>', 'images/gallery/51.png', 'images/thumbs/51.png', 2, '2012-12-10 16:42:27'),
(52, 'NDSS', 'My old highschool.', 'images/gallery/52.jpg', 'images/thumbs/52.jpg', 0, '2012-12-10 20:45:30'),
(53, '', '', 'images/gallery/53.jpg', 'images/thumbs/53.jpg', 0, '2012-12-10 20:47:09'),
(54, '', '', 'images/gallery/54.jpg', 'images/thumbs/54.jpg', 0, '2012-12-10 20:47:16'),
(55, '', '', 'images/gallery/55.jpg', 'images/thumbs/55.jpg', 0, '2012-12-10 20:47:19'),
(56, '', '', 'images/gallery/56.jpg', 'images/thumbs/56.jpg', 0, '2012-12-10 20:47:23'),
(57, '', '', 'images/gallery/57.jpg', 'images/thumbs/57.jpg', 0, '2012-12-10 20:47:29'),
(58, '', '', 'images/gallery/58.jpg', 'images/thumbs/58.jpg', 0, '2012-12-10 20:47:38'),
(59, '', '', 'images/gallery/59.jpg', 'images/thumbs/59.jpg', 0, '2012-12-10 20:47:41'),
(60, '', '', 'images/gallery/60.jpg', 'images/thumbs/60.jpg', 0, '2012-12-10 20:47:48'),
(61, '', '', 'images/gallery/61.jpg', 'images/thumbs/61.jpg', 0, '2012-12-10 20:47:50'),
(62, '', '', 'images/gallery/62.jpg', 'images/thumbs/62.jpg', 0, '2012-12-10 20:47:52'),
(63, '', '', 'images/gallery/63.jpg', 'images/thumbs/63.jpg', 0, '2012-12-10 20:47:54'),
(64, '', '', 'images/gallery/64.jpg', 'images/thumbs/64.jpg', 0, '2012-12-10 20:47:56'),
(65, '', '', 'images/gallery/65.gif', 'images/thumbs/65.gif', 0, '2012-12-10 20:47:59'),
(66, '', '', 'images/gallery/66.jpg', 'images/thumbs/66.jpg', 0, '2012-12-10 20:48:01'),
(67, '', '', 'images/gallery/67.png', 'images/thumbs/67.png', 0, '2012-12-10 20:48:10'),
(68, '', '', 'images/gallery/68.png', 'images/thumbs/68.png', 0, '2012-12-10 20:48:14'),
(69, '', '', 'images/gallery/69.jpg', 'images/thumbs/69.jpg', 0, '2012-12-10 20:48:21'),
(70, '', '', 'images/gallery/70.jpg', 'images/thumbs/70.jpg', 0, '2012-12-10 20:48:23'),
(71, '', '', 'images/gallery/71.jpg', 'images/thumbs/71.jpg', 0, '2012-12-10 20:48:29'),
(72, '', '', 'images/gallery/72.jpg', 'images/thumbs/72.jpg', 0, '2012-12-10 20:48:31'),
(73, '', '', 'images/gallery/73.jpg', 'images/thumbs/73.jpg', 0, '2012-12-10 20:48:34'),
(74, '', '', 'images/gallery/74.jpg', 'images/thumbs/74.jpg', 0, '2012-12-10 20:48:36'),
(75, '', '', 'images/gallery/75.jpg', 'images/thumbs/75.jpg', 0, '2012-12-10 20:48:42'),
(76, '', '', 'images/gallery/76.jpg', 'images/thumbs/76.jpg', 0, '2012-12-10 20:48:50'),
(77, '', '', 'images/gallery/77.png', 'images/thumbs/77.png', 0, '2012-12-10 20:48:58'),
(78, '', '', 'images/gallery/78.png', 'images/thumbs/78.png', 0, '2012-12-10 20:49:44'),
(79, '', '', 'images/gallery/79.jpg', 'images/thumbs/79.jpg', 0, '2012-12-10 20:49:50'),
(80, '', '', 'images/gallery/80.jpg', 'images/thumbs/80.jpg', 0, '2012-12-10 20:49:52'),
(81, '', '', 'images/gallery/81.jpg', 'images/thumbs/81.jpg', 0, '2012-12-10 20:49:54');
