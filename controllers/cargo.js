const BD = require('../config/config');

const renderIndex = (req, res) => {
    res.render("cargos/index");
}

const renderListar = async (req, res) => {
    // const listaCargos =[];
    sql='SELECT * FROM public."Cargo" ORDER BY "idCargo" ASC ';
    let result = await BD.open(sql);
    const listaCargos = result.rows.map(emp => ({
        'id': emp.idCargo,
        'cargo': emp.nombreCargo
    }));
    console.log(listaCargos);

    res.render("cargos/cargos",{
        cargos : listaCargos,
    });
}

const renderAdd = (req, res) => {
    res.render("cargos/add_cargo");
}

const renderAddCargo = async (req, res) => {
    let cod=req.body.cod;
    let cargo=req.body.cargo;
    //sql=`INSERT INTO public."Cargo"("idCargo", "nombreCargo") VALUES (${cod}, '${cargo}');`;
    sql=`CALL add_cargo('${cargo}');`;
    let result = await BD.open(sql);
    res.redirect('/cargos/listar');
}

const renderDeleteCargo = async (req, res) => {
    let cod=req.params.id;
    sql=`DELETE FROM public."Cargo"	WHERE "Cargo"."idCargo"=${cod};`;
    let result = await BD.open(sql);
    res.redirect('/cargos/listar');
}

const renderUPdate = async (req, res) => {
    // let listaCargos ;
    let cod=req.params.id;
    sql=`SELECT * FROM public."Cargo" WHERE "Cargo"."idCargo"=${cod} ORDER BY "idCargo" ASC `;
    let result = await BD.open(sql);
    const listaCargos = result.rows.map(emp=>({
        'id': emp.idCargo,
        'cargo':emp.nombreCargo
    }));
    console.log(listaCargos);
    res.render("cargos/edit_cargo",{
        cargos : listaCargos[0],
    });
}

const renderUpdateCargo = async (req, res) => {
    let cod=req.body.cod;
    let cargo=req.body.cargo;
    console.log(cod);
    console.log(cargo);
    sql=`UPDATE public."Cargo" SET "nombreCargo"='${cargo}' WHERE "idCargo"=${cod};`;
    let result = await BD.open(sql);
    res.redirect('/cargos/listar');
}

module.exports = { renderIndex, renderListar,renderAdd, renderAddCargo,renderDeleteCargo,renderUPdate, renderUpdateCargo }