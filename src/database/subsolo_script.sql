

CREATE DATABASE subsolo;
USE subsolo;
CREATE TABLE usuario (
  id_usuario        INT  PRIMARY KEY AUTO_INCREMENT,
  nome              VARCHAR(45)  NOT NULL,
  email    VARCHAR(100) NOT NULL UNIQUE,
  senha             VARCHAR(45)  NOT NULL,
  adminn         TINYINT(1)  
  
);
select * from usuario;
select * from usuario_manobras;
select * from sessoes;

CREATE TABLE bandas (
  id_banda     INT PRIMARY KEY AUTO_INCREMENT,
  nome_banda   VARCHAR(100) NOT NULL UNIQUE,
  genero       VARCHAR(45)  NULL,
  underground  TINYINT(1)   NOT NULL DEFAULT 0
 
) ;
CREATE TABLE album (
  id_album   INT PRIMARY KEY AUTO_INCREMENT,
  id_banda   INT,
  titulo     VARCHAR(100) ,
  ano        INT,
  CONSTRAINT ck_album_ano CHECK ( ano BETWEEN 1900 AND 2100),
  CONSTRAINT fk_album_bandas
    FOREIGN KEY (id_banda) REFERENCES bandas (id_banda)

);


CREATE TABLE lugar (
  id_lugar  INT PRIMARY KEY AUTO_INCREMENT,
  nome      VARCHAR(100) ,
  tipo      VARCHAR(45)  , 
  cidade    VARCHAR(45) 
);

CREATE TABLE manobras (
  id_manobra  INT PRIMARY KEY AUTO_INCREMENT,
  nome_trick  VARCHAR(45) ,
  base        VARCHAR(45)                      
);


CREATE TABLE usuario_manobras (
  id_usuario  INT NOT NULL,
  id_manobra  INT NOT NULL,
  statuss     VARCHAR (45),
  PRIMARY KEY (id_usuario, id_manobra),
  CONSTRAINT fk_usuario_manobras_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    CONSTRAINT chkSTATUSS CHECK (statuss in ('ja_faco','vou_aprender')),
  CONSTRAINT fk_usuario_manobras_manobras
    FOREIGN KEY (id_manobra) REFERENCES manobras (id_manobra)
 
) ;

-- 
CREATE TABLE sessoes (
  id_sessao   INT PRIMARY KEY AUTO_INCREMENT,
  data_sessao DATE,
  id_usuario  INT NOT NULL,
  id_lugar    INT NOT NULL,
  CONSTRAINT fk_sessoes_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
  CONSTRAINT fk_sessoes_lugar
    FOREIGN KEY (id_lugar) REFERENCES lugar (id_lugar)
    
);


CREATE TABLE sessoes_albuns (
  id_sessao  INT NOT NULL,
  id_album   INT NOT NULL,
  PRIMARY KEY (id_sessao, id_album),
  CONSTRAINT fk_sessoes_albuns_sessoes
    FOREIGN KEY (id_sessao) REFERENCES sessoes (id_sessao),
  CONSTRAINT fk_sessoes_albuns_album
    FOREIGN KEY (id_album) REFERENCES album (id_album)
    
);
CREATE TABLE sessoes_manobras (
  id_sessao   INT NOT NULL,
  id_manobra  INT NOT NULL,
  finalizado  TINYINT(1) DEFAULT 0,
  PRIMARY KEY (id_sessao, id_manobra),
  CONSTRAINT fk_sessoes_manobras_sessoes
    FOREIGN KEY (id_sessao) REFERENCES sessoes (id_sessao),
  CONSTRAINT fk_sessoes_manobras_manobras
    FOREIGN KEY (id_manobra) REFERENCES manobras (id_manobra)
);


ALTER TABLE manobras ADD categoria VARCHAR(45);
 

ALTER TABLE sessoes ADD observacoes VARCHAR(255);



INSERT INTO bandas (nome_banda, genero, underground)
VALUES ('Deftones', 'Alternative Metal', 0);
INSERT INTO bandas (nome_banda, genero, underground)
VALUES ('Descendents', 'pop punk', 0);
INSERT INTO bandas (nome_banda, genero, underground)
VALUES ('Lupe de lupe', 'rock alternativo', 1);



INSERT INTO album (id_banda, titulo, ano)
VALUES ((SELECT id_banda FROM bandas WHERE nome_banda = 'Deftones'), 'Adrenaline', 1995);

INSERT INTO album (id_banda, titulo, ano) VALUES ((SELECT id_banda FROM bandas WHERE nome_banda = 'Descendents'), 'milo goes to collage', 1982);

INSERT INTO album (id_banda, titulo, ano)  VALUES ((SELECT id_banda FROM bandas WHERE nome_banda = 'Lupe de lupe'), 'recreio', 2011);
 
 select * from album;
 
set foreign_key_checks = 0;

truncate table sessoes_manobras;
truncate table sessoes_albuns;
truncate table sessoes;
truncate table usuario_manobras;
truncate table bandas_favoritas;
truncate table skatistas_favoritos;
truncate table usuario;
truncate table lugar;
truncate table manobras;
truncate table album;

set foreign_key_checks = 1;

ALTER TABLE sessoes_manobras ADD vezes INT NOT NULL DEFAULT 0;