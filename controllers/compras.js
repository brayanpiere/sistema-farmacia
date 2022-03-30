// Invocando a la base de datos
const BD = require('../config/config');

const renderIndex = (req, res) => {
    res.render("compras/index");
}

const renderRealizar = async (req, res) => {
    // Productos
    const query1 = {
        text: 'select p."idProducto", p."nombreProducto", p."composicion", pre."idPresentacion", pre."nombrePresentacion", sum(lot."stock") as stock \
        from "Producto" p, "Presentacion" pre, "LoteProducto" lot \
        where p."idPresentacion" = pre."idPresentacion" \
        and lot."idProducto" = p."idProducto" \
        and lot."estado" = $1 \
        group by p."idProducto", pre."idPresentacion"',
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
    // console.log(productos.rows);
    const proveedores = await BD.open(query2)
    // console.log(rows);
    res.render("compras/realizar", { prods: productos.rows, provs: proveedores.rows });
}

const realizarCompra = (req, res) => {
    const { items } = req.body
    // const compraData = req.body
    const compraArr = []
    for (const item of items) {
        const compraObj = {
            lote: item.lote,
            fechaCaducidad: item.fechavenc,
            costoProducto: item.costo,
            stock: item.stock
        }
        compraArr.push(compraObj)
    }
    // Para agregar a tabla LoteProducto
    res.send(JSON.stringify(compraArr))
}

module.exports = { renderIndex, renderRealizar, realizarCompra }