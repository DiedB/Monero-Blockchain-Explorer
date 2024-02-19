CREATE TABLE `bct`.`lookup` (`pk` BINARY(32) NOT NULL , `tx_hash` BINARY(32) NOT NULL ) ENGINE = InnoDB;
ALTER TABLE `bct`.`lookup` ADD PRIMARY KEY (`pk`, `tx_hash`);
