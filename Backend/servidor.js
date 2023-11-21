import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import getLyrics from './lib/getLyrics.js';
import getSong from './lib/getSong.js';

const app = express();
app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'melomix'
});

app.listen(3000, () => {
  console.log("Servidor Iniciando...");
  console.log("");
});

conexion.connect(function (error) {
  if (error) {
    console.log("No fue posible la conexión");
    console.log("Error: " + error.message);
    console.log("Verifica tus credenciales y la configuración de la base de datos.");
    console.log("¡Inténtalo nuevamente más tarde!");
  } else {
    console.log("¡Conexión exitosa!");
    console.log("Explora, consulta y actualiza los datos con confianza.");
    console.log("");
    console.log("Recuerda cerrar la conexión al finalizar tus operaciones:");
    console.log("conexion.end();");
  }
});

//Llamar usuario por id
app.get('/Usuarios/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT usuarios.Id AS id, usuarios.Nombre AS Nombre, usuarios.Correo AS Correo, usuarios.Contrasenia AS Contrasenia, usuarios.Avatar AS Avatar, Roles.Nombre AS RolID FROM usuarios JOIN Roles ON usuarios.RolID = Roles.Id WHERE usuarios.Id = ?";
  conexion.query(sql, id, (error, resultado) => {
    if (error) {
      return res.status(500).json({ Error: "Error en la consulta de Usuarios Globales" });
    }
    return res.status(200).json({ Estatus: "Exitoso", Resultado: resultado });
  });
});

// Nivel Acceso para ver todos: Usuarios.
app.get('/Usuarios_Globales', (req, res) => {
  const sql = "SELECT usuarios.Id AS id, usuarios.Nombre AS Nombre, usuarios.Correo AS Correo, usuarios.Contrasenia AS Contrasenia, usuarios.Avatar AS Avatar, Roles.Nombre AS RolID FROM usuarios JOIN Roles ON usuarios.RolID = Roles.Id WHERE RolID = 2";
  conexion.query(sql, (error, resultado) => {
    if (error) {
      return res.status(500).json({ Error: "Error en la consulta de Usuarios Globales" });
    }
    return res.status(200).json({ Estatus: "Exitoso", Resultado: resultado });
  });
});

// Nivel Acceso para ver todos: Administradores.
app.get('/Usuarios_Administrativos', (req, res) => {
  const sql = "SELECT usuarios.Id AS id, usuarios.Nombre AS Nombre, usuarios.Correo AS Correo, usuarios.Contrasenia AS Contrasenia, usuarios.Avatar AS Avatar, Roles.Nombre AS RolID FROM usuarios JOIN Roles ON usuarios.RolID = Roles.Id WHERE RolID = 1";

  conexion.query(sql, (error, resultado) => {
    if (error) {
      return res.status(500).json({ Error: "Error en la consulta de Usuarios Administrativos" });
    }
    return res.status(200).json({ Estatus: "Exitoso", Resultado: resultado });
  });
});

//Inicio de Sesión. Acceso: Todos
app.post("/Sesion", (req, res) => {
    const { Correo, Contrasenia } = req.body;
    const sql = "SELECT id, Nombre, Correo, RolID, Avatar FROM usuarios WHERE Correo = ? AND Contrasenia = ?";
    const arrValores = [Correo, Contrasenia];
    
    conexion.query(sql, arrValores, (error, resultado) => {
        if (error) return res.json({ Error: "Error en la consulta" });
        if (resultado.length > 0) {
            const usuario = resultado[0];
            const token = jwt.sign({ 
                id: usuario.id,
                Nombre: usuario.Nombre,
                Avatar: usuario.Avatar,
                correo: usuario.Correo,
                Rol: usuario.RolID
            }, "secreto");
            return res.json({ Estatus: "EXITOSO", Resultado: usuario, token });
        } else {
            return res.json({ Estatus: "ERROR", Mensaje: "El correo o la contraseña son incorrectos" });
        }
    });
});

