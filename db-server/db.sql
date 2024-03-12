-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： db
-- 產生時間： 2024 年 03 月 11 日 01:53
-- 伺服器版本： 10.4.8-MariaDB-1:10.4.8+maria~bionic
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `projectb`
--
CREATE DATABASE IF NOT EXISTS `projectb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `projectb`;

-- --------------------------------------------------------

--
-- 資料表結構 `pets_card`
--

CREATE TABLE `pets_card` (
  `id` int(11) NOT NULL,
  `number` varchar(16) NOT NULL,
  `name` varchar(16) NOT NULL,
  `story` varchar(256) DEFAULT NULL,
  `element_attributes` varchar(3) NOT NULL,
  `quality` varchar(3) NOT NULL,
  `health_point` int(16) NOT NULL,
  `health_point_coefficient` int(16) NOT NULL,
  `attack` int(16) NOT NULL,
  `attack_coefficient` int(16) NOT NULL,
  `resilience` int(16) NOT NULL,
  `resilience_coefficient` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `pets_card`
--

INSERT INTO `pets_card` (`id`, `number`, `name`, `story`, `element_attributes`, `quality`, `health_point`, `health_point_coefficient`, `attack`, `attack_coefficient`, `resilience`, `resilience_coefficient`) VALUES
(1, '001', '天字一號', NULL, '1', '2', 300, 30, 500, 20, 200, 20),
(2, '002', '天字二號', NULL, '1', '2', 100, 10, 200, 20, 500, 40),
(5, '003', '天字三號', NULL, '2', '3', 100, 10, 100, 10, 100, 10),
(6, '004', '天字四號', NULL, '3', '3', 300, 30, 500, 100, 20, 5),
(7, '005', '天字第五號', NULL, '3', '3', 250, 20, 300, 200, 50, 10),
(8, '006', '天字第六號', NULL, '1', '3', 350, 200, 20, 5, 500, 100);

-- --------------------------------------------------------

--
-- 資料表結構 `user_account`
--

CREATE TABLE `user_account` (
  `id` int(4) NOT NULL,
  `account` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `username` varchar(16) NOT NULL,
  `rank` int(4) NOT NULL,
  `money` int(4) NOT NULL,
  `credit` int(4) NOT NULL,
  `experience` int(4) NOT NULL,
  `pet_team` varchar(16) NOT NULL,
  `items` varchar(60) NOT NULL,
  `background_pet` varchar(3) NOT NULL DEFAULT '001',
  `heads` varchar(3) NOT NULL DEFAULT '001'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user_account`
--

INSERT INTO `user_account` (`id`, `account`, `password`, `username`, `rank`, `money`, `credit`, `experience`, `pet_team`, `items`, `background_pet`, `heads`) VALUES
(1, 'test0001', 'test001pas', 'testaccount', 3, 5000, 3000, 780, '001|002|003', '001,70|002,10|004,10', '001', '001'),
(7, 'test00010', 'test001pas', '天字吧好', 1, 1000, 500, 840, '001|002|003', '001,25|002,10|004,10', '001', '001');

-- --------------------------------------------------------

--
-- 資料表結構 `user_pets`
--

CREATE TABLE `user_pets` (
  `id` int(11) NOT NULL,
  `user_account` int(4) NOT NULL COMMENT '外來鍵(user_info)',
  `pet_number` int(4) NOT NULL COMMENT '外來鍵(pet_card)',
  `experience` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user_pets`
--

INSERT INTO `user_pets` (`id`, `user_account`, `pet_number`, `experience`) VALUES
(1, 1, 1, '500'),
(2, 1, 2, '1000'),
(3, 1, 5, '900'),
(4, 1, 6, '1000'),
(5, 7, 1, '100'),
(6, 7, 2, '100'),
(7, 7, 5, '100');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `pets_card`
--
ALTER TABLE `pets_card`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user_pets`
--
ALTER TABLE `user_pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_owner` (`user_account`),
  ADD KEY `pet_self` (`pet_number`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `pets_card`
--
ALTER TABLE `pets_card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_pets`
--
ALTER TABLE `user_pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `user_pets`
--
ALTER TABLE `user_pets`
  ADD CONSTRAINT `pet_owner` FOREIGN KEY (`user_account`) REFERENCES `user_account` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `pet_self` FOREIGN KEY (`pet_number`) REFERENCES `pets_card` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
