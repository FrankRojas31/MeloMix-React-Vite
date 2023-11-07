create database melomix;
use melomix;
CREATE TABLE Roles (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL,
    Descripcion TEXT
);
INSERT INTO Roles (Nombre, Descripcion)
VALUES ('Administrador', 'Acceso total al sistema');
INSERT INTO Roles (Nombre, Descripcion)
VALUES ('Usuario', 'Acceso limitado al sistema');
CREATE TABLE usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    Contrasenia VARCHAR(100) NOT NULL,
    Avatar VARCHAR(150) DEFAULT 'default_avatar.jpg' NOT NULL,
    Fecha_Creacion DATE NOT NULL,
    RolID INT NOT NULL,
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (RolID) REFERENCES Roles(Id)
);

create table artistas(
	Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Foto VARCHAR(1000) NOT NULL,
    Biografia VARCHAR(1000) NOT NULL
);

create table canciones(
	Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Caratula VARCHAR(1000) NOT NULL,
    Direccion VARCHAR(1000) NOT NULL,
    Duracion VARCHAR(100) NOT NULL,
    Video VARCHAR(1000) NOT NULL,
    ArtistaId INT NOT NULL,
    CONSTRAINT FK_Artista FOREIGN KEY (ArtistaId) REFERENCES artistas(Id)
);


create table megusta(
	UsuarioID INT,
    CancionID INT,
    PRIMARY KEY (UsuarioID, CancionID),
    CONSTRAINT FK_Usuario FOREIGN KEY (UsuarioID) REFERENCES usuarios(Id),
    CONSTRAINT FK_Cancion FOREIGN KEY (CancionID) REFERENCES canciones(Id)
);

create table historial(
	UsuarioID INT,
    CancionID INT,
    PRIMARY KEY (UsuarioID, CancionID),
    CONSTRAINT FK_Usuario_historial FOREIGN KEY (UsuarioID) REFERENCES usuarios(Id),
    CONSTRAINT FK_Cancion_historial FOREIGN KEY (CancionID) REFERENCES canciones(Id)
);

CREATE VIEW VW_Usuarios_Globales AS 
    SELECT id, Nombre, Correo, RolID FROM usuarios WHERE RolID = 2;

/* View para Tabla Normal Nivel_Administrador (Admin) */

CREATE VIEW VW_Usuarios_Administradores AS
    SELECT id, Nombre, Correo, RolID FROM usuarios WHERE RolID = 1;

CREATE VIEW VW_Artistas AS
    SELECT Id, Nombre, Foto, Biografia FROM artistas;

CREATE VIEW VW_Canciones AS
SELECT
    c.Id AS CancionId,
    c.Nombre AS CancionNombre,
    c.Caratula AS CancionCaratula,
    c.Direccion AS CancionDireccion,
    c.Video AS CancionVideo,
    c.Duracion AS CancionDuracion,
    c.ArtistaId AS ArtistaId,
    a.Nombre AS ArtistaNombre
FROM canciones AS c
INNER JOIN artistas AS a ON c.ArtistaId = a.Id;


CREATE VIEW VW_Cantidad AS
SELECT
  u.usuarios AS usuarios,
  a.administradores AS administradores,
  l.artistas AS artistas,
  d.canciones AS canciones
  FROM
  (select count(*) as usuarios from usuarios where RolID = 2) AS u,
  (select count(*) as administradores from usuarios where RolID = 1) AS a,
  (select count(*) as artistas from artistas) AS l,
  (SELECT COUNT(*) as canciones FROM canciones) AS d;

CREATE VIEW VW_MeGusta AS
SELECT
    m.UsuarioID AS UsuarioID,
    m.CancionID AS CancionID,
    u.Nombre AS UsuarioNombre,
    c.Nombre AS CancionNombre
FROM megusta AS m
INNER JOIN usuarios AS u ON m.UsuarioID = u.Id
INNER JOIN canciones AS c ON m.CancionID = c.Id;

CREATE VIEW VW_Historial AS
SELECT
    h.UsuarioID AS UsuarioID,
    h.CancionID AS CancionID,
    u.Nombre AS UsuarioNombre,
    c.Nombre AS CancionNombre
FROM historial AS h
INNER JOIN usuarios AS u ON h.UsuarioID = u.Id
INNER JOIN canciones AS c ON h.CancionID = c.Id;