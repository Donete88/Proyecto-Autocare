-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2026 a las 11:28:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `autocare`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coches`
--

CREATE TABLE `coches` (
  `idCoche` int(11) NOT NULL,
  `emailUser` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `combustible` enum('gasolina','diesel','electricidad') NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `coches`
--

INSERT INTO `coches` (`idCoche`, `emailUser`, `marca`, `modelo`, `combustible`, `fechaCreacion`) VALUES
(0, 'iondobreantonio@gmail.com', 'citroen', 'jumpy', 'diesel', '2026-02-13 10:25:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs_mantenimiento`
--

CREATE TABLE `logs_mantenimiento` (
  `idLogs` int(11) NOT NULL,
  `idCoche` int(11) NOT NULL,
  `tipoServicio` varchar(100) NOT NULL,
  `fechaServicio` date NOT NULL,
  `notas` text DEFAULT NULL,
  `fechacreacionServicio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `logs_mantenimiento`
--

INSERT INTO `logs_mantenimiento` (`idLogs`, `idCoche`, `tipoServicio`, `fechaServicio`, `notas`, `fechacreacionServicio`) VALUES
(1, 0, 'recargar diesel', '2026-02-13', 'aproximacion de cuando recargar diesel', '2026-02-13 10:26:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recordatorios`
--

CREATE TABLE `recordatorios` (
  `idRecordatorio` int(11) NOT NULL,
  `idCoche` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `fechaLimite` date NOT NULL,
  `complecion` tinyint(1) DEFAULT 0,
  `creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recordatorios`
--

INSERT INTO `recordatorios` (`idRecordatorio`, `idCoche`, `titulo`, `fechaLimite`, `complecion`, `creacion`) VALUES
(1, 0, 'Recargar Diesel', '2026-02-26', 0, '2026-02-13 10:27:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `nombreCompleto` varchar(40) NOT NULL,
  `emailUser` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `api_token` varchar(64) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`nombreCompleto`, `emailUser`, `password`, `api_token`, `fecha`) VALUES
('Antonio Dobre', 'iondobreantonio@gmail.com', '1234', NULL, '2026-02-13 10:23:08');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `coches`
--
ALTER TABLE `coches`
  ADD PRIMARY KEY (`idCoche`),
  ADD KEY `emailUser` (`emailUser`);

--
-- Indices de la tabla `logs_mantenimiento`
--
ALTER TABLE `logs_mantenimiento`
  ADD PRIMARY KEY (`idLogs`) USING BTREE,
  ADD KEY `idCoche` (`idCoche`) USING BTREE;

--
-- Indices de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD PRIMARY KEY (`idRecordatorio`) USING BTREE,
  ADD KEY `idCoche` (`idCoche`) USING BTREE;

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`emailUser`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `logs_mantenimiento`
--
ALTER TABLE `logs_mantenimiento`
  MODIFY `idLogs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  MODIFY `idRecordatorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `coches`
--
ALTER TABLE `coches`
  ADD CONSTRAINT `coches_ibfk_2` FOREIGN KEY (`emailUser`) REFERENCES `users` (`emailUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `logs_mantenimiento`
--
ALTER TABLE `logs_mantenimiento`
  ADD CONSTRAINT `logs_mantenimiento_ibfk_1` FOREIGN KEY (`idCoche`) REFERENCES `coches` (`idCoche`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recordatorios`
--
ALTER TABLE `recordatorios`
  ADD CONSTRAINT `recordatorios_ibfk_1` FOREIGN KEY (`idCoche`) REFERENCES `coches` (`idCoche`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
