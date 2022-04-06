const BD = require('../config/config');

const renderListar = async (req, res) => {
    sql = 'SELECT * FROM public."Usuario" ORDER BY "idUsuario" ASC ';
    let result = await BD.open(sql);
    const listaUsuarios = result.rows.map(emp => ({
        'id': emp.idUsuario,
        'pass': emp.contraseña,
        'estado': emp.estado,
        'idEmp': emp.idEmpleado,
        'idSuc': emp.idSucursal,
    }));
    console.log(listaUsuarios);

    res.render("usuario/usuario", {
        usuarios: listaUsuarios,
    });
}

const renderListarXEmp = async (req, res) => {

    let cod = req.params.id;
    const listaEmpleados = [];
    sql1 = `SELECT * FROM public."Empleado" WHERE "idEmpleado"= ${cod} ORDER BY "idEmpleado" ASC  `;
    let result1 = await BD.open(sql1);
    result1.rows.map(emp => {
        let EmpSchema = {
            'id': emp.idEmpleado,
            'nombres': emp.nombres,
            'apellidos': emp.apellidos,
            'dni': emp.dni,
            'telefono': emp.telefono,
            'email': emp.email,
            'salario': emp.salario,
            'estado': emp.estado,
            'idCargo': emp.idCargo,
        }
        listaEmpleados.push(EmpSchema)
    });

    sql = `SELECT * FROM public."Usuario" WHERE "idEmpleado"= ${cod} ORDER BY "idUsuario" ASC `;
    let result = await BD.open(sql);
    const listaUsuarios = result.rows.map(emp => ({
        'id': emp.idUsuario,
        'pass': emp.contraseña,
        'estado': emp.estado,
        'idEmp': emp.idEmpleado,
        'idSuc': emp.idSucursal,
    }));

    sql3='SELECT * FROM public."Sucursal" ORDER BY "idSucursal" ASC ';
    let result3 = await BD.open(sql3);
    const listaSucursales = result3.rows.map(emp => ({
        'id': emp.idSucursal,
        'alias': emp.nombreSucursal,
        'ciudad': emp.ciudad,
        'estado': emp.estado
    }));

    res.render("usuario/usuarioEmp", {
        usuarios: listaUsuarios,
        empleado: listaEmpleados[0],
        sucursales : listaSucursales,
    });
}

const renderAddUsuarioEmp = async (req, res) => {
    let cod=req.body.cod;
    let pass=req.body.pass;
    let idEmpleado=req.body.idEmpleado;
    let idSucursal=req.body.idSucursal;
    console.log(cod);
    console.log(pass);
    console.log(idEmpleado);
    console.log(idSucursal);
    sql=`INSERT INTO public."Usuario" ("idUsuario", "contraseña", estado, "idEmpleado", "idSucursal") VALUES (${cod}, '${pass}', 'A', ${idEmpleado}, ${idSucursal});`;
    let result = await BD.open(sql);
    res.redirect('/usuarios/listar/'+idEmpleado);
}

const renderEditUsuarioEmp = async (req, res) => {
    let idEmpleado=req.body.idEmpleado;
    let cod=req.body.cod;
    let pass=req.body.pass;
    let idSucursal=req.body.idSucursal;
    sql=`UPDATE public."Usuario" SET "contraseña"='${pass}',"idSucursal"=${idSucursal} WHERE "idUsuario"=${cod};`;
    let result = await BD.open(sql);
    res.redirect('/usuarios/listar/'+idEmpleado);
}

module.exports = { renderListar,renderListarXEmp,renderAddUsuarioEmp, renderEditUsuarioEmp }