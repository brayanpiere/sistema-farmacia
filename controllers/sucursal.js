const BD = require('../config/config');

const renderListar = async (req, res) => {
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

const renderAddSucursal = async (req, res) => {
    let cod=req.body.cod;
    let alias=req.body.alias;
    let ciudad=req.body.ciudad;
    sql=`INSERT INTO public."Sucursal"( "idSucursal", "nombreSucursal", ciudad, estado)  VALUES (${cod}, '${alias}', '${ciudad}', 'A');`;
    let result = await BD.open(sql);
    res.redirect('/sucursales/listar');
}

const renderUpdateSucursal = async (req, res) => {
    let cod=req.body.cod;
    let alias=req.body.alias;
    let ciudad=req.body.ciudad;
    sql=`UPDATE public."Sucursal" SET "nombreSucursal"='${alias}', ciudad='${ciudad}' WHERE "idSucursal"=${cod};`;
    let result = await BD.open(sql);
    res.redirect('/sucursales/listar');
}

module.exports = { renderListar, renderAddSucursal, renderUpdateSucursal }