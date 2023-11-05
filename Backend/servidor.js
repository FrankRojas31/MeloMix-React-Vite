import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import jwt from 'jsonwebtoken';

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
  conexion.query(sql, id,(error, resultado) => {
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
                Id_usuario: usuario.id,
                Nombre: usuario.Nombre,
                RolID: usuario.RolID,
                picture: usuario.Avatar
            }, "secreto");
            return res.json({ Estatus: "EXITOSO", Resultado: resultado, token });
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

// Actualizar usuarios pasar el body.
app.put('/Usuario_Update/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
  
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

//View de Canciones
  app.get('/canciones', (req, res) => {
    const query = 'SELECT * FROM VW_Canciones';
  
    conexion.query(query, (err, result) => {
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
    const { Nombre, Caratula, Direccion, Video, Duracion, ArtistaId } = req.body;
    const query = 'INSERT INTO canciones (Nombre, Caratula, Direccion, Video, Duracion, ArtistaId) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [Nombre, Caratula, Direccion, Video, Duracion, ArtistaId];
  
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
    const { Nombre, Caratula, Direccion, Video, Duracion, ArtistaId } = req.body;
    const query = 'UPDATE canciones SET Nombre = ?, Caratula = ?, Direccion = ?, Video = ?, Duracion = ?, ArtistaId = ? WHERE Id = ?';
    const values = [Nombre, Caratula, Direccion, Video, Duracion, ArtistaId, idCancion];
  
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

  app.get("/VerificarCorreo", (peticion, respuesta) => {
    const { Correo } = peticion.query;
    const query = "SELECT * FROM VW_Usuarios WHERE Correo = ?";
    conexion.query(query, [Correo], (error, resultados) => {
      if (error) {
        return respuesta.status(500).json({ Error: "Error en la consulta" });
      } else {
        if (resultados.length > 0) {
          return respuesta.json({ Estatus: "EXISTE" });
        } else {
          return respuesta.json({ Estatus: "NO_EXISTE" });
        }
      }
    });
  });