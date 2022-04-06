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

    // Tipo Operacion
    const query3 = {
        text: 'select op."idTipoOperacion", op."nombreTipoOperacion" \
        from "TipoOperacion" op'
    }

    const productos = await BD.open(query1)
    // console.log(productos.rows);
    const proveedores = await BD.open(query2)
    // console.log(rows);
    const tipooperacion = await BD.open(query3)
    res.render("compras/realizar", { prods: productos.rows, provs: proveedores.rows, tipoops: tipooperacion.rows });
}

const realizarCompra = async (req, res) => {
    try {
        await BD.open('BEGIN')
        // <--------------------- BEGIN OF TRANSACTION --------------------->
        
        // Agregando compras
        const compraData = req.body
        // Para boleta
        const addCompraBoleta = {
            text: `INSERT INTO public."Compra"("fechaCompra", "subtotal", "igv", "total", "estado", "idUsuario", "idProveedor", "idTipoOperacion") VALUES ('${compraData.fechacompra}', ${compraData.subtotal}, ${compraData.igv}, ${compraData.total}, 'Activo', 3, ${compraData.proveedor}, ${compraData.tipocomp}) RETURNING "idCompra"`
        }
        // Para factura
        const addCompraFactura = {
            text: `INSERT INTO public."Compra"("fechaCompra", "subtotal", "igv", "total", "numSerie", "numFactura", "estado", "idUsuario", "idProveedor", "idTipoOperacion") VALUES ('${compraData.fechacompra}', ${compraData.subtotal}, ${compraData.igv}, ${compraData.total}, ${compraData.nroserie}::BIGINT, ${compraData.nrofactura}::BIGINT, 'Activo', 3, ${compraData.proveedor}, ${compraData.tipocomp}) RETURNING "idCompra"`
        }

        const insertCompra = { value: null }
        if (compraData.tipocomp == 2) {
            // console.log("Dentro de factura");
            insertCompra.value = await BD.open(addCompraFactura)
        } else {
            // console.log("Dentro de boleta");
            insertCompra.value = await BD.open(addCompraBoleta)
        }
        const returnedIdCompra = insertCompra.value.rows[0].idCompra

        // Agregando lotes
        const { items } = req.body
        for (const item of items) {
            const addlote = {
                text: `INSERT INTO public."LoteProducto"("lote", "fechaCaducidad", "costoProducto", "stock", "estado", "idProducto") VALUES ('${item.lote}', '${item.fechavenc}', ${item.costo}, ${item.stock}, 'Activo', ${item.id}) RETURNING "idLoteProducto"`
            }
            const insert = await BD.open(addlote)
            const returnedIdLoteProd = insert.rows[0].idLoteProducto

            const addDetalleCompra = {
                text: `INSERT INTO public."DetalleCompra"("idLoteProducto", "idCompra") VALUES (${returnedIdLoteProd}, ${returnedIdCompra})`
            }
            const insertDetalle = await BD.open(addDetalleCompra)
        }

        res.send(req.body)
        // <--------------------- END OF TRANSACTION --------------------->
        await BD.open('COMMIT')
    } catch (e) {
        await BD.open('ROLLBACK')
        console.log(e.message);
    }
}

module.exports = { renderIndex, renderRealizar, realizarCompra }