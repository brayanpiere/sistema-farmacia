// Invocando a la base de datos
const BD = require('../config/config');

const renderIndex = (req, res) => {
    res.render("compras/index");
}

const renderRealizar = async (req, res) => {
    const sql = 'select p."nombreProducto", p."composicion", pre."nombrePresentacion", lot."stock" \
    from "Producto" p, "Presentacion" pre, "LoteProducto" lot \
    where p."idPresentacion" = pre."idPresentacion" \
    and lot."idProducto" = p."idProducto" \
    and lot."estado" = \'Activo\''

    // rows forma parte del result de la consulta sql
    // const result = await BD.open(sql)
    const { rows } = await BD.open(sql)
    // console.log(rows);
    res.render("compras/realizar", { prods: rows });
}

module.exports = { renderIndex, renderRealizar }