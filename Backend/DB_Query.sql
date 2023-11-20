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
    Contrasenia VARCHAR(100),
    Avatar VARCHAR(150) DEFAULT '/imagenes/default_avatar.jpg' NOT NULL,
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
    ArtistaId INT NOT NULL,
    Duracion VARCHAR(100) NOT NULL,
    CONSTRAINT FK_Artista FOREIGN KEY (ArtistaId) REFERENCES artistas(Id)
);

create table megusta(
	Id INT AUTO_INCREMENT PRIMARY KEY,
	UsuarioID INT,
    CancionID INT,
    CONSTRAINT FK_Usuario FOREIGN KEY (UsuarioID) REFERENCES usuarios(Id),
    CONSTRAINT FK_Cancion FOREIGN KEY (CancionID) REFERENCES canciones(Id)
);
create table historial(
	Id INT AUTO_INCREMENT PRIMARY KEY,
	UsuarioID INT,
    CancionID INT,
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
    m.Id as Id,
    m.UsuarioID AS UsuarioID,
    m.CancionID AS CancionID,
    u.Nombre AS UsuarioNombre,
    c.Nombre AS CancionNombre,
	c.Caratula as Caratula,
    c.ArtistaId as ArtistaId,
    a.Nombre as ArtistaNombre,
    c.Duracion as Duracion
FROM megusta AS m
INNER JOIN usuarios AS u ON m.UsuarioID = u.Id
INNER JOIN canciones AS c ON m.CancionID = c.Id
INNER JOIN artistas AS a ON c.ArtistaId = a.Id;

CREATE VIEW VW_Historial AS
SELECT
    h.Id as Id,
    h.UsuarioID AS UsuarioID,
    h.CancionID AS CancionID,
    u.Nombre AS UsuarioNombre,
    c.Nombre AS CancionNombre,
    c.Caratula as Caratula,
    c.ArtistaId as ArtistaId,
    a.Nombre as ArtistaNombre,
    c.Duracion as Duracion
FROM historial AS h
INNER JOIN usuarios AS u ON h.UsuarioID = u.Id
INNER JOIN canciones AS c ON h.CancionID = c.Id
INNER JOIN artistas AS a ON c.ArtistaId = a.Id;

CREATE VIEW VW_Artistas_Con_Mas_Canciones AS
SELECT
    a.Id AS ArtistaId,
    a.Nombre AS ArtistaNombre,
    a.Foto AS ArtistaFoto,
    COUNT(c.Id) AS NumeroCanciones
FROM
    artistas AS a
LEFT JOIN canciones AS c ON a.Id = c.ArtistaId
GROUP BY
    a.Id, a.Nombre, a.Foto, a.Biografia
ORDER BY
    NumeroCanciones DESC;
    
CREATE VIEW VW_Canciones_Con_Mas_MeGusta AS
SELECT
    c.Id AS CancionId,
    c.Nombre AS CancionNombre,
    c.Caratula AS CancionCaratula,
    c.Duracion AS CancionDuracion,
    c.ArtistaId AS ArtistaId,
    a.Nombre AS ArtistaNombre,
    COUNT(m.CancionID) AS NumeroMeGusta
FROM
    canciones AS c
LEFT JOIN megusta AS m ON c.Id = m.CancionID
INNER JOIN artistas AS a ON c.ArtistaId = a.Id
GROUP BY
    c.Id, c.Nombre, c.Caratula, c.Direccion, c.Video, c.Duracion, c.ArtistaId, a.Nombre
ORDER BY
    NumeroMeGusta DESC;

INSERT INTO artistas (Nombre, Foto, Biografia) VALUES
('La Maravillosa Orquesta del Alcohol', 'https://images.ecestaticos.com/7ZjJivowE_w4XV51wbM4kRRWkN4=/0x0:2272x1515/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Ff69%2Ff67%2F50a%2Ff69f6750a202a5e03f446a7eb78455f4.jpg', 'La Maravillosa Orquesta del Alcohol'),
('El cuarteto de Nos', 'https://es.rollingstone.com/wp-content/uploads/2022/11/APERTURA-WEB-Cuarteto-E-GENTILEZA-DE-Karin-Topo18118-1color-1.jpg', 'El Cuarteto de Nos'),
('Aurora', 'https://www.clashmusic.com/wp-content/uploads/2022/04/aurora-1632412929.693044.2560x1440.jpg', 'Aurora Aksnes'),
('a-ha', 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisa/AQXHIBG2LBCKBAZNPWZMTQ6P7E.jpg', 'A-ha'),
('AC DC', 'https://images.ecestaticos.com/1n8yNGPOG60rrgy9pbgRMtNls2A=/135x8:2152x1514/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F906%2Fa1a%2F498%2F906a1a49814f8fad9e920d0622380882.jpg', 'AC/DC'),
('Adele', 'https://ca-times.brightspotcdn.com/dims4/default/1a071c7/2147483647/strip/true/crop/4130x2753+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F20%2F97%2F8efe5252454bb8e81b911ef18f17%2Fbritain-brit-awards-2022-arrivals-05121.jpg', 'Adele'),
('Alela Diane', 'https://www.goldflakepaint.co.uk/wp-content/uploads/2017/11/Alela-Diane-1-credit-Jaclyn-Campanaro.jpg', 'Alela Diane'),
('The Circus', 'https://i.scdn.co/image/ab67616d0000b273536814bc7f89e3721978423b', 'The Circus (canción de Erasure)'),
('Emma Duncan', 'https://virtualpiano.net/wp-content/uploads/2020/10/Emma-Duncan-Artist-on-Virtual-Piano-Play-Piano-Online.jpg', 'Música folclórica'),
('Rolling Stones', 'https://es.rollingstone.com/wp-content/uploads/2022/06/Rolling-Stones-celebrara-su-60-aniversario-con-la-docuserie-My-Life-as-a-Rolling-Stone.jpg', 'The Rolling Stones'),
('The Kinks', 'https://upload.wikimedia.org/wikipedia/commons/8/88/Helmfrid-sofa4_Touched.JPG', 'The Kinks'),
('Lady Gaga', 'https://ca-times.brightspotcdn.com/dims4/default/29bc2c3/2147483647/strip/true/crop/1000x667+0+42/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fwww.trbimg.com%2Fimg-5c0be5c4%2Fturbine%2Fla-hp-lady-gaga-4x3-rotato-1-20181208', 'Lady Gaga'),
('Los Bunkers', 'https://images.squarespace-cdn.com/content/v1/5a39684364b05fa8570b6896/38feaf29-145f-43c2-9570-3cdf952b33f2/LB.png', 'Los Bunkers'),
('Bee Gees', 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Bee_Gees_1977.JPG', 'Bee Gees'),
('Boney M', 'https://www.biografiasyvidas.com/biografia/b/fotos/boney_m.jpg', 'Boney M.'),
('Shaggy', 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Shaggy.jpg', 'Shaggy'),
('Delta Rae', 'https://m.media-amazon.com/images/M/MV5BMDViZDYxMzktY2Y0MS00ZDJhLTg3NzAtMmE3ZmE5YjQ0Y2IzXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg', 'Delta Rae'),
('Bruno Mars', 'https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd', 'Bruno Mars'),
('Jack Stauber', 'https://images.mubicdn.net/images/cast_member/828037/cache-782925-1652814942/image-w856.jpg', 'Jack Stauber'),
('Red Hot Chili Peppers', 'https://es.rollingstone.com/wp-content/uploads/2022/04/Las-40-mejores-canciones-de-los-Red-Hot-Chili-Peppers.jpg', 'Red Hot Chili Peppers'),
('Katy Perry', 'https://cdn-3.expansion.mx/dims4/default/04d99b8/2147483647/strip/true/crop/1200x800+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F0d%2Fe6%2F6ded5f95406b8177bbfdd678ef54%2Fkaty-perry-1.jpg', 'Katy Perry'),
('TheWeeknd', 'https://forbes.es/wp-content/uploads/2023/01/pheWeeknd.jpg', 'The Weeknd'),
('Fall Out Boy', 'https://www.billboard.com/wp-content/uploads/2022/07/fall-out-boy-2022-billboard-1548.png', 'Fall Out Boy'),
('Chopin', 'https://musicaclasica.com.ar/wp-content/uploads/chopin_2.jpg', 'Frédéric Chopin'),
('Chuck Berry', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Chuck_Berry_Midnight_Special_1973.JPG/220px-Chuck_Berry_Midnight_Special_1973.JPG', 'Chuck Berry'),
('Frank Sinatra', 'https://media.gq.com.mx/photos/5f481c29ef6115112e88be09/1:1/w_2400,h_2400,c_limit/GettyImages-155465006-frank%20sinatra.jpg', 'Frank Sinatra'),
('Blue Swede', 'https://cdns-images.dzcdn.net/images/artist/dcc56a0b75626c0a52f8a50a34a9a12d/500x500.jpg', 'Blue Swede'),
('Bob Dylan', 'https://rialta.org/wp-content/uploads/2021/02/Bob-Dylan.jpg', 'Bob Dylan'),
('Earth Wind Fire', 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-226972-GettyImages-74269926.jpg', 'Earth, Wind & Fire'),
('Mago de OZ', 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/WYSR6IGXERA2JN3UQJDHZPE3LI.jpg', 'Mägo de Oz'),
('Beethoven', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg', 'Ludwig van Beethoven'),
('Diego Verdaguer', 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Diego_Verdaguer_en_junio_de_2016.jpg', 'Diego Verdaguer'),
('Duffy', 'https://m.media-amazon.com/images/I/91iyD71ZayL._AC_UF894,1000_QL80_.jpg', 'Duffy'),
('Florence', 'https://i.scdn.co/image/ab67616d00001e02ffe27015735d063debcd8764', 'Florence and the Machine'),
('Aerosmith', 'https://udiscover.mx/cdn/shop/articles/Lead_Press_Photo.jpg?v=1687817061', 'Aerosmith'),
('David Allan Coe', 'https://upload.wikimedia.org/wikipedia/commons/8/89/David_Allan_Coe.jpg', 'David Allan Coe'),
('David Bowie', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/David-Bowie_Chicago_2002-08-08_photoby_Adam-Bielawski-cropped.jpg/250px-David-Bowie_Chicago_2002-08-08_photoby_Adam-Bielawski-cropped.jpg', 'David Bowie'),
('Soda Stereo', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/CeratiAlbertiBosio.jpg', 'Soda Stereo'),
('Elton John', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Glasto2023_%28419_of_468%29_%2853009098414%29_%28cropped%29.jpg/640px-Glasto2023_%28419_of_468%29_%2853009098414%29_%28cropped%29.jpg', 'Elton John'),
('Elvin Bishop', 'https://lastfm.freetls.fastly.net/i/u/ar0/70202862244446189eef133ed8d28204.jpg', 'Elvin Bishop'),
('Elvis Presley', 'https://gatopardo.com/wp-content/uploads/2020/02/horz-elvis-presley.jpg', 'Elvis Presley'),
('Eminem', 'https://images.hola.com/imagenes/actualidad/20210104182034/eminem-hijas-adoptivas/0-906-625/eminem-t.jpg', 'Eminem'),
('Elphomega', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Elphomega.jpg/1200px-Elphomega.jpg', 'Elphomega'),
('Dean Martin', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dean_Martin_-_publicity.JPG/220px-Dean_Martin_-_publicity.JPG', 'Dean Martin'),
('Gnarls Barkley', 'https://ew.com/thmb/De2i5R9Y1sEzA7flmwP1jz3xO2I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gnarls-barkley-1-aac5ce3b5b364c0fbdc843244da03a52.jpg', 'Gnarls Barkley'),
('Queen', 'https://i.discogs.com/XztqBh9zPrHpafbPSTRKrSwvTTVZ1JzOhy0I-tyTWo0/rs:fit/g:sm/q:90/h:600/w:595/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTgxMDEz/LTEyMTE5Nzg2NTku/anBlZw.jpeg', 'Queen'),
('Taylor Swift', 'https://image.europafm.com/clipping/cmsimages02/2023/06/20/45AFA12A-492E-4E60-8B0F-47B42223E90E/taylor-swift-gira-the-eras-tour-nashville-eeuu_103.jpg?crop=3556,2667,x0,y0&width=1200&height=900&optimize=low&format=webply', 'Taylor Swift'),
('Gorillaz', 'https://media.revistagq.com/photos/5ca5f4d3267a322393724870/4:3/w_1864,h_1398,c_limit/gorillaz_425.jpg', 'Gorillaz'),
('Skillet', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Skillet_Press_Photo_001.jpg', 'Skillet'),
('Sumika', 'https://www.alertageekchile.cl/wp-content/uploads/2023/03/sumika.jpg', 'sumika'),
('Creedence Clearwater Revival', 'https://media.newyorker.com/photos/62fbc1ecc764cc59d08a2763/master/pass/Cantwell-Creedence.jpg', 'Creedence Clearwater Revival'),
('Foster The People', 'https://www.binaural.es/wp-content/uploads/2014/01/fos.jpg', 'Foster the People'),
('Michael Jackson', 'https://www.biografiasyvidas.com/biografia/j/fotos/jackson_michael_1.jpg', 'Michael Jackson'),
('Lynyrd Skynyrd', 'https://muzikalia.com/wp-content/uploads/2020/06/Lynyrd-Skynyrd-1.jpg', 'Lynyrd Skynyrd'),
('Daft Punk', 'https://hips.hearstapps.com/hmg-prod/images/daft-punk-resized-646358077343b.jpg?crop=1xw:0.75xh;center,top&resize=1200:*', 'Daft Punk'),
('Louis Armstrong', 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Louis_Armstrong_restored.jpg', 'Louis Armstrong'),
('León Larregui', 'https://prensa.apodaca.com.mx/wp-content/uploads/2023/06/leon_larregui.jpg', 'León Larregui'),
('The Lumineers', 'https://media.npr.org/assets/img/2019/09/11/lumineers-grab_wide-62975324b77ded6fdd5b514622023632b80797cd.jpg', 'The Lumineers'),
('Luis Miguel', 'https://luismigueloficial.com/themes/lm/assets/images/1990_s_2_mov.jpg', 'Luis Miguel'),
('Lágrimas De Sangre', 'https://www.mondosonoro.com/wp-content/uploads/2019/02/Lagrimas-de-Sangre-entrevista.jpg', 'Lágrimas de Sangre'),
('Mountain', 'https://www.goldminemag.com/.image/t_share/MTY4NDE5MDIyMzQ0NDMwNzgw/image-placeholder-title.jpg', 'Mountain (banda)'),
('Pharrell Williams', 'https://es.rollingstone.com/wp-content/uploads/2021/12/PR-Pharrell-Williams.jpg', 'Pharrell Williams'),
('Miranda', 'https://cdn.smehost.net/sonymusices-45pressprod/wp-content/uploads/2018/10/foto_de_miranda-2.jpg', 'Miranda!'),
('Fleetwood Mac', 'https://i.scdn.co/image/ab6761610000e5ebc8752dd511cda8c31e9daee8', 'Fleetwood Mac'),
('Nico Vega', 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Nico_Vega.jpg', 'Nico Vega'),
('Selena', 'https://s1.abcstatics.com/media/play/2020/12/03/selena-netflix-kBnC--620x349@abc.jpg', 'Selena'),
('The Beatles', 'https://s.france24.com/media/display/6b13077e-e07b-11e9-b12e-005056a98db9/w:1280/p:16x9/portada_beatles_0.jpg', 'The Beatles'),
('My Chemical Romance', 'https://malaracha.com/cdn/shop/articles/My_Chemical_Romance.jpg?v=1667231902', 'My Chemical Romance'),
('Mac DeMarco', 'https://www.sopitas.com/wp-content/uploads/2015/12/macdemarco.jpg', 'Mac DeMarco'),
('Tiny Tim', 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Tiny_Tim_in_1969.jpg', 'Tiny Tim (cantante)'),
('Santana', 'https://yt3.googleusercontent.com/ytc/APkrFKaahJsLbVT_7EWOVE-PcNHIa3eAUCLHDipLuweJ_w=s900-c-k-c0x00ffffff-no-rj', 'Santana (banda)'),
('Alejandro Fernández', 'https://i.discogs.com/wAcWCYi25kVRwdVYOCiP-vfieJJcBsmlt1OpmbhXryY/rs:fit/g:sm/q:90/h:597/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTQ5MzU3/Mi0xNDMyMjY1NDY1/LTc2MTMuanBlZw.jpeg', 'Alejandro Fernández'),
('Marvin Gaye', 'https://upload.wikimedia.org/wikipedia/commons/0/03/Marvin_Gaye_%281973_publicity_photo%29.jpg', 'Marvin Gaye'),
('Porta', 'https://www.iamrap.es/media/iamrap/images/2023/06/30/2023063014073170666.png', 'Porta'),
('Paul Anka', 'https://prod-images.tcm.com/Master-Profile-Images/PaulAnka.jpg', 'Paul Anka'),
('Coldplay', 'https://i.scdn.co/image/ab6761610000e5eb989ed05e1f0570cc4726c2d3', 'Coldplay'),
('Leo Dan', 'https://delayerfm.com/media/k2/items/cache/af2ef6a0e2c9c528b09655df79f3b312_Generic.jpg', 'Leo Dan'),
('Willie Nelson', 'https://images.theconversation.com/files/522719/original/file-20230424-26-r6a7i1.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C5841%2C3987&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip', 'Willie Nelson'),
('Chuck Berry', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chuck_Berry_1957.jpg/1200px-Chuck_Berry_1957.jpg', 'Chuck Berry'),
('Eric Clapton', 'https://gatopardo.com/wp-content/uploads/2020/04/eric-clapton-gatopardo-2.jpg', 'Eric Clapton'),
('Eurielle', 'https://eurielle.com/wp-content/uploads/2021/12/Album-Lady-In-Waiting.jpg', 'Urielle'),
('Cat Stevens', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Cat_Stevens_%281972%29.png/250px-Cat_Stevens_%281972%29.png', 'Cat Stevens'),
('Green Day', 'https://as01.epimg.net/epik/imagenes/2020/09/01/portada/1598954779_668010_1598959672_noticia_normal_recorte1.jpg', 'Green Day'),
('Guns N Roses', 'https://www.udiscovermusica.com/wp-content/uploads/sites/7/2022/10/Guns-N-Roses-GettyImages-1201731181.jpg', 'Guns N Roses'),
('Al Bowlly', 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Bowlly_small.jpg', 'Al Bowlly'),
('Sissor sisters', 'https://i.discogs.com/5WyVmLkMbEZLSwtQytnBZnZwe-l9S9K7Q1iQvFbrs1I/rs:fit/g:sm/q:90/h:450/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTUxODg4/LTE0OTQzNjU1NDQt/OTMwOS5qcGVn.jpeg', 'Scissor Sisters'),
('Whitey Morgan', 'https://yt3.googleusercontent.com/ytc/APkrFKa50F4uPIdPsddTq9d5mPPHPjHwo7YbAF4lsJkkyQ=s900-c-k-c0x00ffffff-no-rj', 'Whitey Morgan and the 78s'),
('Imagine Dragons', 'https://i.scdn.co/image/ab6761610000e5eb920dc1f617550de8388f368e', 'Imagine Dragons'),
('Spacehog', 'https://tigermedianet.com/wp-content/uploads/2023/03/Spacehog-Feature.png', 'Spacehog'),
('Jackson 5', 'https://lastfm.freetls.fastly.net/i/u/ar0/52d91670edc8f74b6216f0e81a4eb034.jpg', 'The Jackson 5'),
('Jim Croce', 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Jim_Croce_publicity_portrait_ABC_Records_%28cropped%29.jpg', 'Jim Croce'),
('John Denver', 'https://cdn.britannica.com/04/186104-050-178E0A6F/John-Denver-1975.jpg', 'Jim Croce'),
('KeSha', 'https://www.rollingstone.com/wp-content/uploads/2023/01/Kesha-New-Music.jpg?w=1581&h=1054&crop=1', 'Kesha'),
('Cavetown', 'https://i0.wp.com/qburgh.com/wp-content/uploads/2022/04/Cavetown-Pittsburgh.png?fit=962%2C626&ssl=1', 'Cavetown'),
('Fools Garden', 'https://i.scdn.co/image/ab6761610000e5ebc3f03a01c6b8fd8d957865d5', 'Fools Garden'),
('Maroon 5', 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2015/07/19/14372931230978.jpg', 'Maroon 5'),
('Electric Ligth Orchestra', 'https://www.rockaxis.com/img/newsList/96418_articulos.jpg', 'Electric Light Orchestra'),
('Beastie Boys', 'https://i.scdn.co/image/705bcd56dc5dbf9ebc578a3ba8094e6d622862c2', 'Beastie Boys'),
('The Bangles', 'https://cdns-images.dzcdn.net/images/artist/ce66351e244a0778643138ec2471be3f/500x500.jpg', 'The Bangles'),
('War', 'https://www.cincinnati.com/gcdn/-mm-/ec2cb94ebc4481fa9ecfddd5c1c23ccb8af806fb/c=364-0-3295-1656/local/-/media/2016/11/14/Cincinnati/Cincinnati/636147201757204825-2016-WAR-group-cropped.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp', 'War (banda)'),
('Johnny Tillotson', 'https://i.discogs.com/C8baG54nSI0I1PFQTzk1LDr-SfQ_MurKJrGetRG0Mls/rs:fit/g:sm/q:90/h:531/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTIyOTE4/Ni0xNjQ1MTYxNTQx/LTkzODQuanBlZw.jpeg', 'Johnny Tillotson'),
('DMX', 'https://i0.wp.com/rapealo.com/wp-content/uploads/2021/10/dmx3.jpg?resize=797%2C797&ssl=1', 'DMX (rapero)'),
('Lesley Gore', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Lesley_Gore.jpg/800px-Lesley_Gore.jpg', 'Lesley Gore'),
('Rayden', 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2023/07/07/16887090465204.jpg', 'Rayden (rapero)'),
('Redbone', 'https://cdns-images.dzcdn.net/images/artist/d5c2ed435eb99a86314ad16e82548157/500x500.jpg', 'Redbone (band)'),
('Scatman', 'https://www.orrorea33giri.com/wp-content/uploads/2017/05/Scatman-John-Discografia-Scatman-John.jpg', 'Scatman John'),
('Rusted Root', 'https://i.scdn.co/image/1443d8a204081270c9c93f31cc81b2e0c0990796', 'Rusted Root'),
('Huey Lewis', 'https://variety.com/wp-content/uploads/2020/02/shutterstock_editorial_10461114b-e1580787213664.jpg', 'Huey Lewis and the News'),
('The Runaways', 'https://www.rockandpop.cl/wp-content/uploads/2020/08/392109f77e3ed5652b22260a8e171070.jpg', 'The Runaways'),
('DragonForce', 'https://akamai.sscdn.co/uploadfile/letras/fotos/5/3/c/1/53c169ed85b2a02711a23d0a34371a5d.jpg', 'DragonForce'),
('Aimer', 'https://somoskudasai.com/wp-content/uploads/2022/03/Aimer-bb-japan-2021-billboard-1548-1024x677.jpg', 'Aimer'),
('Vicente Fernández', 'https://cdn-p.smehost.net/sites/a8928da38df6414aae98564041b07ae0/wp-content/uploads/2016/09/Vicente-Fernandez.jpg', 'Vicente Fernández'),
('Radiohead', 'https://c.files.bbci.co.uk/B499/production/_107333264_fb03c957-03e2-456e-b184-995995af2dd0.jpg', 'Radiohead');

INSERT INTO canciones(Nombre, caratula, Direccion, Video, ArtistaId, Duracion) VALUES 
('1932', 'caratula', 'https://drive.google.com/uc?id=1uk8Pu8817wMewe4zWmkDJvz1IRIrWu44', '1932 - La Maravillosa Orquesta del Alcohol',1,'3:00'),
('21 De Septiembre', 'caratula', 'https://drive.google.com/uc?id=1PZEU1VnSp6AwtyEDE-Wjrby8e5FnCy1u', '21 De Septiembre - El cuarteto de Nos',2,'3:56'),
('A Potion For Love', 'caratula', 'https://drive.google.com/uc?id=1WhuEqQMJD8yDzpCX4sy-_MqyGuHVYfE0', 'A Potion For Love - AURORA',3,'3:36'),
('Take On Me', 'caratula', 'https://drive.google.com/uc?id=1wcjvGbBSZ0BxGctJvHRJ8MTSwDAibAtx', 'Take On Me - a-ha',4,'3:49'),
('Back in black', 'caratula', 'https://drive.google.com/uc?id=13yeLACPbg_wU5gDepSJ_MXuGp3nd6uTa', 'Back in black - AC DC',5,'4:15'),
('Highway to hell', 'caratula', 'https://drive.google.com/uc?id=1mqJl4_htqZtB-e4jB7cLGkEVqGLWzr9d', 'Highway to hell - AC DC',5,'3:28'),
('Thunderstruck', 'caratula', 'https://drive.google.com/uc?id=1Ud27_YxusY8dQioDLRrVRRX-7A_6Qpab', 'Thunderstruck - AC DC',5,'5:01'),
('Hello', 'caratula', 'https://drive.google.com/uc?id=1j1j5GbN_1xJG7bhVDEGkuc1IzlyAxRbR', 'Hello - Adele',6,'4:56'),
('Rolling in the Deep', 'caratula', 'https://drive.google.com/uc?id=1o_3DZFU6U-OMJ_-mQR9jIld7h5PvKamP', 'Rolling in the Deep - Adele',6,'3:49'),
('Age Old Blue', 'caratula', 'https://drive.google.com/uc?id=16wRr1byq3089loKHf_WQA30CquOWhwVQ', 'Age Old Blue - Alela Diane',7,'3:59'),
('Al Cielo No', 'caratula', 'https://drive.google.com/uc?id=170Hx_PuyBCW4hTgvq99s-U4ZyivqjRQQ', 'Al Cielo No - El cuarteto de Nos',2,'3:35'),
('Alcohol', 'caratula', 'https://drive.google.com/uc?id=1uk8Pu8817wMewe4zWmkDJvz1IRIrWu44', 'Alcohol - The Circus',8,'5:13'),
('Algo mejor que hacer', 'caratula', 'https://drive.google.com/uc?id=18adXM40wjg1d80IE-I0LuSig7uZhN0Wg', 'Algo mejor que hacer - El cuarteto de Nos',2,'3:21'),
('Angel', 'caratula', 'https://drive.google.com/uc?id=1yhobz5g5NM7lWU1vzcWsZxWV2ud9XwE-', 'Angel - Emma Duncan',9,'2:38'),
('Angie', 'caratula', 'https://drive.google.com/uc?id=1DkDrxyFbEQg-rTH8EOJUNUAn_QVDtVwK', 'Angie - Rolling Stones',10,'3:31'),
('Apeman', 'caratula', 'https://drive.google.com/uc?id=1LS644vS4E6GQMtFlAF-x9U9gZTB0MG47', 'Apeman - The Kinks',11,'3:53'),
('Apocalipsis Zombi', 'caratula', 'https://drive.google.com/uc?id=1WHMp-AfKVg-t6Y6Ay7i9bhJyJzTHd6Gh', 'Apocalipsis Zombi - El cuarteto de Nos',2,'3:35'),
('Así Soy Yo', 'caratula', 'https://drive.google.com/uc?id=1qpzM2OT6aBri61TjngWvbvRH-grDoaxE', 'Así Soy Yo - El cuarteto de Nos',2,'3:45'),
('Bad Romance', 'caratula', 'https://drive.google.com/uc?id=1WD_HEWksweumJ38P0RZLIZ_Yh37hk3Ja', 'Bad Romance - Lady Gaga',12,'4:55'),
('Bailando Solo', 'caratula', 'https://drive.google.com/uc?id=11CVq3iAHTtkEI22RidRi9do2puuGDRQL', 'Bailando Solo - Los Bunkers',13,'4:28'),
('Ballbreaker', 'caratula', 'https://drive.google.com/uc?id=19S1b6KiSh0G9SwMnVO2FVvF99CvyTkXP', 'Ballbreaker - AC DC',5,'4:30'),
('How Deep Is Your Love', 'caratula', 'https://drive.google.com/uc?id=1Rea59nLx6OFVYyu4VsBg0-69ViNB2OLq', 'How Deep Is Your Love - Bee Gees',14,'3:59'),
('More Than a Woman', 'caratula', 'https://drive.google.com/uc?id=1rrgtFHlNNPwX36M3sCE_UxZg3YxkpwM3', 'More Than a Woman - Bee Gees',14,'3:17'),
('Stayin Alive', 'caratula', 'https://drive.google.com/uc?id=10hgOjJGPYVzUyh2ZX3DE6bsirKaG1VBN', 'Stayin Alive - Bee Gees',14,'4:09'),
('Billie Jean', 'caratula', 'https://drive.google.com/uc?id=1n1Kk-DJ1OGQ-BlGu5vA_l_EY7fz6oqHU', 'Billie Jean - Michael Jackson',53,'4:54'),
('Blue Moon', 'caratula', 'https://drive.google.com/uc?id=12OjFWRncFhvq1-xZTHzWIqXpLqZ_4jDy', 'Blue Moon - Frank Sinatra',26,'2:51'),
('Hooked on a Feeling', 'caratula', 'https://drive.google.com/uc?id=15twgzScOiufJwFDQxsPsB6W6P3atZnUX', 'Hooked on a Feeling - Blue Swede',27,'2:47'),
('Blowin in the Wind', 'caratula', 'https://drive.google.com/uc?id=1Jd6f-vB3AL556AM1AJW0e9B8EkcFRApy', 'Blowin in the Wind - Bob Dylan',28,'2:50'),
('Gotta Go', 'caratula', 'https://drive.google.com/uc?id=1DMMpUYxrI_R1lgqvm1shWXHWD-rj9vNt', 'Gotta Go - Boney M',15,'4:03'),
('Rasputin', 'caratula', 'https://drive.google.com/uc?id=1hdzxpF1Mu2X4tgADb05I22F7j3hwcRwI', 'Rasputin - Boney M',15,'4:30'),
('Boombastic', 'caratula', 'https://drive.google.com/uc?id=1_PfInjJS8fK0498eZ2_la4JWrQJfvl8B', 'Boombastic - Shaggy',16,'4:09'),
('Bottom of the River', 'caratula', 'https://drive.google.com/uc?id=1QWH4LzkO3tGkxxhPeMJJcBr8Z8YQzZaP', 'Bottom of the River - Delta Rae',17,'3:22'),
('The Lazy Song', 'caratula', 'https://drive.google.com/uc?id=1qmu6N7vAbrQHCM0fO-jNNttT9zxE4htq', 'The Lazy Song - Bruno Mars',18,'3:19'),
('Treasure', 'caratula', 'https://drive.google.com/uc?id=1M4c7fvqDk90cIC6Ge4mS2XmP6e93nCGd', 'Treasure - Bruno Mars',18,'3:11'),
('Buttercup', 'caratula', 'https://drive.google.com/uc?id=1yuZ-Ug5NUwXgMwpACS2qLnyJtTsafARD', 'Buttercup - Jack Stauber',19,'3:28'),
('By The Way', 'caratula', 'https://drive.google.com/uc?id=1zVqENiE7CuTJoCeUD3XixzzL32XVKvlk', 'By The Way - Red Hot Chili Peppers',20,'3:37'),
('California Gurls', 'caratula', 'https://drive.google.com/uc?id=1x9AYoO1WGxh3ANqiaLk63Q-qdaqlAtx3', 'California Gurls - Katy Perry',21,'3:40'),
('Cant Feel My Face', 'caratula', 'https://drive.google.com/uc?id=1F8Z_klIvR-vijv_mgXZR54RfX_rCDaQu', 'Cant Feel My Face - TheWeeknd',22,'3:38'),
('Cant Stop', 'caratula', 'https://drive.google.com/uc?id=1_wsl0p_jNZsKw6La5dDMsKBlNFrcLw0H', 'Cant Stop - Red Hot Chili Peppers',20,'4:37'),
('Centuries', 'caratula', 'https://drive.google.com/uc?id=1ltN5DVZiSmYd77a0-PwQohGOG8_Ze0LP', 'Centuries - Fall Out Boy',23,'3:48'),
('Nocturne op9 No2', 'caratula', 'https://drive.google.com/uc?id=1WIlwpAwBrQ4jCgS6h5dYiyB8vz1pDKBY', 'Nocturne op9 No2 - Chopin',24,'4:29'),
('Johnny B Goode', 'caratula', 'https://drive.google.com/uc?id=1Yzj-huGgtyk5j1-sqs1TKiPnnCtlk0og', 'Johnny B Goode - Chuck Berry',25,'2:40'),
('Cinturón Gris', 'caratula', 'https://drive.google.com/uc?id=1PcaY9epw-F2jWAZMYAyAmn0SIzDOv1Qg', 'Cinturón Gris - El cuarteto de Nos',2,'3:45'),
('The Scientist', 'caratula', 'https://drive.google.com/uc?id=1hfMF5l6s3XBgO_CEuF8C-3qRojs6TlVO', 'The Scientist - Coldplay',76,'4:25'),
('Yellow', 'caratula', 'https://drive.google.com/uc?id=1FVLbnR5Zz2XmnSMfjN-2O-5cNQNV2Fqs', 'Yellow - Coldplay',76,'4:32'),
('Come Fly With Me', 'caratula', 'https://drive.google.com/uc?id=1B7aw0IT5b-c9YwZV7TZCqR38IZMA4rtG', 'Come Fly With Me - Frank Sinatra',26,'3:13'),
('Como Te Extraño Mi Amor', 'caratula', 'https://drive.google.com/uc?id=1DuxYsc104OlGaZf529dlExKix1nYu0Ik', 'Como Te Extraño Mi Amor - Leo Dan',77,'3:00'),
('Have You Ever Seen The Rain', 'caratula', 'https://drive.google.com/uc?id=1_KzcDVuyyKeLAnc5feCkO6In9cOENbvz', 'Have You Ever Seen The Rain - Creedence Clearwater Revival',51,'2:45'),
('Cruel Cruel World', 'caratula', 'https://drive.google.com/uc?id=167FtFskTIWaFgs1CyjvYa-Yp78Zxq152', 'Cruel Cruel World - Willie Nelson',78,'4:26'),
('Cuando Sea Grande', 'caratula', 'https://drive.google.com/uc?id=1wecHBfFng6D5UPX3GTNNqf6KdgiqHd6U', 'Cuando Sea Grande - El cuarteto de Nos',2,'4:12'),
('Nada Es Gratis En La Vida', 'caratula', 'https://drive.google.com/uc?id=1oO92Fopb3VR_Gx-ZE0Lqkt-OV2edX1u-', 'Nada Es Gratis En La Vida - El cuarteto de Nos',2,'2:39'),
('Cure For Me', 'caratula', 'https://drive.google.com/uc?id=1yXlbn4k3EsYksW7XkyqQTrdx225Uhad1', 'Cure For Me - AURORA',3,'3:19'),
('Cómo pasa el tiempo', 'caratula', 'https://drive.google.com/uc?id=1oMjokxLj1Y8vMJBaPAPLtIN7kw4Jsq9e', 'Cómo pasa el tiempo - El cuarteto de Nos',2,'4:20'),
('Daddy Cool', 'caratula', 'https://drive.google.com/uc?id=1QsNOMz0MyGjNjnzTBrea2AmdEMRrxGxF', 'Daddy Cool - Boney M',15,'3:25'),
('Dance Dance', 'caratula', 'https://drive.google.com/uc?id=1_HyUV3bhuC4u5CsLdegJDzLkvjgkYNlG', 'Dance, Dance - Fall Out Boy',23,'3:00'),
('The Fish Arent Biting Today', 'caratula', 'https://drive.google.com/uc?id=12Z6HTkFEafR9vKUVlt6VntluvFDwlhe3', 'The Fish Arent Biting Today - David Allan Coe',36,'3:10'),
('Moonage Daydream', 'caratula', 'https://drive.google.com/uc?id=1a5OqF2JxIBgM9Rmbo6wkS0K5F3u29IQ6', 'Moonage Daydream - David Bowie',37,'3:03'),
('De Música Ligera', 'caratula', 'https://drive.google.com/uc?id=1dP0euri0BSwtKFJDaeBR19j47Aw-My8x', 'De Música Ligera - Soda Stereo',38,'3:30'),
('Beethoven Virus', 'caratula', 'https://drive.google.com/uc?id=1pNV0fB93kToVwrcfcLmiWP9vOXA0mplw', 'Beethoven Virus - Diana Boncheva',31,'3:40'),
('La Ladrona', 'caratula', 'https://drive.google.com/uc?id=15cf4u5raWCe2sCudmMyVoWZlRh1vMGa1', 'La Ladrona - Diego Verdaguer',32,'2:59'),
('Dirty Deeds Done Dirt Cheap', 'caratula', 'https://drive.google.com/uc?id=1tzeaygtCctCq62KVK1G8TquHEKuaup4V', 'Dirty Deeds Done Dirt Cheap - AC DC',5,'3:51'),
('Distant Dreamer', 'caratula', 'https://drive.google.com/uc?id=1a9-ztU41XuRWE5OWEPzlU_HU40VllG4m', 'Distant Dreamer - Duffy',33,'5:06'),
('Dog Days Are Over', 'caratula', 'https://drive.google.com/uc?id=1le-dYXuapvU2y1XVGZ_NTiVN0vnULM8w', 'Dog Days Are Over - Florence',34,'3:44'),
('Dream On', 'caratula', 'https://drive.google.com/uc?id=1Gl8ugYIXxxNx7_3fFktJksXG_l0bwdEZ', 'Dream On - Aerosmith',35,'4:28'),
('Dry Grass and Shadows', 'caratula', 'https://drive.google.com/uc?id=1Kd2YUOm7umJm5M_TWiU33xdIXCOnwjrN', 'Dry Grass and Shadows - Alela Diane',7,'3:11'),
('Dude Looks Like A Lady', 'caratula', 'https://drive.google.com/uc?id=1rBHKRdT4dC5EsPtJIADiDjt3x3orPwNC', 'Dude Looks Like A Lady - Aerosmith',35,'4:26'),
('Earth Angel', 'caratula', 'https://drive.google.com/uc?id=1yhobz5g5NM7lWU1vzcWsZxWV2ud9XwE-', 'Earth Angel - Marvin Berry',79,'2:59'),
('Lets Groove', 'caratula', 'https://drive.google.com/uc?id=1QKYc-9lXp8VfxVx1u_rd_97bqWt4hnWf', 'Lets Groove - Earth Wind Fire',29,'3:55'),
('El aprendiz', 'caratula', 'https://drive.google.com/uc?id=1mZs_Pny23pD2mA73negcT2gWZ53lLGwY', 'El aprendiz - El cuarteto de Nos',2,'3:56'),
('El Cantar de la Luna Oscura', 'caratula', 'https://drive.google.com/uc?id=1y15LzLAab6nyNp_MiREWnNRT06CO9XKU', 'El Cantar de la Luna Oscura - Mago de OZ',30,'5:14'),
('El Día Que Artigas Se Emborrachó', 'caratula', 'https://drive.google.com/uc?id=1EOUCrgJHVc0GYMdq6VX7DW-ZafHa3xnw', 'El Día Que Artigas Se Emborrachó - El cuarteto de Nos',2,'2:53'),
('El hijo de Hernández', 'caratula', 'https://drive.google.com/uc?id=1lCP5EiQDILGzh3SCbHtHLQ4LKsaFOZfE', 'El hijo de Hernández - El cuarteto de Nos',2,'4:20'),
('El lado soleado de la calle', 'caratula', 'https://drive.google.com/uc?id=1MA4ucscexCiMWbsZAvuSu-rA8sz2fMkC', 'El lado soleado de la calle - El cuarteto de Nos',2,'4:10'),
('SOL DE SABADO LLUVIA DE DOMINGO', 'caratula', 'https://drive.google.com/uc?id=1osy9GdL8a1N5QRnMqRA-7L8UtJvdw78j', 'SOL DE SABADO, LLUVIA DE DOMINGO - ELPHOMEGA ',43,'3:13'),
('Dont Go Breaking My Heart', 'caratula', 'https://drive.google.com/uc?id=19bpc6PPModZQvy3CVaAOZ7l_pyCtdAsx', 'Dont Go Breaking My Heart - Elton John',39,'4:16'),
('Fooled Around and Fell in Love', 'caratula', 'https://drive.google.com/uc?id=1rZ2VTFXbX8ffxov_AtQilRBIGE0SgTFd', 'Fooled Around and Fell in Love - Elvin Bishop',40,'1:39'),
('Hound Dog', 'caratula', 'https://drive.google.com/uc?id=11rTQVEZeT3xqpOWxVL8YWk1DpM4RZz1J', 'Hound Dog - Elvis Presley',41,'2:14'),
('Cant Help Falling In Love', 'caratula', 'https://drive.google.com/uc?id=1A8XkhXE0uXJTOHVXa8IiJgLUepGA_ofH', 'Cant Help Falling In Love - Elvis Presley',41,'3:00'),
('Jailhouse Rock', 'caratula', 'https://drive.google.com/uc?id=1mDq6PAsNjQQrpnAtVwgtA-OiFvHn5yhp', 'Jailhouse Rock - Elvis Presley',41,'2:36'),
('Lose Yourself', 'caratula', 'https://drive.google.com/uc?id=1Uw_8ErVdhVc1mTkZjJamCMT7eGoqajfy', 'Lose Yourself - Eminem',42,'5:21'),
('Without Me', 'caratula', 'https://drive.google.com/uc?id=12JYkTOZuTac1kQlR-__CiEeabycgIbfX', 'Without Me - Eminem',42,'4:51'),
('Enamorado tuyo', 'caratula', 'https://drive.google.com/uc?id=1LBukmxDjGi6hQazE2kiOPQcbRkdy5lZk', 'Enamorado tuyo - El cuarteto de Nos',2,'4:19'),
('Endroll', 'caratula', 'https://drive.google.com/uc?id=1IqlvioXO3hE0G8hY-6JlJDQbK3Ya2Yun', 'Endroll - The Circus',8,'1:18'),
('La locura está en mi', 'caratula', 'https://drive.google.com/uc?id=1Btsky_l2K-E5KQpkuIY24NfREem-4oEb', 'La locura está en mi - Porta',74,'4:33'),
('Tears In Heaven', 'caratula', 'https://drive.google.com/uc?id=1aXvpGAhvnfitd7MpRmuQxdh0Z5xmuZzF', 'Tears In Heaven - Eric Clapton',80,'4:34'),
('City of The Dead', 'caratula', 'https://drive.google.com/uc?id=1UpnNPqPX9DdHJIvxKCQ5l8oBslhiCLZ3', 'City of The Dead - Eurielle',81,'5:05'),
('Hate Me', 'caratula', 'https://drive.google.com/uc?id=1gmHz6SUU-hW51nxPebQeow7hz1vZFmPb', 'Hate Me - Eurielle',81,'5:08'),
('Every Path', 'caratula', 'https://drive.google.com/uc?id=1Refyypu5-DVZx6v6LdhKO7UrJpQqskYS', 'Every Path - Alela Diane',7,'4:12'),
('Everybody Loves Somebody', 'caratula', 'https://drive.google.com/uc?id=1IpCAEM13z54C6oFOXM0AdcVjajn6cgsM', 'Everybody Loves Somebody - Dean Martin',44,'2:46'),
('Exist For Love', 'caratula', 'https://drive.google.com/uc?id=1oIVh501JXUSQJ_hx8VaQYg9zGQGt4VVS', 'Exist For Love - AURORA',3,'4:19'),
('Immortals', 'caratula', 'https://drive.google.com/uc?id=1iIE0ojtvZ6NZZ1pgbd78aqkiOZN6dxsA', 'Immortals - Fall Out Boy',23,'3:10'),
('Thnks Fr Th Mmrs', 'caratula', 'https://drive.google.com/uc?id=1JD6REaY836yp74qKmT-GLSSLhQDh30JQ', 'Thnks Fr Th Mmrs - Fall Out Boy',23,'3:24'),
('I Dont Care', 'caratula', 'https://drive.google.com/uc?id=1F6dw5nuPz-wFzgvZ5YxssGc12fFPXhox', 'I Dont Care - Fall Out Boy',23,'3:34'),
('Rat a Tat', 'caratula', 'https://drive.google.com/uc?id=16ourDQsSZQLb09rXFGk_St2IdW0xpPwG', 'Rat a Tat - Fall Out Boy',23,'4:05'),
('THE PHOENIX', 'caratula', 'https://drive.google.com/uc?id=15jWhRWWaVV0O4xse9_7SdeKQAoE1wEa0', 'THE PHOENIX - Fall Out Boy',23,'4:08'),
('Father & Son', 'caratula', 'https://drive.google.com/uc?id=1MVOkGf51Mj7tjXJClpSZrQu2FKqokpqL', 'Father & Son - Cat Stevens',82,'3:40'),
('Feel Good Inc', 'caratula', 'https://drive.google.com/uc?id=1rPSV_ji5lczksZEtJmMF3T6qK_FBPAHt', 'Feel Good Inc - Gorillaz',48,'3:41'),
('Feel Invincible', 'caratula', 'https://drive.google.com/uc?id=1jwno0jljHSB-ufwF5j1RPBrjbuEiqUQ7', 'Feel Invincible - Skillet',49,'3:47'),
('Fiction', 'caratula', 'https://drive.google.com/uc?id=1YzwdvpHqpY4E7T4qSAL6tbYridwCsFSw', 'Fiction - Sumika',50,'4:13'),
('Fortunate Son', 'caratula', 'https://drive.google.com/uc?id=1NA-YBFvYcRUDLiJJ-aoR_vUpMLc2RwFT', 'Fortunate Son - Creedence Clearwater Revival',51,'2:17'),
('Pumped up Kicks', 'caratula', 'https://drive.google.com/uc?id=1Ls3FucByTh94VyCYO4ji__GOJZ_GdfWK', 'Pumped up Kicks - Foster The People',52,'4:15'),
('I Love You Baby', 'caratula', 'https://drive.google.com/uc?id=1mnjIMvFIMCRTwloleWwqe-iYK30ZN3wV', 'I Love You Baby - Frank Sinatra',26,'3:56'),
('Fly Me To The Moon', 'caratula', 'https://drive.google.com/uc?id=1bEKG4iLIRt7G79k0R7oj-1r5OOBKINPm', 'Fly Me To The Moon - Frank Sinatra',26,'2:28'),
('Im A Fool to Want You', 'caratula', 'https://drive.google.com/uc?id=1OGcCMULAUY6fLXjqAruYsB4UH6wj0zOu', 'Im A Fool to Want You - Frank Sinatra',26,'4:49'),
('L.O.V.E.', 'caratula', 'https://drive.google.com/uc?id=1Guvl-8VDpnQhuCRFYPVLqx46iy1dcqVL', 'L.O.V.E. - Frank Sinatra',26,'2:32'),
('Something Stupid', 'caratula', 'https://drive.google.com/uc?id=1kS1PsI-5IWBo1_S6LBIqpjwJHuKWjymL', 'Something Stupid - Frank Sinatra',26,'2:49'),
('Free Bird', 'caratula', 'https://drive.google.com/uc?id=1svcqRIFPMF-p40TP20SqSBi2WJ2MI-O2', 'Free Bird - Lynyrd Skynyrd',54,'4:19'),
('FreeBird', 'caratula', 'https://drive.google.com/uc?id=1bwZ7EHt4dt9-3rkTjBVnbJVjC2M8GYsT', 'FreeBird - Lynyrd Skynyrd',54,'4:26'),
('Gaia', 'caratula', 'https://drive.google.com/uc?id=1HTF4T0dxXCDLTx2SF7Z-M4z6MF5YBIbf', 'Gaia - Mago de OZ',30,'11:04'),
('Get Lucky', 'caratula', 'https://drive.google.com/uc?id=1_P38mV-vTTogBKWUmCH9Kf6N6gycEE6u', 'Get Lucky - Daft Punk',55,'6:09'),
('Giving In To The Love', 'caratula', 'https://drive.google.com/uc?id=13Brnv-uDs7O-RyjTxT4VsGSDnWGqVwBJ', 'Giving In To The Love - AURORA',3,'3:01'),
('Crazy', 'caratula', 'https://drive.google.com/uc?id=1ZcbiYlSYk1Mx_qWDVnGLGMspsMP0APXD', 'Crazy - Gnarls Barkley',45,'2:59'),
('Good Old-Fashioned Lover Boy', 'caratula', 'https://drive.google.com/uc?id=1iitxI6UzPkFmpTmKnEH-tPf0sHtvc6qP', 'Good Old-Fashioned Lover Boy - Queen',46,'2:53'),
('Gorgeus - Taylor Swift', 'caratula', 'https://drive.google.com/uc?id=1h4azJtweo4qxfDsUuGPCFDU8l2eeh_s4', 'Gorgeus - Taylor Swift - Taylor Swift',47,'1:21'),
('Clint Eastwood', 'caratula', 'https://drive.google.com/uc?id=1khJmh2-OOIOb32fPLGW1FTIBiwGiveCu', 'Clint Eastwood - Gorillaz',48,'3:39'),
('Holiday', 'caratula', 'https://drive.google.com/uc?id=1-RfK0FZ5QHQCFzP9AujbCTVjWmWihVl8', 'Holiday - Green Day',83,'3:54'),
(' 21 guns', 'caratula', 'https://drive.google.com/uc?id=1Oh1SoNT2nxtT43JyAfdzDxVaZelilI-o', ' 21 guns - Green Day',83,'5:26'),
('American Idiot', 'caratula', 'https://drive.google.com/uc?id=1Ab5nI0ETzpTQj1H6spErD6E-hE4865Kj', 'American Idiot - Green Day',83,'2:53'),
('Boulevard of Broken Dreams', 'caratula', 'https://drive.google.com/uc?id=1ieihoHJIa4pjFC_M_9B7NVtN3s4xadcj', 'Boulevard of Broken Dreams - Green Day',83,'4:25'),
('Sweet Child O Mine', 'caratula', 'https://drive.google.com/uc?id=1k5RrGo5deJXYjyG67dHiew1amLGdkn8U', 'Sweet Child O Mine - Guns N Roses',84,'5:55'),
('Happy', 'caratula', 'https://drive.google.com/uc?id=1N965U-HiaqZh29N5H_MDLfs_sTIVeVV_', 'Happy - Pharrell Williams',62,'4:00'),
('Hard as a Rock', 'caratula', 'https://drive.google.com/uc?id=1rhrszQE85z_YDIlJ-2nAtlB6GZjgTsHJ', 'Hard as a Rock - AC DC',5,'4:31'),
('Hasta Que El Cuerpo Aguante', 'caratula', 'https://drive.google.com/uc?id=1naMcqgrK8KOoWBfd5r-FVwRWTwDicaS7', 'Hasta Que El Cuerpo Aguante - Mago de OZ',30,'1:39'),
('Heartaches', 'caratula', 'https://drive.google.com/uc?id=1dBGGTFk4z4fLWNmpX1YbNbNU4zhaRBcm', 'Heartaches - Al Bowlly',85,'3:30'),
('Heathens', 'caratula', 'https://drive.google.com/uc?id=1Xg0ENUI-o729KsLWgeMhNv5qFLBXfnNg', 'Heathens - AURORA',3,'3:45'),
('Hells Bells', 'caratula', 'https://drive.google.com/uc?id=1AfCSFfxHd_rV6SpGqOdrp6S7wBcHg8JL', 'Hells Bells - AC DC',5,'5:09'),
('Here Comes The Sun', 'caratula', 'https://drive.google.com/uc?id=1f_v7d8h5i9r6XFkFqkdNAwVCWJr5EZGQ', 'Here Comes The Sun - The Beatles',67,'3:03'),
('High Voltage', 'caratula', 'https://drive.google.com/uc?id=1Kjuq03rsYuoC_tmMR8wC2wOaH1wWB-5F', 'High Voltage - AC DC',5,'4:20'),
('Hombre Con Alas', 'caratula', 'https://drive.google.com/uc?id=1JJTVyLDAPN-e9DLpyDiJbFIX5v9KITFO', 'Hombre Con Alas - El cuarteto de Nos',2,'3:47'),
('Hoy Estoy Raro', 'caratula', 'https://drive.google.com/uc?id=1tWhKi1YlG7YOtuv5gZq_E3vvA7KqtXVR', 'Hoy Estoy Raro - El cuarteto de Nos',2,'4:44'),
('I Cant Decide', 'caratula', 'https://drive.google.com/uc?id=13fa25jS9L2dvoBuQFQ2uEy8X3jlh5_5M', 'I Cant Decide - Sissor sisters',86,'2:46'),
('I Cant Get No Satisfaction', 'caratula', 'https://drive.google.com/uc?id=1rkM9q9bUbMKTxm330Pe_SG5xpss26vxa', 'I Cant Get No Satisfaction - Rolling Stones',10,'3:44'),
('If it aint broke', 'caratula', 'https://drive.google.com/uc?id=1-bbSePr_6WVq1gAOy8ANwBNQnRggsCwH', 'If it ain´t broke - Whitey Morgan',87,'4:37'),
('Enemy', 'caratula', 'https://drive.google.com/uc?id=1_1l3zBpPCZDaJ9dZQeMbSeCnkHVy3YHF', 'Enemy - Imagine Dragons',88,'2:51'),
('In The Meantime', 'caratula', 'https://drive.google.com/uc?id=1Xthc3hcu4Wc6uoxxAUX7zCptQCqkLd1l', 'In The Meantime - Spacehog',89,'4:59'),
('Invierno del 92', 'caratula', 'https://drive.google.com/uc?id=1xbJVOaVx9nY_iiT0WD1Ycf7mwpj0zuyk', 'Invierno del 92 - El cuarteto de Nos',2,'4:00'),
('Its Time', 'caratula', 'https://drive.google.com/uc?id=1l81qfnMrBzZg-ai4vB_e420KzSjwZ2er', 'Its Time - Imagine Dragons',88,'4:06'),
('I Want You Back', 'caratula', 'https://drive.google.com/uc?id=1-iPJZvm9J4snW093rNmWSnTi1C-mpgHc', 'I Want You Back - Jackson 5',90,'0:49'),
('Time In A Bottle', 'caratula', 'https://drive.google.com/uc?id=126oltzg7L6gfgP8JTkIoKStWFT-dswM0', 'Time In A Bottle - Jim Croce',91,'2:21'),
('Leaving On A Jet Plane', 'caratula', 'https://drive.google.com/uc?id=1_xUAARFj5oDFu-lNoRYaIDuiYi3zyL3A', 'Leaving On A Jet Plane - John Denver',92,'3:47'),
('Take Me Home Country Roads', 'caratula', 'https://drive.google.com/uc?id=120PMIVCVzEmk0mWHbA1Uzxu236hQdzyH', 'Take Me Home, Country Roads - John Denver',92,'3:18'),
('Just A Cloud Away', 'caratula', 'https://drive.google.com/uc?id=10KnZZYA7XfEXRljVx4zgmYdQJfEpgNoQ', 'Just A Cloud Away - Pharrell Williams',62,'2:56'),
('Just One Yesterday', 'caratula', 'https://drive.google.com/uc?id=1NLkidQUEvghiX6B_JMrmp8dSmZWC_5Kk', 'Just One Yesterday - Fall Out Boy',23,'4:04'),
('Hot N Cold', 'caratula', 'https://drive.google.com/uc?id=1GQBrJH4_OIhyE-TOcxSFMYgMKNyVmRcG', 'Hot N Cold - Katy Perry',21,'3:40'),
('Roar', 'caratula', 'https://drive.google.com/uc?id=1uJWIbEAF9wiPpAjgJMt_h2hqCtzQrd-E', 'Roar - Katy Perry',21,'3:43'),
('Die Young', 'caratula', 'https://drive.google.com/uc?id=1KBWB7EM4K5DvCqMOE6w4VavAk7IhmzYV', 'Die Young - KeSha',93,'3:25'),
('La Chica de Humo', 'caratula', 'https://drive.google.com/uc?id=1I1TGD-i9nMJm_AirBJ8ZURfDEf_di2wM', 'La Chica de Humo - Luis Miguel',59,'5:32'),
('La Costa del Silencio', 'caratula', 'https://drive.google.com/uc?id=1Qa1QWJWbuA_A4biODF1ouHJy1enEvZPY', 'La Costa del Silencio - Mago de OZ',30,'4:37'),
('Una canción para no decir te quiero', 'caratula', 'https://drive.google.com/uc?id=1uk8Pu8817wMewe4zWmkDJvz1IRIrWu44', 'Una canción para no decir te quiero - La Maravillosa Orquesta del Alcohol',1,'3:16'),
('Lady Divine', 'caratula', 'https://drive.google.com/uc?id=1VXQJ3vAxoPM6Vu_VP7xBlShGezPik-1s', 'Lady Divine - Alela Diane',7,'5:12'),
('Poker Face', 'caratula', 'https://drive.google.com/uc?id=14CxDqGqgb41qd5UnZCSDTYGIq4DacSPC', 'Poker Face - Lady Gaga',12,'3:58'),
('Lemon Boy', 'caratula', 'https://drive.google.com/uc?id=1rSOA8ph_0p8PsDtSishmeSc_-XLPYFih', 'Lemon Boy - Cavetown',94,'4:32'),
('Lemon Tree', 'caratula', 'https://drive.google.com/uc?id=1-RZemZmJsRRAkTR_pvpjHnUtZYs7IvOF', 'Lemon Tree - Fools Garden',95,'3:11'),
('Let It Be', 'caratula', 'https://drive.google.com/uc?id=1vnKokVOT9QVr7synpfvIXcUKTLOSOcsK', 'Let It Be - The Beatles',67,'3:51'),
('Brillas', 'caratula', 'https://drive.google.com/uc?id=1mlHcinsi3zjsK7atXEA57I2hrylFiaLf', 'Brillas - León Larregui',57,'4:11'),
('Locos', 'caratula', 'https://drive.google.com/uc?id=1IYg3HGx0FdfFbcyvQdfDdIvZheVuyYBU', 'Locos - León Larregui',57,'2:57'),
('Light Em Up', 'caratula', 'https://drive.google.com/uc?id=1FGzDMyMLJWTY3CedjGvaSNTGEtLh1OiB', 'Light Em Up - Fall Out Boy',23,'3:07'),
('Livin in the Sunlight Lovin in the Moon Light', 'caratula', 'https://drive.google.com/uc?id=19FmE-5Lkb3rNkTxFhPMqvD1HTH5rhIwP', 'Livin in the Sunlight, Lovin in the Moon Light - Tiny Tim',70,'2:14'),
('Lo malo de ser bueno', 'caratula', 'https://drive.google.com/uc?id=1j2LAw1GNUoWokEMYLfk9sLotZwoID2k8', 'Lo malo de ser bueno - El cuarteto de Nos',2,'4:02'),
('When Youre Smiling', 'caratula', 'https://drive.google.com/uc?id=1hQgQ6Ts28o6Zg4YtyPLGHRO9fNdxyn0a', 'When Youre Smiling - Louis Armstrong',56,'4:07'),
('What A Wonderful World', 'caratula', 'https://drive.google.com/uc?id=1yV2zSzoLF1jnfuOo76VNpf6y4w8UwdS6', 'What A Wonderful World - Louis Armstrong ',56,'2:17'),
('Love Of My Life', 'caratula', 'https://drive.google.com/uc?id=1nAaBYYEMF6L9UMO4mDiQ3w-T_Tnds8y6', 'Love Of My Life - Queen',46,'3:37'),
('Lovers', 'caratula', 'https://drive.google.com/uc?id=1uY9yISRvK3LpnDJNyokWzhKzC22kWhwB', 'Lovers - Sumika',50,'4:22'),
('Ahora Te Puedes Marchar', 'caratula', 'https://drive.google.com/uc?id=1PLi-t-ziNsbLEBWipa-xya_hueg7exGq', 'Ahora Te Puedes Marchar - Luis Miguel',59,'3:12'),
('Voy a celebrarlo', 'caratula', 'https://drive.google.com/uc?id=1yN8gUbRTcneRNM_t9dGxh4y2A2rO5DAf', 'Voy a celebrarlo - Lágrimas De Sangre',60,'7:07'),
('Ma Baker ', 'caratula', 'https://drive.google.com/uc?id=1gBMPC70-U66GRSRIr2YWODu0XjG7Gt1o', 'Ma Baker  - Boney M',15,'4:38'),
('La danza del fuego', 'caratula', 'https://drive.google.com/uc?id=16ELOMMyA-OCqpUwCvnp3DMyAUn6R1LDs', 'La danza del fuego - Mago de OZ',30,'5:11'),
('Mario Neta', 'caratula', 'https://drive.google.com/uc?id=1YEQ9p4HfYWr8GO_R-lnU-DbYXmt9r6s5', 'Mario Neta - El cuarteto de Nos',2,'3:54'),
('Uptown', 'caratula', 'https://drive.google.com/uc?id=1Hwp3xqx6oB4Qzh7PCPh-yGNVbvrIfmq3', 'Uptown - Bruno Mars',18,'4:31'),
('Misery', 'caratula', 'https://drive.google.com/uc?id=1LiVQNO0mSqqH49r58NXezOm2vGw_U2PG', 'Misery - Maroon 5',96,'3:36'),
('Payphone', 'caratula', 'https://drive.google.com/uc?id=1hnJE-_H4nZQ-wCOYE-77GfdQRyFZTFVC', 'Payphone - Maroon 5',96,'3:52'),
('This Love', 'caratula', 'https://drive.google.com/uc?id=16FfwsZpBKNnUAivLpXr5k2ULY0IiYyy5', 'This Love - Maroon 5',96,'3:22'),
('Aint No Mountai', 'caratula', 'https://drive.google.com/uc?id=1uEhY9yx0N8n4ne_CAqXp9H-gxta5-o60', 'Aint No Mountai - Marvin Gaye',73,'1:55'),
('Me Amo', 'caratula', 'https://drive.google.com/uc?id=1YpJE_1JsgvkR51KIPJdDIahXD2wMXpI0', 'Me Amo - El cuarteto de Nos',2,'3:24'),
('Don', 'caratula', 'https://drive.google.com/uc?id=19bpc6PPModZQvy3CVaAOZ7l_pyCtdAsx', 'Don - Miranda',63,'3:08'),
('Mississippi Queen', 'caratula', 'https://drive.google.com/uc?id=16vdwLf8cRo-LjZrtT5Y9UmulnSlMLpgt', 'Mississippi Queen - Mountain',61,'2:30'),
('Molinos de viento', 'caratula', 'https://drive.google.com/uc?id=1b9HBlrGVcilLKb3qPZXZUJQBYmhHenoh', 'Molinos de viento - Mago de OZ',30,'4:06'),
('Molinos de viento', 'caratula', 'https://drive.google.com/uc?id=1b9HBlrGVcilLKb3qPZXZUJQBYmhHenoh', 'Molinos de viento - Mago de OZ',30,'4:20'),
('Monster', 'caratula', 'https://drive.google.com/uc?id=1-lhtpcRbyugb2pgMXvELBC7EZWe1UmUn', 'Monster - Skillet',49,'3:06'),
('Moves Like Jagger', 'caratula', 'https://drive.google.com/uc?id=1MsDhdW58jrJsjR2ncWCOsVUx5LCKiCz-', 'Moves Like Jagger - Maroon 5',96,'3:22'),
('Mr Blue Sky', 'caratula', 'https://drive.google.com/uc?id=1JbxWSrbeewOGSp9FMTyQpjEUOgCJBtHf', 'Mr Blue Sky - Electric Ligth Orchesta',97,'5:02'),
('Murder Song', 'caratula', 'https://drive.google.com/uc?id=1ek67Q1Ut3BCp3HHHaPVBWJv8yeywHG0l', 'Murder Song - AURORA',3,'3:35'),
('My Brambles', 'caratula', 'https://drive.google.com/uc?id=10jhTQ2zS5Ww0iYmIbTYgdDfHhJ-PZXRr', 'My Brambles - Alela Diane',7,'4:58'),
('Welcome To The Black Parade', 'caratula', 'https://drive.google.com/uc?id=1BUSP-tXoGG3V7QollNJmctQGIY8xP-c5', ' Welcome To The Black Parade - My Chemical Romance ',68,'5:15'),
('Blood', 'caratula', 'https://drive.google.com/uc?id=1Koam1gb4XIs7NTlZG_nhxaAnW0POFOuW', 'Blood - My Chemical Romance',68,'1:24'),
('My Kind of Woman', 'caratula', 'https://drive.google.com/uc?id=1XepTnNs40dBuklSZ5Vf_HASgPWDvyZMN', 'My Kind of Woman - Mac DeMarco',69,'3:10'),
('Fiesta Pagana', 'caratula', 'https://drive.google.com/uc?id=1bjsUEPJTm6MItnPIYKUCMBTtgvVPBD1q', 'Fiesta Pagana - Mago de OZ',30,'2:28'),
('La cantata del Diablo', 'caratula', 'https://drive.google.com/uc?id=1zF97nYcCkiKRaekmfBj73o-yk47uYvan', 'La cantata del Diablo - Mago de OZ',30,'19:35'),
('La Voz Dormida Letra', 'caratula', 'https://drive.google.com/uc?id=1yoyE9o9RpOUdUWyMo6LBnLv6RtaDkLLu', 'La Voz Dormida Letra - Mago de OZ',30,'10:01'),
('Na Na Na Na Na Na Na Na Na Na Na Na', 'caratula', 'https://drive.google.com/uc?id=1v8l1xeK_Q8AIjkGnFHJP59cGNj2FXvTT', 'Na Na Na Na Na Na Na Na Na Na Na Na - My Chemical Romance ',68,'3:26'),
('Never Going Back Again', 'caratula', 'https://drive.google.com/uc?id=1nSaRI_iIZwbYK-6zD6NlQNA8KFeLv3TL', 'Never Going Back Again - Fleetwood Mac',64,'2:14'),
('New Normal', 'caratula', 'https://drive.google.com/uc?id=1plF9FAxHeHk3_SpcHvEaRWDfhtLbY8dG', 'New Normal - Jack Stauber',19,'1:21'),
('Beast', 'caratula', 'https://drive.google.com/uc?id=1hNlQyL2mX-fOE-XtlYJAEnMNcQYTUGCV', 'Beast - Nico Vega',65,'4:03'),
('NO LLORA', 'caratula', 'https://drive.google.com/uc?id=1F2tyO4tt63nP_Zf8LFBBqUcdxnPKHgVp', 'NO LLORA - El cuarteto de Nos',2,'4:19'),
('No Me Queda Mas', 'caratula', 'https://drive.google.com/uc?id=1eTyC9dUtfaC7qBGqsmtwof2lPO24UuSO', 'No Me Queda Mas - Selena',66,'3:26'),
('No Quiero Ser Normal', 'caratula', 'https://drive.google.com/uc?id=1nxWZNb016VniT7dguV3jIoV3_vK_Kj42', 'No Quiero Ser Normal - El cuarteto de Nos',2,'3:39'),
('No Sleep Till Brooklyn', 'caratula', 'https://drive.google.com/uc?id=1DHFAPPCW0T4vqW3w84jWbgpHBcCelZ-R', 'No Sleep Till Brooklyn - Beastie Boys',98,'4:07'),
('Oh! My Mama', 'caratula', 'https://drive.google.com/uc?id=1SS19semUIgxTpaGh30rNp6uiWCpnxoUp', 'Oh! My Mama - Alela Diane',7,'3:12'),
('On Melancholy Hill', 'caratula', 'https://drive.google.com/uc?id=1bCM5mdIYrjGpx90a507dDlNhJvsJqJVB', 'On Melancholy Hill - Gorillaz',48,'3:28'),
('Ohh', 'caratula', 'https://drive.google.com/uc?id=1dL1oAFpIlOwCQXpazBY63ontt-QaHmsx', 'Ohh - Sissor sisters',86,'3:29'),
('Ophelia', 'caratula', 'https://drive.google.com/uc?id=19Y0wPGkWiOVnkeA8vnnigUHcnSOG1rtx', 'Ophelia - The Lumineers',58,'2:42'),
('Oye Como Va', 'caratula', 'https://drive.google.com/uc?id=1cSP0b6pmsewbCrMUFH88Isxo3r2Nhm-m', 'Oye Como Va - Santana',71,'4:18'),
('Perfume de Gardenia', 'caratula', 'https://drive.google.com/uc?id=1ERBWwjP3tW_23ikKShoXPJ4G4U97rQqH', 'Perfume de Gardenia - Alejandro Fernández',72,'3:08'),
('Pieces of String', 'caratula', 'https://drive.google.com/uc?id=1ZOjBIBIcEEiMrbzobpbq4a7NkLEVlqXr', 'Pieces of String - Alela Diane',7,'2:51'),
('BRUCE WAYNE', 'caratula', 'https://drive.google.com/uc?id=1QVnNO-B7ZdSS4MUVtj7tpDFW9acuDDqy', 'BRUCE WAYNE - Porta',74,'5:09'),
('Tetris rap', 'caratula', 'https://drive.google.com/uc?id=1pHfgTvdfPDRbN1ezLtaLi_j_QVFSpsHX', 'Tetris rap - Porta',74,'1:36'),
(' El fin del mundo', 'caratula', 'https://drive.google.com/uc?id=1fR0hmZNjPZCr8M5AsOtfB1gsCdjXiGlL', ' El fin del mundo - Porta',74,'2:42'),
('Fuck fakes', 'caratula', 'https://drive.google.com/uc?id=1m3bruFFMFMYddV4s5KPHpnql8dsaTO-I', 'Fuck fakes - Porta',74,'3:58'),
('Logro desbloqueado', 'caratula', 'https://drive.google.com/uc?id=1wUClpj8Y5H8PM5rmdM1qhCbGtLdSWNz0', 'Logro desbloqueado - Porta',74,'2:58'),
('Mi frikimundo', 'caratula', 'https://drive.google.com/uc?id=1OrrHGhAgJkmHm8YPp7eZZOeSXvzWyEpS', 'Mi frikimundo - Porta',74,'3:37'),
('Nota De Suicidio', 'caratula', 'https://drive.google.com/uc?id=1s0i7N85VPt-DF-C7MoaKZ8ZoBqjKPC2L', 'Nota De Suicidio - Porta',74,'5:11'),
('Puro instinto', 'caratula', 'https://drive.google.com/uc?id=1F3ZsJrmSAwWhkIWtTkvF9frwgBimCAaR', 'Puro instinto - Porta',74,'2:01'),
('Tras el cristal', 'caratula', 'https://drive.google.com/uc?id=15cI-DK9wXm6fiDewo_PXGJNM0EMRH5BT', 'Tras el cristal - Porta',74,'4:04'),
('Princesa Azul', 'caratula', 'https://drive.google.com/uc?id=1WQqNszqtuilGDuA1qcCnmok04suyGJAl', 'Princesa Azul - El cuarteto de Nos',2,'2:46'),
('Put Your Head On My Shoulder', 'caratula', 'https://drive.google.com/uc?id=18JF0SWT-yEHvP17tP4zbNSQVdE1pyOP6', 'Put Your Head On My Shoulder - Paul Anka',75,'2:42'),
('Another One Bites The Dust', 'caratula', 'https://drive.google.com/uc?id=1cJpnWDXtCI3kM9YneWXhQruLYoai8Uqf', 'Another One Bites The Dust - Queen',46,'3:35'),
('I Want To Break Free', 'caratula', 'https://drive.google.com/uc?id=1g9c_5_CJMEBeqYFuIps4Ugu2mR_5G39g', 'I Want To Break Free - Queen',46,'3:43'),
('Dont Stop Me Now', 'caratula', 'https://drive.google.com/uc?id=19bpc6PPModZQvy3CVaAOZ7l_pyCtdAsx', 'Dont Stop Me Now - Queen',46,'3:36'),
('We Are The Champions', 'caratula', 'https://drive.google.com/uc?id=1nlglwKTbrdOJoMPtLWthssknitRaMici', 'We Are The Champions - Queen',46,'3:01'),
('We Will Rock You', 'caratula', 'https://drive.google.com/uc?id=1X_czo4GCAevqdJUXyJK0qxvMaIkzWhCV', 'We Will Rock You - Queen',46,'2:14'),
('Bohemian Rhapsody', 'caratula', 'https://drive.google.com/uc?id=1vvZMSL5izYxu1i5KmD7x7Ys_XlObWhzG', 'Bohemian Rhapsody - Queen',46,'5:59'),
('Creep', 'caratula', 'https://drive.google.com/uc?id=1VFp7PPeRkgDJ8pEfB2gc83kHmXurcakb', 'Creep - Radiohead',113,'3:55'),
('SASTRE DE SONRISAS', 'caratula', 'https://drive.google.com/uc?id=1CtXs_wm2x9bXaNM4Icu7CFvR67xB_-3h', 'SASTRE DE SONRISAS - RAYDEN',104,'4:02'),
('Californication', 'caratula', 'https://drive.google.com/uc?id=1aePJ-QjnfV6CF87bYpMDCkZ2jtLurUe9', 'Californication - Red Hot Chili Peppers',20,'5:22'),
('Come and Get Your Love', 'caratula', 'https://drive.google.com/uc?id=1N58kTFn6fIS7GvrZIZmevXlzN9CNSa0p', 'Come and Get Your Love - Redbone',105,'3:28'),
('Runaway', 'caratula', 'https://drive.google.com/uc?id=1PttaFnQjfSlKdK_gwPYbqt0Xje1FFjYn', 'Runaway - AURORA',3,'4:10'),
('Safe & Sound', 'caratula', 'https://drive.google.com/uc?id=1AvRZNdBJUzjToVtBeoHHuz2jPA8c_JN-', 'Safe & Sound - Taylor Swift',47,'4:00'),
('Scatmans World', 'caratula', 'https://drive.google.com/uc?id=1tNckl5iXeBSeq7ydTo9akawUpESu5syh', 'Scatmans World - Scatman',106,'3:44'),
('Send Me On My Way', 'caratula', 'https://drive.google.com/uc?id=1SNRWcB5ANkSzjAxqhOOUV7denC0OVNNZ', 'Send Me On My Way - RustedRoot',107,'4:05'),
('September', 'caratula', 'https://drive.google.com/uc?id=11wcJJR4dAV56RW33_hHorzBHxlmRM1qo', 'September - Earth Wind Fire',29,'3:35'),
('Set Fire to the Rain', 'caratula', 'https://drive.google.com/uc?id=1v937vejDSrS1y2B_YhhglMED_zfmDY0e', 'Set Fire to the Rain - Adele',6,'4:03'),
('Snow', 'caratula', 'https://drive.google.com/uc?id=13sHAZibSNCpvCb9Iwo9vnq0ZupnzAfqK', 'Snow - Red Hot Chili Peppers',20,'5:34'),
('Starman', 'caratula', 'https://drive.google.com/uc?id=17_vv6vgMD653Nf300v4Mt1WKoYDw7GLW', 'Starman - David Bowie',37,'4:14'),
('Strangers In The Night', 'caratula', 'https://drive.google.com/uc?id=1EDgQvQB3Lh3nUTaYrMhyJ4e-Nx3LAR7u', 'Strangers In The Night - Frank Sinatra',26,'2:44'),
('T.N.T.', 'caratula', 'https://drive.google.com/uc?id=16lddxsfTcr3LrGzrQptElugY-0jUGner', 'T.N.T. - AC DC',5,'3:29'),
('Take Us Back', 'caratula', 'https://drive.google.com/uc?id=1hddmwqKCsC_QhIVwn_nwS-s_ktNv8vC_', 'Take Us Back - Alela Diane',7,'4:43'),
('Tatted Lace', 'caratula', 'https://drive.google.com/uc?id=1H0SYwSgFsjhv680klubWiKz9XQJ2B62q', 'Tatted Lace - Alela Diane',7,'4:47'),
('Thats Life', 'caratula', 'https://drive.google.com/uc?id=1l499xXvGOXrw93wPDqc9EaEFG0D0DnW4', 'Thats Life - Frank Sinatra',26,'3:07'),
('The Alder Trees', 'caratula', 'https://drive.google.com/uc?id=1WhDkd06dMVoX5nHk65NaohbvmZ8W2neC', 'The Alder Trees - Alela Diane',7,'3:27'),
('The Coffee Song', 'caratula', 'https://drive.google.com/uc?id=1K4qwZY8plZ6lfyNhR5mIxvVKRcqVCkOf', 'The Coffee Song - Frank Sinatra',26,'2:51'),
('The Long And Winding Road', 'caratula', 'https://drive.google.com/uc?id=1LPfl4pYPCPm3p_l-BEWrETiwXhCxUcnq', 'The Long And Winding Road - The Beatles',67,'3:34'),
('Stubborn Love', 'caratula', 'https://drive.google.com/uc?id=10NQPQt4SVmn4yLKKKsU_cBG0ZsSnLoXF', 'Stubborn Love - The Lumineers',58,'4:39'),
('The Ocean', 'caratula', 'https://drive.google.com/uc?id=18dA9Ocxd9TIPkJMCD5uz_htuRV5lD2Cd', 'The Ocean - Alela Diane',7,'3:42'),
('The Pirates Gospel', 'caratula', 'https://drive.google.com/uc?id=1Tbz0WCjehEU2oBdVSYNe1P1qpvA1eHHy', 'The Pirates Gospel - Alela Diane',7,'2:55'),
('The Power Of Love', 'caratula', 'https://drive.google.com/uc?id=1-Q2vY_m-PMQ-h5E7xMr5vaEUe0Ip0lbd', 'The Power Of Love - Huey Lewis',108,'3:47'),
('The Real Slim Shady', 'caratula', 'https://drive.google.com/uc?id=1rpdPeVMETF9X3aQH5mbnMuFqk4EwdEia', 'The Real Slim Shady - Eminem',42,'4:44'),
('Cherry Bomb', 'caratula', 'https://drive.google.com/uc?id=1YHjoJB8n3-4pAOZofXCR_p41clfcv5xS', 'Cherry Bomb - The Runaways',109,'2:09'),
('Theme From New York', 'caratula', 'https://drive.google.com/uc?id=1_ERo74j4xjhyy459hlIs8lMuSxgNafbM', 'Theme From New York - Frank Sinatra',26,'3:24'),
('Through The Fire And Flames', 'caratula', 'https://drive.google.com/uc?id=101vPOD8rIcashuuwH0efRASEGNg9XzRV', 'Through The Fire And Flames - DragonForce',110,'7:20'),
('Till The End Of The Day', 'caratula', 'https://drive.google.com/uc?id=11Tj7UJ3YMgM1vntYTPheRPJlvSFNUDcv', 'Till The End Of The Day - The Kinks',11,'2:26'),
('To Be Still', 'caratula', 'https://drive.google.com/uc?id=1T3DfzJAsBpFHvD1LLaV9n14oMs9w7aKf', 'To Be Still - Alela Diane',7,'5:26'),
('Todos pasan por mi rancho', 'caratula', 'https://drive.google.com/uc?id=1-sZnDE7S6lCCb9XekxytqsD0e1dsAGHC', 'Todos pasan por mi rancho - El cuarteto de Nos',2,'5:08'),
('Tone', 'caratula', 'https://drive.google.com/uc?id=1cT8yLw99AUuAJBIW15-5YIT1DutwEqBu', 'Tone - Aimer',111,'4:48'),
('Two time', 'caratula', 'https://drive.google.com/uc?id=1t_Lqey9mQzHfbdDfCykctBNNxK9_cPOp', 'Two time - Jack Stauber',19,'2:22'),
('Un Millón de Primaveras', 'caratula', 'https://drive.google.com/uc?id=1SjfLzrQplPxLH6ttELGvS5jLgzNBei3O', 'Un Millón de Primaveras - Vicente Fernández',112,'2:55'),
('Un problema menos', 'caratula', 'https://drive.google.com/uc?id=15zU9gUVyCtrBc5Qsooilj6w7nOE0j0Yh', 'Un problema menos - El cuarteto de Nos',2,'3:34'),
('Vida ingrata', 'caratula', 'https://drive.google.com/uc?id=1hDlDsiy8LM1mJ4TJbMkYmA8gLkrMkFtQ', 'Vida ingrata - El cuarteto de Nos',2,'3:57'),
('Viva La Vida', 'caratula', 'https://drive.google.com/uc?id=1i9p6jlrVgb6QrlcSE4AzkOXJscjD8MAw', 'Viva La Vida - Coldplay',76,'4:02'),
('Walk Like an Egyptian', 'caratula', 'https://drive.google.com/uc?id=1YdikxJGYVQ5Txnk3qKhIF_7XoeqnD1j4', 'Walk Like an Egyptian - The Bangles',99,'3:22'),
('Low Rider', 'caratula', 'https://drive.google.com/uc?id=1ono-Avyhgoq6SQ-0noD7CHjIJ4gq7Bn_', 'Low Rider - War',100,'3:14'),
('Welcome to the Jungle', 'caratula', 'https://drive.google.com/uc?id=10lwG_08Un4JDfKD4X7fV9LnTCkYa7Usb', 'Welcome to the Jungle - Guns N Roses',84,'4:33'),
('White as Diamonds', 'caratula', 'https://drive.google.com/uc?id=11ZAs6_4jReLnmyOBIqCAg8rBzrypccfJ', 'White as Diamonds - Alela Diane',7,'3:36'),
('Why Cant We Be Friends?', 'caratula', 'https://drive.google.com/uc?id=1AT_K4TZhqdnLPxNX47k2HJ03QodD4q8K', 'Why Cant We Be Friends? - War',100,'3:50'),
('Why Do I Love You So', 'caratula', 'https://drive.google.com/uc?id=1rvlaSJ3Pb_Ejw5EaYx6I1OQzJrJT924j', 'Why Do I Love You So - Johnny Tillotson',101,'2:06'),
('X Gon Give It To Ya', 'caratula', 'https://drive.google.com/uc?id=1jdTV9dlHdm2Wf68Ol3Ns0z1M6llFyQTf', 'X Gon Give It To Ya - DMX',102,'3:52'),
('Ya no sé qué hacer conmigo', 'caratula', 'https://drive.google.com/uc?id=12_XaJLmlnkQf0yViGAKKdZfvmQYp9xc0', 'Ya no sé qué hacer conmigo - El cuarteto de Nos',2,'4:01'),
('Ya Te Vas a Mejorar', 'caratula', 'https://drive.google.com/uc?id=1GJkG0PAtYg45ZApJiBZC6AOtCU7rXzvZ', 'Ya Te Vas a Mejorar - El cuarteto de Nos',2,'2:47'),
('Yendo a la Casa de Damián', 'caratula', 'https://drive.google.com/uc?id=1cVB07Bz-7CAaY2Wzy1tD-HWN5Hsirx-2', 'Yendo a la Casa de Damián - El cuarteto de Nos',2,'4:14'),
('You Dont Own Me - Lesley Gore', 'caratula', 'https://drive.google.com/uc?id=19bpc6PPModZQvy3CVaAOZ7l_pyCtdAsx', 'You Dont Own Me - Lesley Gore - Lesley Gore',103,'2:30'),
('ゆれる', 'caratula', 'https://drive.google.com/uc?id=1D8a2Lfh24Wl4yAPKUvJZ7EIjwvvu4-Qy', 'ゆれる - The Circus',8,'4:04'),
('エンド・オブ・ザ・ワールド', 'caratula', 'https://drive.google.com/uc?id=1OYcWjf4BpNuENTfF63H8KubisnSsDnDF', 'エンド・オブ・ザ・ワールド - The Circus',8,'5:02'),
('デイドリーム', 'caratula', 'https://drive.google.com/uc?id=1DDumFTjvcdQxU5qYUlPYrSQPKYB36UiI', 'デイドリーム - The Circus',8,'2:33'),
('春', 'caratula', 'https://drive.google.com/uc?id=1wbH365Fi2I6esBUqAKW0JZgQm6pr-Afj', '春 - The Circus',8,'5:35'),
('朝', 'caratula', 'https://drive.google.com/uc?id=1pNq7NZQ6r8WydiUmHIVEUQbbLNII6VKT', '朝 - The Circus',8,'4:24');

UPDATE canciones SET Caratula = 'https://i.pinimg.com/originals/22/e4/81/22e481f567d54fe0fad0d6c2009beb74.jpg' WHERE ArtistaId = 1;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/91af2752ceb52587afb5b36304f31446/500x500.jpg' WHERE ArtistaId = 2;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/20aa8cb049a2af945e3cdbc69e63cdcc/264x264.jpg' WHERE ArtistaId = 3;
UPDATE canciones SET Caratula = 'https://i.discogs.com/CQmGsjhUhYf4q6K2fIxVHrvc2IgLzxrqZkoCidXs95E/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4NDE1/My0xNTMyNzAyNDM0/LTg0NDIuanBlZw.jpeg' WHERE ArtistaId = 4;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/a/ac/Acdc_Highway_to_Hell.JPG' WHERE ArtistaId = 5;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png' WHERE ArtistaId = 6;
UPDATE canciones SET Caratula = 'https://i.scdn.co/image/ab67616d00001e0230acf1ecd1605d13f27bf056' WHERE ArtistaId = 7;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/51pvNy2tGNL._UXNaN_FMjpg_QL85_.jpg' WHERE ArtistaId = 8;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/artist/ea01117a11d596ec06940d48cdb69e03/500x500.jpg' WHERE ArtistaId = 9;
UPDATE canciones SET Caratula = 'https://musicloverjapan.com/cdn/shop/products/20220112_1b36aa_800x.jpg?v=1642987406' WHERE ArtistaId = 10;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/3/37/KinksTheKinks.jpg' WHERE ArtistaId = 11;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/d/dd/Lady_Gaga_%E2%80%93_The_Fame_album_cover.png' WHERE ArtistaId = 12;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/b86109dcafe654cfd4e0dbca1e3bd43b/264x264.jpg' WHERE ArtistaId = 13;
UPDATE canciones SET Caratula = 'https://i.pinimg.com/originals/f6/a0/3b/f6a03b9fd66173999afa127af7a58e01.jpg' WHERE ArtistaId = 14;
UPDATE canciones SET Caratula = 'https://music.metason.net/image?fn=R-9157920.jpeg&sc=83_' WHERE ArtistaId = 15;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Shaggy_-_Boombastic_Cover.jpg/220px-Shaggy_-_Boombastic_Cover.jpg' WHERE ArtistaId = 16;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/0/0c/Carry_the_Fire_%28Delta_Rae%29.jpg' WHERE ArtistaId = 17;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/71AJLmFQp+L._UF1000,1000_QL80_.jpg' WHERE ArtistaId = 18;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/ec220f01ac65b0795d62d62acc38cb93/500x500.jpg' WHERE ArtistaId = 19;
UPDATE canciones SET Caratula = 'https://baskinthemusic.files.wordpress.com/2012/04/rhcp-logo-scm-256.jpg' WHERE ArtistaId = 20;
UPDATE canciones SET Caratula = 'https://www.udiscovermusic.com/wp-content/uploads/2018/06/Katy-Perry-One-Of-The-Boys-Album-Cover-web-optimised-820.jpg' WHERE ArtistaId = 21;
UPDATE canciones SET Caratula = 'https://i.pinimg.com/originals/48/24/93/48249335e8c3852d59a5a27e054bb8d2.jpg' WHERE ArtistaId = 22;
UPDATE canciones SET Caratula = 'https://64.media.tumblr.com/5bef279142693d1f7b474d17a5910012/3e98e9c974df0560-e6/s1280x1920/ad348918b3193daf7a1f8e78e5d193ca72e3f15f.jpg' WHERE ArtistaId = 23;
UPDATE canciones SET Caratula = 'https://storage.halidonmusic.com/images/classica%20digitale%20(3)_260520_113110.jpg' WHERE ArtistaId = 24;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/6b77021277a1ece487c61ff62d255dbf/264x264.jpg' WHERE ArtistaId = 25;
UPDATE canciones SET Caratula = 'https://static.qobuz.com/images/covers/37/96/0060253759637_600.jpg' WHERE ArtistaId = 26;
UPDATE canciones SET Caratula = 'https://i.scdn.co/image/ab67616d0000b273e0114a86a2a0a7d8762951d9' WHERE ArtistaId = 27;
UPDATE canciones SET Caratula = 'https://i.discogs.com/Vo1cAjIMZ6-DjzPAuZrsDuZPB1Goxdku5C9PyDToGTo/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMzOTU0/MDYtMTQwMzg4NjQ1/Ny05MDcxLmpwZWc.jpeg' WHERE ArtistaId = 28;
UPDATE canciones SET Caratula = 'https://www.earthwindandfire.com/wp-content/uploads/2011/12/ultimatecollection.jpg' WHERE ArtistaId = 29;
UPDATE canciones SET Caratula = 'https://i.pinimg.com/originals/bc/64/0f/bc640f7e4ddc173be5b4dd572c981eb2.jpg' WHERE ArtistaId = 30;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/fdcdc676822fb84b57a466eca7e861ab/500x500.jpg' WHERE ArtistaId = 31;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/f5b1d28d5215f4934542a1c995dc2096/264x264.jpg' WHERE ArtistaId = 32;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/3/3d/Duffy_-_Rockferry_%28album%29.png' WHERE ArtistaId = 33;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/2/26/Florence_and_the_Machine_-_Lungs.png' WHERE ArtistaId = 34;
UPDATE canciones SET Caratula = 'https://e.snmc.io/i/1200/s/2bb32d21580d90465c79d5aa54b2ec1b/2667800' WHERE ArtistaId = 35;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/8/87/DACoe_compass.jpg' WHERE ArtistaId = 36;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/71whHt7hzdL._AC_UF894,1000_QL80_.jpg' WHERE ArtistaId = 37;
UPDATE canciones SET Caratula = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ2azqGh4H4LuuqAi7SkfTV5FubVaye_vc3g&usqp=CAU' WHERE ArtistaId = 38;
UPDATE canciones SET Caratula = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCVv-qZfDvdpArFrxFwjFQq3_2WuCxAAGnrw&usqp=CAU' WHERE ArtistaId = 39;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/8/85/Fooled_Around_and_Fell_in_Love_Elvin_Bishop.jpg' WHERE ArtistaId = 40;
UPDATE canciones SET Caratula = 'https://cdn11.bigcommerce.com/s-iq6934aszs/images/stencil/1280x1280/products/2377/5488/45__03830.1613294896.jpg?c=1' WHERE ArtistaId = 41;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/71n0xmxpw7L._UF1000,1000_QL80_.jpg' WHERE ArtistaId = 42;
UPDATE canciones SET Caratula = 'https://p16-tm-sg.tiktokmusic.me/img/tos-alisg-v-2102/6f476becf4274ca4ac93afa1b6454cb9~c5_1000x1000.jpg' WHERE ArtistaId = 43;
UPDATE canciones SET Caratula = 'https://i.pinimg.com/originals/ee/c9/29/eec929f96486a573810f76616971e4a6.jpg' WHERE ArtistaId = 44;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/c/cc/St_Elsewhere_Cover_Art.JPG' WHERE ArtistaId = 45;
UPDATE canciones SET Caratula = 'https://www.udiscovermusic.com/wp-content/uploads/2019/03/Queen-II-album-cover-820-820x820.jpg' WHERE ArtistaId = 46;
UPDATE canciones SET Caratula = 'https://people.com/thmb/-CFk2SUsPbgYeOcrtvMGO35IWOc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/taylor-swift-albums-1-93026ca98408417097660e117a10a6a9.jpg' WHERE ArtistaId = 47;
UPDATE canciones SET Caratula = 'https://labotiga.elgenioequivocado.com/wp-content/uploads/2021/04/Gorillaz-Gorillaz.jpg' WHERE ArtistaId = 48;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/71fnDlnfSeL._UF894,1000_QL80_.jpg' WHERE ArtistaId = 49;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/41wb1O77fkL._UF1000,1000_QL80_.jpg' WHERE ArtistaId = 50;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/4/4b/Creedence_Clearwater_Revival_-_Pendulum.jpg' WHERE ArtistaId = 51;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/f/f9/Foster_the_People_-_Supermodel.jpg' WHERE ArtistaId = 52;
UPDATE canciones SET Caratula = 'https://static01.nyt.com/images/2018/08/30/style/30JACKSON1/merlin_142876896_e07479fc-4e8a-43da-9682-2e35e6707fc2-articleLarge.jpg?quality=75&auto=webp&disable=upscale' WHERE ArtistaId = 53;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/b/b0/Lynyrdskynyrd.jpg' WHERE ArtistaId = 54;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/2/26/Daft_Punk_-_Random_Access_Memories.png' WHERE ArtistaId = 55;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/e521bade4db2c78dbda6c334905f6ea9/264x264.jpg' WHERE ArtistaId = 56;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/71wRM8p2f6L._UF894,1000_QL80_.jpg' WHERE ArtistaId = 57;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/A18mpobgSRL._UF1000,1000_QL80_.jpg' WHERE ArtistaId = 58;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/f/ff/Romances_Luis_Miguel.jpg' WHERE ArtistaId = 59;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/4acf46b17c12988506eda2236bf0f87c/500x500.jpg' WHERE ArtistaId = 60;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/58209fec52f3f03b34a0e3b1e57edb43/264x264.jpg' WHERE ArtistaId = 61;
UPDATE canciones SET Caratula = 'https://theonesofthe10shome.files.wordpress.com/2022/03/0488ad0c-b340-4f28-88f1-c0ff985bb841.jpeg' WHERE ArtistaId = 62;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/81Z-u4LHaqL._UF1000,1000_QL80_.jpg' WHERE ArtistaId = 63;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG' WHERE ArtistaId = 64;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/51HesbJfVzL._UF894,1000_QL80_.jpg' WHERE ArtistaId = 65;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/81wXYCf4KnL._UF1000,1000_QL80_.jpg' WHERE ArtistaId = 66;
UPDATE canciones SET Caratula = 'https://www.udiscovermusica.com/wp-content/uploads/sites/7/2022/12/The-Beatles-Let-It-Be-album-cover-820-1536x1536-1.jpeg' WHERE ArtistaId = 67;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/e/ea/Blackparadecover.jpg' WHERE ArtistaId = 68;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/1/15/Macdemarco2cover.png' WHERE ArtistaId = 69;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/71pUPJPO-ML._UF1000,1000_QL80_.jpg' WHERE ArtistaId = 70;
UPDATE canciones SET Caratula = 'https://www.rockaxis.com/img/newsList/6909582.jpg' WHERE ArtistaId = 71;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/1e62bfc89350cf00b7ef830bcd3aeb0e/264x264.jpg' WHERE ArtistaId = 72;
UPDATE canciones SET Caratula = 'https://insheepsclothinghifi.com/wordpress/wp-content/uploads/2020/07/Marvin-Gaye.jpg' WHERE ArtistaId = 73;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/444034f54e1a12f005b902601e83d2df/264x264.jpg' WHERE ArtistaId = 74;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/05cb444782d333b71c3f6dab9e59d8eb/500x500.jpg' WHERE ArtistaId = 75;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/711unzNdf+L._UF894,1000_QL80_.jpg' WHERE ArtistaId = 76;
UPDATE canciones SET Caratula = 'https://s.songswave.com/album-images/vol29/1039/1039192/2904630-big/Exitos-cover.jpg' WHERE ArtistaId = 77;
UPDATE canciones SET Caratula = 'https://cloudfront-us-east-1.images.arcpublishing.com/pmn/AYMVLGPSFZFPRIPZPPY65TGZMI.jpg' WHERE ArtistaId = 78;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/6b77021277a1ece487c61ff62d255dbf/264x264.jpg' WHERE ArtistaId = 79;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/9/95/Crossroads_%28Eric_Clapton_album%29.jpg' WHERE ArtistaId = 80;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/71d32LACRVL._UF894,1000_QL80_.jpg' WHERE ArtistaId = 81;
UPDATE canciones SET Caratula = 'https://lastfm.freetls.fastly.net/i/u/ar0/e869fadc472a4f6db29f6dd8ace4937f.jpg' WHERE ArtistaId = 82;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/71Z0rLIvpuL._UF894,1000_QL80_.jpg' WHERE ArtistaId = 83;
UPDATE canciones SET Caratula = 'https://www.udiscovermusic.com/wp-content/uploads/2017/07/Guns-N-Roses-Appetite-For-Destruction-Album-Cover-Web-Optimsied-820.jpg' WHERE ArtistaId = 84;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/fd760c01a3af1e9dd677e8cef10089ff/264x264.jpg' WHERE ArtistaId = 85;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/f816b97c074afb658c4792c57c64cda2/264x264.jpg' WHERE ArtistaId = 86;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/71S7XvQ3Y9L._UF1000,1000_QL80_.jpg' WHERE ArtistaId = 87;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg' WHERE ArtistaId = 88;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/c/c9/Inthemeantimespacehog.jpg' WHERE ArtistaId = 89;
UPDATE canciones SET Caratula = 'https://i.etsystatic.com/15564183/r/il/6e6e2b/4484589421/il_fullxfull.4484589421_brgz.jpg' WHERE ArtistaId = 90;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/b/bc/Photographsandmemories.jpg' WHERE ArtistaId = 91;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/52332630bf9f8dfc043b6149ecd81ed2/264x264.jpg' WHERE ArtistaId = 92;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/5/59/Kesha_Warrior.jpeg' WHERE ArtistaId = 93;
UPDATE canciones SET Caratula = 'https://i.scdn.co/image/ab67616d0000b273a29186e92ad38b89ae1611ea' WHERE ArtistaId = 94;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/8/83/Dish_of_the_Day_%28Fools_Garden_album_-_cover_art%29.jpg' WHERE ArtistaId = 95;
UPDATE canciones SET Caratula = 'https://cdn11.bigcommerce.com/s-8e25iavqdi/images/stencil/1280x1280/products/53054/51944/moves-like-jagger-album-cover-sticker__51492.1540215876.jpg?c=2' WHERE ArtistaId = 96;
UPDATE canciones SET Caratula = 'https://i.etsystatic.com/15564183/r/il/648eac/4437233528/il_fullxfull.4437233528_7bo9.jpg' WHERE ArtistaId = 97;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/6/67/Beastie_Boys_-_Licensed_to_Ill.png' WHERE ArtistaId = 98;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/45a73be3c1834868ab89b858906aef05/350x350.jpg' WHERE ArtistaId = 99;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/956af15ef5ec2b3565e062e80587f54e/264x264.jpg' WHERE ArtistaId = 100;
UPDATE canciones SET Caratula = 'https://m.media-amazon.com/images/I/51R0tuI7goL._UF1000,1000_QL80_.jpg' WHERE ArtistaId = 101;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/DMXGonGive.jpg/220px-DMXGonGive.jpg' WHERE ArtistaId = 102;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/0/04/Lesley_Gore_Sings_of_Mixed-Up_Hearts_cover.jpg' WHERE ArtistaId = 103;
UPDATE canciones SET Caratula = 'https://images.genius.com/c6bd05831d3d4332e8a00e853c297ee4.400x400x1.jpg' WHERE ArtistaId = 104;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/f/f0/Come_and_Get_Your_Love_-_Redbone.jpeg' WHERE ArtistaId = 105;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/42f2703765ad6be59c106e0d8db10570/500x500.jpg' WHERE ArtistaId = 106;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/c0752505252130719511a891214b6f79/500x500.jpg' WHERE ArtistaId = 107;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/947835de11de3edaf23440d0078b0a92/264x264.jpg' WHERE ArtistaId = 108;
UPDATE canciones SET Caratula = 'https://upload.wikimedia.org/wikipedia/en/0/04/The_Runaways_%28album%29.png' WHERE ArtistaId = 109;
UPDATE canciones SET Caratula = 'https://cdns-images.dzcdn.net/images/cover/d6b27ca7cc8be42e40b5a20d87261927/264x264.jpg' WHERE ArtistaId = 110;
UPDATE canciones SET Caratula = 'https://lastfm.freetls.fastly.net/i/u/ar0/ac9c70c77769ec71d2ddad1d68fe2fa5.jpg' WHERE ArtistaId = 111;
UPDATE canciones SET Caratula = 'https://i.scdn.co/image/ab67616d0000b2736007f6cc186f038776e7a410' WHERE ArtistaId = 112;
UPDATE canciones SET Caratula = 'https://i1.sndcdn.com/artworks-4bT4A5569NcecbpJ-aV6iZA-t500x500.jpg' WHERE ArtistaId = 113;