// Actualización de Nivel de Usuario, solo pueden verlo de nivel Administrativo: Administrador
app.put('/Up_Usuario/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'UPDATE usuarios SET RolID = 1 WHERE id = ?';

  conexion.query(sql, [id], (error, result) => {
    if (error) {
      console.error('Error al subir de nivel al usuario', error);
      res.status(400).json({ message: 'Ocurrió un error al subir de nivel al usuario' });
    } else if (result.affectedRows > 0) {
      res.json({ Estatus: "Exitoso", message: `Se subió de nivel al usuario con ID ${id}` });
    } else {
      res.status(404).json({ message: `No se encontró el usuario con ID ${id}` });
    }
  });
});

// Actualización de Nivel de Usuario, solo pueden verlo de nivel Administrativo: Administrador
app.put('/Down_Usuario/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'UPDATE usuarios SET RolID = 2 WHERE id = ?';

  conexion.query(sql, [id], (error, result) => {
    if (error) {
      console.error('Error al bajar de nivel al usuario', error);
      res.status(400).json({ Estatus: "Error", message: 'Ocurrió un error al bajar de nivel al usuario' });
    } else {
      if (result.affectedRows > 0) {
        res.json({ Estatus: "Exitoso", message: `Se bajó de nivel al usuario con ID ${id}` });
      } else {
        res.status(404).json({ Estatus: "Error", message: `No se encontró el usuario con ID ${id}` });
      }
    }
  });
});

// Borrar Usuario. Solo lo pueden usar: Nivel Administrativo: Administrador.
app.delete('/Delete_Usuario/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM usuarios WHERE id = ?';

  conexion.query(sql, [id], (error, result) => {
    if (error) {
      console.error('Error al eliminar el usuario', error);
      res.status(400).json({ Estatus: "Error", message: 'Ocurrió un error al eliminar el usuario' });
    } else {
      if (result.affectedRows > 0) {
        res.json({ Estatus: "Exitoso", message: `Usuario con ID ${id} eliminado correctamente` });
      } else {
        res.status(404).json({ Estatus: "Error", message: `No se encontró el usuario con ID ${id}` });
      }
    }
  });
});

// Agregar usuarios. TODOS
app.post("/Registro", (req, res) => {
  const { Nombre, Correo, Contrasenia } = req.body;
  const RolID = 2;
  const Fecha_Creacion = new Date();

  const sql = "INSERT INTO usuarios (Nombre, Correo, Contrasenia, RolID, Fecha_Creacion) VALUES (?, ?, ?, ?, ?)";
  const values = [Nombre, Correo, Contrasenia, RolID, Fecha_Creacion];

  conexion.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error al registrar el usuario: ", error);
      res.status(500).json({ Estatus: "Error", Mensaje: "Error al registrar el usuario" });
    } else {
      res.json({ Estatus: "Exitoso", Mensaje: "Usuario registrado exitosamente" });
    }
  });
});

app.post("/RegistroApi", (req, res) => {
  const { Nombre, Correo, Avatar } = req.body;
  const RolID = 2;
  const Contrasenia = Correo;
  const Fecha_Creacion = new Date();

  // Insertar el nuevo usuario
  const insertSql = "INSERT INTO usuarios (Nombre, Correo, Contrasenia, Avatar, RolID, Fecha_Creacion) VALUES (?, ?, ?,?, ?, ?)";
  const insertValues = [Nombre, Correo, Contrasenia, Avatar, RolID, Fecha_Creacion];

  conexion.query(insertSql, insertValues, (error, results) => {
    if (error) {
      console.error("Error al registrar el usuario: ", error);
      res.status(500).json({ Estatus: "Error", Mensaje: "Error al registrar el usuario" });
    } else {
      // Obtener los datos del usuario recién registrado
      const userId = results.insertId;
      const selectSql = "SELECT * FROM usuarios WHERE Id = ?";
      const selectValues = [userId];

      conexion.query(selectSql, selectValues, (selectError, selectResults) => {
        if (selectError) {
          console.error("Error al obtener los datos del usuario: ", selectError);
          res.status(500).json({ Estatus: "Error", Mensaje: "Error al obtener los datos del usuario" });
        } else {
          const usuarioRegistrado = selectResults[0];
          const token = jwt.sign({ 
            id: usuarioRegistrado.Id,
            Nombre: usuarioRegistrado.Nombre,
            Avatar: usuarioRegistrado.Avatar,
            correo: usuarioRegistrado.Correo,
            Rol: usuarioRegistrado.RolID
        }, "secreto");
          res.json({ Estatus: "Exitoso", Mensaje: "Usuario registrado exitosamente", Usuario: usuarioRegistrado, token });
        }
      });
    }
  });
});

