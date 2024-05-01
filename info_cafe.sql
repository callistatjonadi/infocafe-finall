-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 19, 2024 at 10:15 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `info_cafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `cafes`
--

CREATE TABLE `cafes` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL,
  `distance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafes`
--

INSERT INTO `cafes` (`id`, `name`, `description`, `address`, `image`, `distance`) VALUES
(1, 'Cafe Blossom', 'A cozy and welcoming place to enjoy your afternoon tea.', '123 Sunny St, Springfield', 'cafe_1.jpeg', 3),
(2, 'Green Leaf Cafe', 'Perfect spot for health enthusiasts offering a variety of organic options.', '456 Health Ave, Greensville', 'cafe_2.jpeg', 4),
(3, 'Seaside Espresso', 'Enjoy a spectacular sea view while sipping on our finest brews.', '789 Ocean Dr, Beachtown', 'cafe_3.jpeg', 5),
(4, 'Mountain Brew', 'The highest coffee point in the city; enjoy the heights with delightful bites.', '321 Peak Rd, Mountville', 'cafe_4.jpeg', 6),
(5, 'Urban Grind', 'The hippest place for young professionals to network and enjoy coffee.', '234 Metro Blvd, Downtown', 'cafe_5.jpeg', 8),
(6, 'Historic Beans Cafe', 'Step back in time with our traditional brews in a classic setting.', '567 Antique Rd, Oldtown', 'cafe_6.jpeg', 10),
(7, 'Artisan Coffee Hub', 'Where art meets coffee. Every cup is a masterpiece.', '890 Gallery Ln, Art District', 'cafe_7.jpeg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cafe_id` int(11) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `cafe_id`, `comment`, `rating`) VALUES
(2, 2, 1, 'Love the foods', 5),
(7, 2, 1, 'Nice One', 2),
(8, 2, 1, 'Not too bad as a cafe', 3),
(11, 2, 1, 'Nice One', 2),
(12, 2, 1, 'Not too bad as a cafe', 3),
(15, 2, 1, 'AYam', 1),
(17, 5, 1, 'ayam is ayam', 1),
(18, 5, 1, 'ayam again', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`) VALUES
(2, 'lia', 'lia@gmail.com', '$2b$10$p/J7TC2USUNFWh6AOcG9o.NUXLXeuOf6H6P62ZyB6c8F8ZOwLwRI2', 'user'),
(5, 'admin', 'admin@gmail.com', '$2b$10$6nYv1P.IFnpmlnIVzpELP.W1SghsXtzBOoHbvMAY3JiQo9c8d5UhC', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cafes`
--
ALTER TABLE `cafes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_review_cafe` (`cafe_id`),
  ADD KEY `fk_review_user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cafes`
--
ALTER TABLE `cafes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_review_cafe` FOREIGN KEY (`cafe_id`) REFERENCES `cafes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_review_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
