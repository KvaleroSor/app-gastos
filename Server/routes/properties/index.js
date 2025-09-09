/**
 * @file /routes/users/index.js
 * @description Enrutador principal para las rutas relacionadas con las propiedades.
 * 
 * Este archivo agrupa y exporta todas las sub-rutas de la API para la gestión de propiedades.
 * Cada sub-ruta se corresponde con una acción específica (insertar, borrar, obtener todos).
 * 
 * - /delete: Gestiona el borrado de propiedades.
 * - /getAll: Gestiona la obtención de todos los propiedades.
 * - /insert: Gestiona la inserción de nuevos propiedades.
 * - /update: Gestiona la actualización de propiedades.
 */

const express = require("express");
const router = express.Router();

// router.use("/delete", require("./delete_property_by_id"));
// router.use("/getAll", require("./get_all_properties"));
router.use("/create", require("./create_property"));
router.use("/update", require("./update_property"));

module.exports = router;