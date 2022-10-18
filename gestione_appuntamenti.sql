-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ott 10, 2022 alle 11:20
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestione_appuntamenti`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `eccezioni`
--

CREATE TABLE `eccezioni` (
  `id_eccezione` int(11) NOT NULL,
  `id_planner` int(11) NOT NULL,
  `desciriozne` varchar(50) NOT NULL,
  `data_inizio` date NOT NULL,
  `data_fine` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `eccezioni`
--

INSERT INTO `eccezioni` (`id_eccezione`, `id_planner`, `desciriozne`, `data_inizio`, `data_fine`) VALUES
(1, 1, 'hallowen', '2022-10-31', '2022-11-01');

-- --------------------------------------------------------

--
-- Struttura della tabella `giorni`
--

CREATE TABLE `giorni` (
  `id_gg` int(11) NOT NULL,
  `descrizione` varchar(20) NOT NULL,
  `ini_am` time DEFAULT NULL,
  `fin_am` time DEFAULT NULL,
  `ini_pm` time DEFAULT NULL,
  `fin_pm` time DEFAULT NULL,
  `festivo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `giorni`
--

INSERT INTO `giorni` (`id_gg`, `descrizione`, `ini_am`, `fin_am`, `ini_pm`, `fin_pm`, `festivo`) VALUES
(1, 'mattina', '09:00:00', '12:30:00', NULL, NULL, 0),
(2, 'pomerigigo', NULL, NULL, '15:00:00', '18:20:00', 0),
(3, 'mattina e pom', '09:00:00', '11:15:00', '16:00:00', '19:00:00', 0),
(4, 'festivo', NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `planner`
--

CREATE TABLE `planner` (
  `id_planner` int(11) NOT NULL,
  `id_uff` int(11) NOT NULL,
  `data_inizio` date NOT NULL,
  `data_fine` date DEFAULT NULL,
  `n_pre_ora` int(11) NOT NULL,
  `id_sett` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `planner`
--

INSERT INTO `planner` (`id_planner`, `id_uff`, `data_inizio`, `data_fine`, `n_pre_ora`, `id_sett`) VALUES
(1, 1, '2022-10-01', NULL, 3, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `id_pren` int(11) NOT NULL,
  `id_planner` int(11) NOT NULL,
  `id_utn` int(11) NOT NULL,
  `data` date NOT NULL,
  `ora` time NOT NULL,
  `confermato` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `settimane`
--

CREATE TABLE `settimane` (
  `id_sett` int(11) NOT NULL,
  `lun` int(11) NOT NULL,
  `mar` int(11) NOT NULL,
  `mer` int(11) NOT NULL,
  `gio` int(11) NOT NULL,
  `ven` int(11) NOT NULL,
  `sab` int(11) NOT NULL,
  `dom` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `settimane`
--

INSERT INTO `settimane` (`id_sett`, `lun`, `mar`, `mer`, `gio`, `ven`, `sab`, `dom`) VALUES
(1, 1, 3, 2, 4, 1, 1, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `uffici`
--

CREATE TABLE `uffici` (
  `id_uff` int(11) NOT NULL,
  `descrizione` varchar(30) NOT NULL,
  `riferimento` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `uffici`
--

INSERT INTO `uffici` (`id_uff`, `descrizione`, `riferimento`) VALUES
(1, 'Ufficio 1', 'sym'),
(2, 'Ufficio2', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id_utn` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `cognome` varchar(30) NOT NULL,
  `cf` varchar(16) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `cell` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id_utn`, `nome`, `cognome`, `cf`, `mail`, `cell`) VALUES
(1, 'Simone', 'Castelluccio', 'asdfasdfasdfasdf', 'fdas@dasf.it', 12345123),
(2, 'Persona', 'Uno', 'iuopuiopuiopuip', 'ujdsa@dfsa.it', 8549672);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `eccezioni`
--
ALTER TABLE `eccezioni`
  ADD PRIMARY KEY (`id_eccezione`),
  ADD KEY `id_planner` (`id_planner`);

--
-- Indici per le tabelle `giorni`
--
ALTER TABLE `giorni`
  ADD PRIMARY KEY (`id_gg`);

--
-- Indici per le tabelle `planner`
--
ALTER TABLE `planner`
  ADD PRIMARY KEY (`id_planner`),
  ADD KEY `id_sett` (`id_sett`),
  ADD KEY `id_uff` (`id_uff`);

--
-- Indici per le tabelle `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`id_pren`),
  ADD KEY `id_planner` (`id_planner`),
  ADD KEY `id_utn` (`id_utn`);

--
-- Indici per le tabelle `settimane`
--
ALTER TABLE `settimane`
  ADD PRIMARY KEY (`id_sett`),
  ADD KEY `lun` (`lun`),
  ADD KEY `mar` (`mar`),
  ADD KEY `mer` (`mer`),
  ADD KEY `gio` (`gio`),
  ADD KEY `sab` (`sab`),
  ADD KEY `dom` (`dom`),
  ADD KEY `ven` (`ven`);

--
-- Indici per le tabelle `uffici`
--
ALTER TABLE `uffici`
  ADD PRIMARY KEY (`id_uff`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id_utn`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `eccezioni`
--
ALTER TABLE `eccezioni`
  MODIFY `id_eccezione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `giorni`
--
ALTER TABLE `giorni`
  MODIFY `id_gg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `planner`
--
ALTER TABLE `planner`
  MODIFY `id_planner` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  MODIFY `id_pren` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `settimane`
--
ALTER TABLE `settimane`
  MODIFY `id_sett` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `uffici`
--
ALTER TABLE `uffici`
  MODIFY `id_uff` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id_utn` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `eccezioni`
--
ALTER TABLE `eccezioni`
  ADD CONSTRAINT `eccezioni_ibfk_1` FOREIGN KEY (`id_planner`) REFERENCES `planner` (`id_planner`);

--
-- Limiti per la tabella `planner`
--
ALTER TABLE `planner`
  ADD CONSTRAINT `planner_ibfk_1` FOREIGN KEY (`id_sett`) REFERENCES `settimane` (`id_sett`),
  ADD CONSTRAINT `planner_ibfk_2` FOREIGN KEY (`id_uff`) REFERENCES `uffici` (`id_uff`);

--
-- Limiti per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD CONSTRAINT `prenotazioni_ibfk_1` FOREIGN KEY (`id_planner`) REFERENCES `planner` (`id_planner`),
  ADD CONSTRAINT `prenotazioni_ibfk_2` FOREIGN KEY (`id_utn`) REFERENCES `utenti` (`id_utn`);

--
-- Limiti per la tabella `settimane`
--
ALTER TABLE `settimane`
  ADD CONSTRAINT `settimane_ibfk_1` FOREIGN KEY (`lun`) REFERENCES `giorni` (`id_gg`),
  ADD CONSTRAINT `settimane_ibfk_2` FOREIGN KEY (`mar`) REFERENCES `giorni` (`id_gg`),
  ADD CONSTRAINT `settimane_ibfk_3` FOREIGN KEY (`mer`) REFERENCES `giorni` (`id_gg`),
  ADD CONSTRAINT `settimane_ibfk_4` FOREIGN KEY (`gio`) REFERENCES `giorni` (`id_gg`),
  ADD CONSTRAINT `settimane_ibfk_5` FOREIGN KEY (`sab`) REFERENCES `giorni` (`id_gg`),
  ADD CONSTRAINT `settimane_ibfk_6` FOREIGN KEY (`dom`) REFERENCES `giorni` (`id_gg`),
  ADD CONSTRAINT `settimane_ibfk_7` FOREIGN KEY (`ven`) REFERENCES `giorni` (`id_gg`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
