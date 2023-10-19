CREATE DATABASE DB_MSCPC;

USE DB_MSCPC;
CREATE TABLE Usuarios (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    Contrasenia VARCHAR(256) NOT NULL,
    Nivel_Administrativo VARCHAR(20) NOT NULL
);