app.post("/Registro_Admin", (req, res) => {
  const { Nombre, Correo, Contrasenia } = req.body;
  const RolID = 1;
  const Fecha_Creacion = new Date();

  const sql = "INSERT INTO usuarios (Nombre, Correo, Contrasenia, RolID, Fecha_Creacion) VALUES (?, ?, ?, ?, ?)";
  const values = [Nombre, Correo, Contrasenia, RolID, Fecha_Creacion];

  conexion.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error al registrar el usuario: ", error);
      res.status(500).json({ Estatus: "Error", Mensaje: "Error al registrar el usuario" });
    } else {
      res.json({ Estatus: "Exitoso", Mensaje: "Usuario registrado exitosamente" });
    }
  });
});

// Actualizar usuarios pasar el body.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/public/imagenes');
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '');
    cb(null, timestamp + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.put('/Usuario_Update/:id', upload.single('imagen'), (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  let imageUrl = null;

  if (req.file) {
    imageUrl = req.file.path;
    updatedUser.imagen = imageUrl;
  }

  const updateQuery = 'UPDATE usuarios SET ? WHERE id = ?';
  conexion.query(updateQuery, [updatedUser, userId], (err, results) => {
    if (err) {
      console.error('Error al actualizar el usuario: ' + err);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    } else {
      console.log('Usuario actualizado con éxito');
      res.status(200).json({ message: 'Usuario actualizado con éxito' });
    }
  });
});

// Artista para crear
app.post('/Artista_Insert', (req, res) => {
  const { Nombre, Foto, Biografia } = req.body;
  const query = 'INSERT INTO artistas (Nombre, Foto, Biografia) VALUES (?, ?, ?)';
  const values = [Nombre, Foto, Biografia];

  conexion.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar datos:', err);
      res.status(500).json({ error: 'Error al insertar datos en la base de datos' });
    } else {
      console.log('Datos insertados correctamente');
      res.status(201).json({ message: 'Artista creado exitosamente' });
    }
  });
});

// Artista para borrar
app.delete('/Artista_Delete/:id', (req, res) => {
  const idArtista = req.params.id;
  const query = 'DELETE FROM artistas WHERE Id = ?';

  conexion.query(query, idArtista, (err, result) => {
    if (err) {
      console.error('Error al eliminar el artista:', err);
      res.status(500).json({ error: 'Error al eliminar el artista de la base de datos' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Artista no encontrado' });
      } else {
        console.log('Artista eliminado correctamente');
        res.status(200).json({ message: 'Artista eliminado exitosamente' });
      }
    }
  });
});

// Artista para actualizar
app.put('/Artista_Update/:id', (req, res) => {
  const idArtista = req.params.id;
  const { Nombre, Foto, Biografia } = req.body;
  const query = 'UPDATE artistas SET Nombre = ?, Foto = ?, Biografia = ? WHERE Id = ?';
  const values = [Nombre, Foto, Biografia, idArtista];

  conexion.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el artista:', err);
      res.status(500).json({ error: 'Error al actualizar el artista en la base de datos' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Artista no encontrado' });
      } else {
        console.log('Artista actualizado correctamente');
        res.status(200).json({ message: 'Artista actualizado exitosamente' });
      }
    }
  });
});

