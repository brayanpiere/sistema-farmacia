const BD = require('../config/config');

const renderListar = async (req, res) => {
    // const listaCargos =[];
    sql='SELECT * FROM public."Sucursal" ORDER BY "idSucursal" ASC ';
    let result = await BD.open(sql);
    const listaSucursales = result.rows.map(emp => ({
        'id': emp.idSucursal,
        'alias': emp.nombreSucursal,
        'ciudad': emp.ciudad,
        'estado': emp.estado
    }));
    console.log(listaSucursales);

    res.render("sucursal/sucursal",{
        sucursales : listaSucursales,
    });
}

module.exports = { renderListar }