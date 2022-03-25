// Invocando a la base de datos
const BD = require('../config/config');

const renderIndex = (req, res) => {
    res.render("compras/index");
}

const renderRealizar = async (req, res) => {
    // Productos
    const query1 = {
        text: 'select p."idProducto", p."nombreProducto", p."composicion", pre."idPresentacion", pre."nombrePresentacion", lot."stock" \
        from "Producto" p, "Presentacion" pre, "LoteProducto" lot \
        where p."idPresentacion" = pre."idPresentacion" \
        and lot."idProducto" = p."idProducto" \
        and lot."estado" = $1',
        values: ['Activo']
    }

    // Proveedores
    const query2 = {
        text: 'select pro."idProveedor", pro."nombres" \
        from "Proveedor" pro \
        where pro."estado" = $1',
        values: ['Activo']
    }

    const productos = await BD.open(query1)
    const proveedores = await BD.open(query2)
    // console.log(rows);
    res.render("compras/realizar", { prods: productos.rows, provs: proveedores.rows });
}

module.exports = { renderIndex, renderRealizar }