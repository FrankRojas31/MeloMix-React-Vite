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
    Video VARCHAR(1000) NOT NULL,
    Duracion varchar(10) NOT NULL,
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
    a.Nombre AS ArtistaNombre
FROM canciones AS c
INNER JOIN artistas AS a ON c.ArtistaId = a.Id;

