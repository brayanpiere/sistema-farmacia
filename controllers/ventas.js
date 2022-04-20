// Invocando a la base de datos
const BD = require('../config/config');

const renderIndex = (req, res) => {
    res.render("ventas/index");
}

const renderRealizar = async (req, res) => {
    const query3 = {
        text: 'select op."idTipoOperacion", op."nombreTipoOperacion" \
        from "TipoOperacion" op'
    }

    const opData = await BD.open(query3)

    const query = Object.values(req.query)[0]
    // console.log(!!query)
    if(!!query) {
        const txt = {
            text: `select p."idProducto", p."nombreProducto", p."composicion", sum(lot."stock") as stock, p."fila" || ' - ' || p."columna" as anaquel, pre."nombrePresentacion", pr."precioPorUnidad"
            from "Producto" p, "Presentacion" pre, "PrecioProducto" pr, "LoteProducto" lot
            where p."idProducto" = lot."idProducto"
            and p."idPresentacion" = pre."idPresentacion"
            and p."idProducto" = pr."idProducto"
            and p."idProducto" in (select p2."idProducto"
                                    from "Producto" p2
                                    where p2."nombreProducto" ILIKE $1)
            and lot."fechaCaducidad" - CURRENT_DATE >= 0
            group by p."idProducto", pre."idPresentacion", lot."idProducto", pr."idProducto", pr."precioPorUnidad"`,
            values: [`%${ query }%`]
        }
        const resp = await BD.open(txt)
        // console.log(resp.rows)
        return res.render("ventas/realizar", { busqueda: resp.rows, tipoops: opData.rows })
    }
    res.render("ventas/realizar", { busqueda: null, tipoops: opData.rows })
}

module.exports = { renderIndex, renderRealizar }