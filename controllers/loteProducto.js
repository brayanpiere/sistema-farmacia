const BD = require('../config/config');

const renderListar = async (req, res) => {
    const listaProductos =[];
    sql='SELECT "Producto"."idProducto", "Producto"."nombreProducto", "Producto"."composicion", "Producto"."estado","Producto"."fila","Producto"."columna","Laboratorio"."nombreLaboratorio","Presentacion"."nombrePresentacion","Producto"."minimoStock" FROM public."Producto", public."Laboratorio", public."Presentacion" WHERE "Producto"."idLaboratorio"="Laboratorio"."idLaboratorio" AND "Producto"."idPresentacion"="Presentacion"."idPresentacion" ORDER BY "idProducto" ASC ';
    let result = await BD.open(sql);
    result.rows.map(pro=>{
        let EmpSchema = {
            'id': pro.idProducto,
            'nombre':pro.nombreProducto,
            'composicion': pro.composicion,
            'est':pro.estado,
            'fila': pro.fila,
            'columna':pro.columna,
            'lab': pro.nombreLaboratorio,
            'presentacion': pro.nombrePresentacion,
            'minstock': pro.minimoStock,
        }
        listaProductos.push(EmpSchema)
    });

    res.render("producto/producto",{
        productos : listaProductos,
    });
}

module.exports={renderListar}