// View de Artistas
app.get('/Artista', (req, res) => {
  const query = 'SELECT * FROM VW_Artistas';

  conexion.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de artistas:', err);
      res.status(500).json({ error: 'Error al obtener la lista de artistas de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.get('/MejoreArtista', (req, res) => {
  const query = 'SELECT * FROM VW_Artistas_Con_Mas_Canciones';

  conexion.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de artistas:', err);
      res.status(500).json({ error: 'Error al obtener la lista de artistas de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.get('/Artistas/:id', (req, res) => {
  const idArtista = req.params.id;
  const query = 'SELECT * FROM VW_Artistas where Id = ?';

  conexion.query(query, idArtista, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de artistas:', err);
      res.status(500).json({ error: 'Error al obtener la lista de artistas de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});

//View de Canciones
app.get('/canciones', (req, res) => {
  const query = 'SELECT * FROM VW_Canciones ORDER BY CancionId';

  conexion.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de canciones:', err);
      res.status(500).json({ error: 'Error al obtener la lista de canciones de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.get('/cancionesR', (req, res) => {
  const query = 'SELECT * FROM VW_Canciones ORDER BY RAND() LIMIT 50';

  conexion.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de canciones:', err);
      res.status(500).json({ error: 'Error al obtener la lista de canciones de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.get('/MeGustacanciones', (req, res) => {
  const query = 'SELECT * FROM VW_Canciones_Con_Mas_MeGusta';

  conexion.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de canciones:', err);
      res.status(500).json({ error: 'Error al obtener la lista de canciones de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.get('/cancionesA/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM VW_Canciones WHERE ArtistaId = ?';

  conexion.query(query, id, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de canciones:', err);
      res.status(500).json({ error: 'Error al obtener la lista de canciones de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.get('/canciones/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM VW_Canciones where CancionId = ?';

  conexion.query(query, id, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de canciones:', err);
      res.status(500).json({ error: 'Error al obtener la lista de canciones de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta POST para crear una nueva canción
app.post('/canciones', (req, res) => {
  const { Nombre, Caratula, Direccion, Video, ArtistaId, Duracion } = req.body;
  const query = 'INSERT INTO canciones (Nombre, Caratula, Direccion, Video, ArtistaId, Duracion) VALUES (?, ?, ?, ?, ?,?)';
  const values = [Nombre, Caratula, Direccion, Video, ArtistaId, Duracion];

  conexion.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar datos de la canción:', err);
      res.status(500).json({ error: 'Error al insertar datos de la canción en la base de datos' });
    } else {
      console.log('Canción creada correctamente');
      res.status(201).json({ message: 'Canción creada exitosamente' });
    }
  });
});

// Ruta PUT para actualizar una canción por su ID
app.put('/canciones/:id', (req, res) => {
  const idCancion = req.params.id;
  const { Nombre, Caratula, Direccion, Video, ArtistaId } = req.body;
  const query = 'UPDATE canciones SET Nombre = ?, Caratula = ?, Direccion = ?, Video = ?, ArtistaId = ? WHERE Id = ?';
  const values = [Nombre, Caratula, Direccion, Video, ArtistaId, idCancion];

  conexion.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar la canción:', err);
      res.status(500).json({ error: 'Error al actualizar la canción en la base de datos' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Canción no encontrada' });
      } else {
        console.log('Canción actualizada correctamente');
        res.status(200).json({ message: 'Canción actualizada exitosamente' });
      }
    }
  });
});

// Ruta DELETE para eliminar una canción por su ID
app.delete('/canciones/:id', (req, res) => {
  const idCancion = req.params.id;
  const query = 'DELETE FROM canciones WHERE Id = ?';

  conexion.query(query, idCancion, (err, result) => {
    if (err) {
      console.error('Error al eliminar la canción:', err);
      res.status(500).json({ error: 'Error al eliminar la canción de la base de datos' });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Canción no encontrada' });
      } else {
        console.log('Canción eliminada correctamente');
        res.status(200).json({ message: 'Canción eliminada exitosamente' });
      }
    }
  });
});

app.get("/VerificarCorreo/:correo", (req, respuesta) => {
  const Correo = req.params.correo;
  const query = "SELECT * FROM usuarios WHERE Correo = ?";
  conexion.query(query, [Correo], (error, resultados) => {
    if (error) {
      return respuesta.status(500).json({ Error: "Error en la consulta" });
    } else {
      if (resultados.length > 0) {
        const usuarioRegistrado = resultados[0];
        const token = jwt.sign({ 
          id: usuarioRegistrado.Id,
          Nombre: usuarioRegistrado.Nombre,
          Avatar: usuarioRegistrado.Avatar,
          correo: usuarioRegistrado.Correo,
          Rol: usuarioRegistrado.RolID
      }, "secreto");
        return respuesta.json({ Estatus: "EXISTE",token });
      } else {
        return respuesta.json({ Estatus: "NO_EXISTE" });
      }
    }
  });
});

app.get('/cantidades', (req, res) => {
  const query = 'SELECT * FROM VW_Cantidad';

  conexion.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de cantidades:', err);
      res.status(500).json({ error: 'Error al obtener la lista de canciones de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});

// --------------------------------- TODO LO DE ME GUSTA -----------------------------------------------------
app.get('/megusta/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM VW_MeGusta where UsuarioID = ?';

  conexion.query(query,id, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de megusta:', err);
      res.status(500).json({ error: 'Error al obtener la lista de canciones de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.delete('/megusta/:Id', (req, res) => {
  const Id = req.params.Id;
  const query = 'DELETE FROM megusta WHERE Id = ?';

  conexion.query(query, [Id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la entrada de "Me Gusta"', err);
      res.status(500).json({ error: 'Error al eliminar la entrada de "Me Gusta" de la base de datos' });
    } else {
      res.status(200).json({ message: 'Entrada de "Me Gusta" eliminada correctamente' });
      console.error('eliminar la entrada de "Me Gusta"');
    }
  });
});

app.delete('/megusta_borrarTodo/:usuarioId', (req, res) => {
  const usuarioId = req.params.usuarioId;
  const query = 'DELETE FROM megusta WHERE UsuarioID = ?';

  conexion.query(query, [usuarioId], (err, result) => {
    if (err) {
      console.error('Error al eliminar todas las entradas de "Me Gusta" del usuario', err);
      res.status(500).json({ error: 'Error al eliminar las entradas de "Me Gusta" de la base de datos' });
    } else {
      res.status(200).json({ message: 'Todas las entradas de "Me Gusta" del usuario fueron eliminadas correctamente' });
    }
  });
});


app.post('/megusta_usuario', (req, res) => {
  const { usuarioId, cancionId } = req.body;
  const query = 'INSERT INTO megusta (UsuarioID, CancionID) VALUES (?, ?)';

  conexion.query(query, [usuarioId, cancionId], (err, result) => {
    if (err) {
      console.error('Error al agregar entrada de "Me Gusta"', err);
      res.status(500).json({ error: 'Error al agregar entrada de "Me Gusta" a la base de datos' });
    } else {
      res.status(200).json({ message: 'Entrada de "Me Gusta" agregada correctamente' });
    }
  });
});

// ----------------------------------------------------------------------------------------------------------

// ---------------------------------   TODO LO DE HISTORIAL -------------------------------------------------
app.get('/historial/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM VW_Historial where UsuarioID = ?';

  conexion.query(query,id, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de historial', err);
      res.status(500).json({ error: 'Error al obtener la lista de canciones de la base de datos' });
    } else {
      res.status(200).json(result);
    }
  });
});

app.delete('/historialdelete/:Id', (req, res) => {
  const Id = req.params.Id;
  const query = 'DELETE FROM historial WHERE Id = ?';

  conexion.query(query, [Id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la entrada del historial', err);
      res.status(500).json({ error: 'Error al eliminar la entrada del historial de la base de datos' });
    } else {
      res.status(200).json({ message: 'Entrada del historial eliminada correctamente' });
    }
  });
});

app.delete('/historial_borrarTodo/:usuarioId', (req, res) => {
  const usuarioId = req.params.usuarioId;
  const query = 'DELETE FROM historial WHERE UsuarioID = ?';

  conexion.query(query, [usuarioId], (err, result) => {
    if (err) {
      console.error('Error al eliminar todas las entradas del historial del usuario', err);
      res.status(500).json({ error: 'Error al eliminar las entradas del historial de la base de datos' });
    } else {
      res.status(200).json({ message: 'Todas las entradas del historial del usuario fueron eliminadas correctamente' });
    }
  });
});


app.post('/historial', (req, res) => {
  const { usuarioId, cancionId } = req.body;
  const query = 'INSERT INTO historial (UsuarioID, CancionID) VALUES (?, ?)';

  conexion.query(query, [usuarioId, cancionId], (err, result) => {
    if (err) {
      console.error('Error al agregar entrada al historial', err);
      res.status(500).json({ error: 'Error al agregar entrada al historial en la base de datos' });
    } else {
      res.status(200).json({ message: 'Entrada del historial agregada correctamente' });
    }
  });
});

// ----------------------------------------------------------------------------------------------------------

app.get('/biografia/:id', async (req, res) => {
  try {
    // Validar y limpiar el nombre (aquí se asume que es seguro, pero en producción, deberías validar y limpiar adecuadamente)
    const nombre = req.params.id;

    const urls = ["https://es.wikipedia.org/w/api.php", "https://en.wikipedia.org/w/api.php"];

    // Intentar obtener la información de Wikipedia desde las URLs en orden
    for (const url of urls) {
      const params = {
        action: 'query',
        format: 'json',
        titles: nombre,
        prop: 'extracts',
      };

      const response = await axios.get(url, { params });
      const pages = response.data.query.pages;
      const pageId = Object.keys(pages)[0];

      // Si no hay errores, responder con el extracto y salir del bucle
      if (!pages[pageId].hasOwnProperty('missing')) {
        const extract = pages[pageId].extract;
        return res.status(200).json( extract );
      }
    }

    // Si ninguna solicitud tiene éxito, responder con un mensaje de error
    res.status(404).json({ error: 'No se encontró información en Wikipedia.' });

  } catch (error) {
    console.error("Error al buscar en Wikipedia:", error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});
app.get('/youtube/:id', (req, res) => {
  const nombre = req.params.id;
  const apiKey = 'AIzaSyC-JzIN98BieJH5F3NFBhWbXX0A0mceRhk';
  const url = 'https://www.googleapis.com/youtube/v3/search';
  const params = {
    part: 'snippet',
    q: nombre,
    type: 'video',
    key: apiKey,
  };
  return axios.get(url, { params })
    .then(response => {
      res.status(200).json(response.data.items);
    })
    .catch(error => {
      console.error('Error al buscar videos en YouTube:', error);
    });
});
app.get('/letras/:artista/:cancion', (req, res) => {
  const artista = req.params.artista;
  const cancion = req.params.cancion;
  const options = {
    apiKey: 'jJYdxIWKFaKtL6Pk3WyyNw4eilmwI0rFIbWdUPz_Czw2aHVfcado7azq2ZdsYTD1',
    title: cancion,
    artist: artista,
    optimizeQuery: true
  }

  getLyrics(options).then((lyrics) => { res.status(200).json(`${lyrics}`) });
  getSong(options).then((song) => console.log());
});

app.get('/music', (req, res) => {
  const searchTerm = 'Music'; // Aqui pasas el término. Buscalo aqui: https://www.nytimes.com/subscription/all-access?campaignId=8HHXJ&ds_c=71700000105584844&gad_source=1&gclid=CjwKCAiAu9yqBhBmEiwAHTx5p8NoW56hQBBrTck3ug4TqWa3vwmhxwrVTawuasyP0OTWUZBQYqMqqRoCyCoQAvD_BwE&gclsrc=aw.ds 
  const apiUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  const apiKey = '3UqmIPMMCYATjTs2xzWkwAPWJ3tdwN9W';

  axios.get(apiUrl, {
    params: {
      q: searchTerm,
      'api-key': apiKey,  // Utiliza 'api-key' como nombre del parámetro
    },
  })
  .then(response => {
    const docs = response.data.response.docs;
    const news = docs.map(doc => ({
      title: doc.headline.main,
      abstract: doc.abstract,
      date:doc.pub_date,
      url: doc.web_url,
    }));

    res.json(news);
  })
  .catch(error => {
    console.error('Error al obtener datos:', error.message);
    console.error('Detalles del error:', error.response ? error.response.data : 'No hay respuesta');
    res.status(500).send('Error al obtener noticias de música.');
  });
});