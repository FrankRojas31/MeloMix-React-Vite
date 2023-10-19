import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app=express();
app.use(cors());
app.use(express.json())

const conexion=mysql.createConnection({
    server:'localhost',
    user:'root',
    password:'',
    database:'db_mscpc'
});

app.listen(8081,()=>{
    console.log("Servidor Iniciando...");
    console.log("")
});

conexion.connect(function(error) {
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


//Llamada a los usuarios para tabla de Administracion Principal. 

// Nivel Acceso para ver todos: Administrador.
app.get('/Usuarios', (peticion,respuesta) => {
    const sql ="SELECT * FROM usuarios";
    conexion.query(sql, (error,resultado) => {
        if (error) {
            return respuesta.status(500).json({ Error: "Error en la consulta de usuarios" });
        }
        return respuesta.status(200).json({ Estatus: "Exitoso", Resultado: resultado });
    });
});

//Inicio de Sesión. Acceso: Todos
app.post("/Sesion", (peticion, respuesta) => {
    const { Correo, Contrasenia } = peticion.body;
    const arrValores = [Correo, Contrasenia];
    const sql = "SELECT * FROM Usuarios WHERE correo = ? AND contrasenia = ?";
    conexion.query(sql, arrValores, (error, resultado) => {
        if (error) return respuesta.json({ Error: "Error en la consulta" });
        if (resultado.length > 0) {
        const usuario = resultado[0];
            const token = jwt.sign({ 
                Id_usuario: usuario.id,
                Nombre: usuario.Nombre,
                Apellido: usuario.Apellido,
                Nivel_Administrativo: usuario.Nivel_Administrativo 
            }, "secreto");
            return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado, token });
        } else {
        return respuesta.json({ Estatus: "ERROR", Mensaje: "El correo o la contraseña son incorrectos" });
        }
    });
});


