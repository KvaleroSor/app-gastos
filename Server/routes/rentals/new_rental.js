const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
    const { start_date, end_date, month_price, property_id } = req.body;

    const { userId = user_id, role = user_role } = req.user;

    /**
     * Comprobamos que los datos que nos llegan desde el cuerpo de la consulta
     * no son:
     *
     *  - Null.
     *  - Undefined.
     *  _ "<cadena vacia>".
     */

    if (!start_date || !end_date || !month_price || !property_id) {
        return res
            .status(400)
            .json({ error: "Faltan campos obilgatorios por llenar!" });
    }

    try{
        let new_rental;

        if(!user_id)
    }catch(e){
        console.log(e);
        res.status(500).json({ error: "Error al insertar el alquiler."});
    }
});

module.exports = router;
