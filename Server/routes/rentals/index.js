/**
 * @file /routes/rentals/index.js
 * @description Enrutador principal para las rutas relacionadas con los alquileres de las propiedades.
 * 
 * Este archivo agrupa y exporta todas las sub-rutas de la API para la gestión de los alquileres
 * de las propiedades.
 * Cada sub-ruta se corresponde con una acción específica (insertar, borrar, obtener todos).
 * 
 * - /delete: Gestiona el borrado del alquiler de las propiedades.
 * - /getAll: Gestiona la obtención de todos los alquileres de las propiedades.
 * - /create: Gestiona la inserción de nuevos alquileres en las propiedades.
 * - /update: Gestiona la actualización de los alquileres de las propiedades.
 */

const express = require("express");
const router = express.Router();

// router.use("/delete", require("./delete_rental"));
// router.use("/getAll", require("./get_all_rentals"));
router.use("/create", require("./new_rental"));
// router.use("/update", require("./update_rental"));

module.exports = router;