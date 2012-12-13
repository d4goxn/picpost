-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 12, 2012 at 03:08 PM
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
  `thumb` varchar(256) NOT NULL,
  `popularity` int(11) NOT NULL DEFAULT '0',
  `uploaded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hash` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `popularity` (`popularity`),
  KEY `uploaded` (`uploaded`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=118 ;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `title`, `description`, `filename`, `thumb`, `popularity`, `uploaded`, `hash`) VALUES
(49, '', '', 'images/gallery/49.jpg', 'images/thumbs/49.jpg', 0, '2012-12-11 00:07:33', 0),
(50, '', '', 'images/gallery/50.jpg', 'images/thumbs/50.jpg', 0, '2012-12-11 00:08:34', 0),
(51, 'Powered by', '<a href="http://nodejs.org/">node</a>', 'images/gallery/51.png', 'images/thumbs/51.png', 2, '2012-12-11 00:42:27', 0),
(52, 'NDSS', 'My old highschool.', 'images/gallery/52.jpg', 'images/thumbs/52.jpg', 0, '2012-12-11 04:45:30', 0),
(53, '', '', 'images/gallery/53.jpg', 'images/thumbs/53.jpg', 0, '2012-12-11 04:47:09', 0),
(54, '', '', 'images/gallery/54.jpg', 'images/thumbs/54.jpg', 0, '2012-12-11 04:47:16', 0),
(55, '', '', 'images/gallery/55.jpg', 'images/thumbs/55.jpg', 0, '2012-12-11 04:47:19', 0),
(56, '', '', 'images/gallery/56.jpg', 'images/thumbs/56.jpg', 0, '2012-12-11 04:47:23', 0),
(57, '', '', 'images/gallery/57.jpg', 'images/thumbs/57.jpg', 0, '2012-12-11 04:47:29', 0),
(58, '', '', 'images/gallery/58.jpg', 'images/thumbs/58.jpg', 1, '2012-12-11 04:47:38', 0),
(59, '', '', 'images/gallery/59.jpg', 'images/thumbs/59.jpg', 0, '2012-12-11 04:47:41', 0),
(60, '', '', 'images/gallery/60.jpg', 'images/thumbs/60.jpg', 0, '2012-12-11 04:47:48', 0),
(61, '', '', 'images/gallery/61.jpg', 'images/thumbs/61.jpg', 0, '2012-12-11 04:47:50', 0),
(62, '', '', 'images/gallery/62.jpg', 'images/thumbs/62.jpg', 1, '2012-12-11 04:47:52', 0),
(63, '', '', 'images/gallery/63.jpg', 'images/thumbs/63.jpg', 0, '2012-12-11 04:47:54', 0),
(64, '', '', 'images/gallery/64.jpg', 'images/thumbs/64.jpg', 1, '2012-12-11 04:47:56', 0),
(65, '', '', 'images/gallery/65.gif', 'images/thumbs/65.gif', 0, '2012-12-11 04:47:59', 0),
(66, '', '', 'images/gallery/66.jpg', 'images/thumbs/66.jpg', 2, '2012-12-11 04:48:01', 0),
(67, '', '', 'images/gallery/67.png', 'images/thumbs/67.png', 1, '2012-12-11 04:48:10', 0),
(68, '', '', 'images/gallery/68.png', 'images/thumbs/68.png', 1, '2012-12-11 04:48:14', 0),
(69, '', '', 'images/gallery/69.jpg', 'images/thumbs/69.jpg', 2, '2012-12-11 04:48:21', 0),
(70, '', '', 'images/gallery/70.jpg', 'images/thumbs/70.jpg', 1, '2012-12-11 04:48:23', 0),
(71, '', '', 'images/gallery/71.jpg', 'images/thumbs/71.jpg', 0, '2012-12-11 04:48:29', 0),
(72, '', '', 'images/gallery/72.jpg', 'images/thumbs/72.jpg', 0, '2012-12-11 04:48:31', 0),
(73, '', '', 'images/gallery/73.jpg', 'images/thumbs/73.jpg', 1, '2012-12-11 04:48:34', 0),
(74, '', '', 'images/gallery/74.jpg', 'images/thumbs/74.jpg', 1, '2012-12-11 04:48:36', 0),
(75, '', '', 'images/gallery/75.jpg', 'images/thumbs/75.jpg', 0, '2012-12-11 04:48:42', 0),
(76, '', '', 'images/gallery/76.jpg', 'images/thumbs/76.jpg', 2, '2012-12-11 04:48:50', 0),
(77, '', '', 'images/gallery/77.png', 'images/thumbs/77.png', 0, '2012-12-11 04:48:58', 0),
(78, '', '', 'images/gallery/78.png', 'images/thumbs/78.png', 1, '2012-12-11 04:49:44', 0),
(79, '', '', 'images/gallery/79.jpg', 'images/thumbs/79.jpg', 2, '2012-12-11 04:49:50', 0),
(80, '', '', 'images/gallery/80.jpg', 'images/thumbs/80.jpg', 1, '2012-12-11 04:49:52', 0),
(81, '', '', 'images/gallery/81.jpg', 'images/thumbs/81.jpg', 1, '2012-12-11 04:49:54', 0),
(82, 'Raider Screenshot', 'A screenshot from my new comp. It is named after the most prominent label on it''s case, like all of my computers.\r\n- OS: Xubuntu 12.10\r\n- DM / WM: XFCE 4.8\r\n- Launcher: Synapse 0.2.10', 'images/gallery/82.png', 'images/thumbs/82.png', 1, '2012-12-12 21:55:53', 0),
(83, 'Worlds Best Lasagna', 'If you disagree, please send me a lasagna sample to review.', 'images/gallery/83.jpg', 'images/thumbs/83.jpg', 1, '2012-12-12 21:56:57', 0),
(84, 'Garuda', 'An Indian god, the namesake of Garuda Squadron in Ace Combat 6.', 'images/gallery/84.jpg', 'images/thumbs/84.jpg', 0, '2012-12-12 22:00:01', 0),
(85, 'Dos code!', 'Can you guess the name of this famous software?', 'images/gallery/85.jpg', 'images/thumbs/85.jpg', 1, '2012-12-12 22:00:53', 0),
(86, '', '', 'images/gallery/86.jpeg', 'images/thumbs/86.jpeg', 1, '2012-12-12 22:00:59', 0),
(87, 'This looks real bad...', '...and it was on the front of a comp. sci. page for TRU online.', 'images/gallery/87.jpg', 'images/thumbs/87.jpg', 1, '2012-12-12 22:03:42', 0),
(88, 'Ooooh', 'Ahhhh', 'images/gallery/88.jpg', 'images/thumbs/88.jpg', 1, '2012-12-12 22:04:25', 0),
(89, '', 'This is why we need rail.', 'images/gallery/89.jpg', 'images/thumbs/89.jpg', 2, '2012-12-12 22:05:35', 0),
(90, '', '', 'images/gallery/90.jpeg', 'images/thumbs/90.jpeg', 0, '2012-12-12 22:21:13', 0),
(91, '', '', 'images/gallery/91.jpg', 'images/thumbs/91.jpg', 0, '2012-12-12 22:21:17', 0),
(92, '', '', 'images/gallery/92.jpg', 'images/thumbs/92.jpg', 0, '2012-12-12 22:21:21', 0),
(93, '', '', 'images/gallery/93.jpg', 'images/thumbs/93.jpg', 0, '2012-12-12 22:21:25', 0),
(94, '', '', 'images/gallery/94.jpg', 'images/thumbs/94.jpg', 0, '2012-12-12 22:21:28', 0),
(95, '', '', 'images/gallery/95.jpg', 'images/thumbs/95.jpg', 0, '2012-12-12 22:21:31', 0),
(96, '', '', 'images/gallery/96.jpg', 'images/thumbs/96.jpg', 0, '2012-12-12 22:21:34', 0),
(98, '', '', 'images/gallery/98.jpg', 'images/thumbs/98.jpg', 0, '2012-12-12 22:21:40', 0),
(99, '', '', 'images/gallery/99.jpg', 'images/thumbs/99.jpg', 0, '2012-12-12 22:21:43', 0),
(100, '', '', 'images/gallery/100.jpg', 'images/thumbs/100.jpg', 1, '2012-12-12 22:21:46', 0),
(101, '', '', 'images/gallery/101.jpg', 'images/thumbs/101.jpg', 0, '2012-12-12 22:21:49', 0),
(102, '', '', 'images/gallery/102.jpg', 'images/thumbs/102.jpg', 0, '2012-12-12 22:21:51', 0),
(103, '', '', 'images/gallery/103.jpg', 'images/thumbs/103.jpg', 0, '2012-12-12 22:21:58', 0),
(104, '', '', 'images/gallery/104.jpg', 'images/thumbs/104.jpg', 0, '2012-12-12 22:22:01', 0),
(105, 'Hex storm', 'Unlike most planets, which are made of square tiles with polar coordinates, Saturn is geodesic.', 'images/gallery/105.jpg', 'images/thumbs/105.jpg', 1, '2012-12-12 22:24:18', 0),
(106, 'I think it was a great idea.', 'The US navy thought it was a terrible idea.', 'images/gallery/106.jpg', 'images/thumbs/106.jpg', 1, '2012-12-12 23:01:33', 0),
(107, '', '', 'images/gallery/107.jpg', 'images/thumbs/107.jpg', 0, '2012-12-12 23:01:39', 0),
(108, '8086 Die', '', 'images/gallery/108.jpg', 'images/thumbs/108.jpg', 0, '2012-12-12 23:01:49', 0),
(109, 'Unix kernel architecture', '', 'images/gallery/109.gif', 'images/thumbs/109.gif', 0, '2012-12-12 23:01:59', 0),
(110, 'Phylogenetic tree of lInux', '', 'images/gallery/110.png', 'images/thumbs/110.png', 1, '2012-12-12 23:02:13', 0),
(111, '', '', 'images/gallery/111.gif', 'images/thumbs/111.gif', 0, '2012-12-12 23:02:22', 0),
(112, '', '', 'images/gallery/112.jpg', 'images/thumbs/112.jpg', 0, '2012-12-12 23:02:45', 0),
(113, '', '', 'images/gallery/113.jpg', 'images/thumbs/113.jpg', 0, '2012-12-12 23:02:53', 0),
(114, '', '', 'images/gallery/114.jpg', 'images/thumbs/114.jpg', 0, '2012-12-12 23:03:17', 0),
(115, '', '', 'images/gallery/115.jpg', 'images/thumbs/115.jpg', 0, '2012-12-12 23:03:20', 0),
(116, 'Saturn', 'It''s a hex grid.', 'images/gallery/116.jpg', 'images/thumbs/116.jpg', 0, '2012-12-12 23:05:32', 0),
(117, '', '', 'images/gallery/117.jpg', 'images/thumbs/117.jpg', 0, '2012-12-12 23:05:47', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
