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

// Nivel Acceso para ver todos: Usuarios.
app.get('/Usuarios_Globales', (req, res) => {
    const sql = "SELECT id, Nombre, Correo, RolID FROM usuarios WHERE RolID = 2";
    conexion.query(sql, (error, resultado) => {
        if (error) {
            return res.status(500).json({ Error: "Error en la consulta de Usuarios Globales" });
        }
        return res.status(200).json({ Estatus: "Exitoso", Resultado: resultado });
    });
});

// Nivel Acceso para ver todos: Administradores.
app.get('/Usuarios_Administrativos', (req, res) => {
    const sql = "SELECT id, Nombre, Correo, RolID FROM usuarios WHERE RolID = 1";

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
    const sql = "SELECT id, Nombre, Correo, RolID FROM usuarios WHERE Correo = ? AND Contrasenia = ?";
    const arrValores = [Correo, Contrasenia];
    
    conexion.query(sql, arrValores, (error, resultado) => {
        if (error) return res.json({ Error: "Error en la consulta" });
        if (resultado.length > 0) {
            const usuario = resultado[0];
            const token = jwt.sign({ 
                Id_usuario: usuario.id,
                Nombre: usuario.Nombre,
                RolID: usuario.RolID 
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
  
    conexion.query(sql, values, (error, res) => {
        if (error) {
            console.error("Error al registrar el usuario: ", error);
            res.status(500).json({ Estatus: "Error", Mensaje: "Error al registrar el usuario" });
        } else {
            res.json({ Estatus: "Exitoso", Mensaje: "Usuario registrado exitosamente" });
        }
    });
});

app.put('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
  
    const updateQuery = 'UPDATE usuarios SET ? WHERE id = ?';
    db.query(updateQuery, [updatedUser, userId], (err, res) => {
      if (err) {
        console.error('Error al actualizar el usuario: ' + err);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
      } else {
        console.log('Usuario actualizado con éxito');
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
      }
    });
  });