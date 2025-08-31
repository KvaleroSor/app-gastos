const express = require("express");
const app = express();
const usersRouter = require("./routes/users/index");
const propertiesRouter = require("./routes/properties/index");
const testRouter = require("./routes/test/test");

/**
 * @file app.js
 * @description Archivo principal del servidor Express.
 * 
 * Este archivo es el punto de entrada de la aplicación. Se encarga de:
 * - Crear una instancia de Express.
 * - Configurar middlewares, como express.json() para parsear el cuerpo de las peticiones.
 * - Importar y registrar los enrutadores para las diferentes rutas de la API.
 * - Definir una ruta raíz de bienvenida.
 * - Iniciar el servidor en el puerto especificado.
 */

/**
 * =======================================
 *          PLAN DE ACCIÓN USERS 🚀
 * =======================================
 * [✅] Implementar el hashing de contraseñas con bcrypt
 * [✅] Crear un endpoint de login (/users/login)
 * [✅] Generar un Token JWT en el login con jsonwebtoken
 * [✅] Crear un middleware para proteger rutas
 * [✅] Aplicar el middleware a las rutas que necesiten protección
 * [✅] Añadir lógica de autorización en los endpoints (ej. solo borrar el propio usuario)
 */

/**
 * =======================================
 *          PLAN DE ACCIÓN PROPERTIES 🚀
 * =======================================
 * [❌] Implementar el hashing de contraseñas con bcrypt
 * [❌] Crear un endpoint de login (/users/login)
 * [❌] Generar un Token JWT en el login con jsonwebtoken
 * [❌] Crear un middleware para proteger rutas
 * [❌] Aplicar el middleware a las rutas que necesiten protección
 * [❌] Añadir lógica de autorización en los endpoints (ej. solo borrar el propio usuario)
 */

app.use(express.json());

app.get("/", (req, res) => {
    res.send(
        "¡Bienvenido al backend de Inversión Inmobiliaria y Registro de Gastos 🚀"
    );
});

app.use("/users", usersRouter);
app.use("/properties", propertiesRouter);
app.use("/test", testRouter);



app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000 🚀");
});
