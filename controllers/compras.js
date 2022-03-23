// Invocando a la base de datos
const BD = require('../config/config');

const renderIndex = (req, res) => {
    res.render("compras/index");
}

const renderRealizar = async (req, res) => {
    const sql = 'select p."nombreProducto", p."composicion", pre."nombrePresentacion" \
    from "Producto" p, "Presentacion" pre \
    WHERE p."idPresentacion" = pre."idPresentacion"'

    const { rows } = await BD.open(sql)
    // Rows forma parte del result de la consulta sql
    console.log(rows);
    res.render("compras/realizar", { prods: rows });
}

module.exports = { renderIndex, renderRealizar }