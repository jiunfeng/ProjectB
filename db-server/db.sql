-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： db
-- 產生時間： 2024 年 02 月 22 日 07:04
-- 伺服器版本： 10.6.16-MariaDB-1:10.6.16+maria~ubu2004
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
  `items` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user_account`
--

INSERT INTO `user_account` (`id`, `account`, `password`, `username`, `rank`, `money`, `credit`, `experience`, `pet_team`, `items`) VALUES
(1, 'test001', 'test001pas', 'testaccount', 3, 5000, 3000, 300, '001|002|003', '001,20|002,10|004,10');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user_account`
--
ALTER TABLE `user_account`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
