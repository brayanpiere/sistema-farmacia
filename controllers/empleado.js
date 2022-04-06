const BD = require('../config/config');

const renderListar = async (req, res) => {
    const listaEmpleados =[];
    sql='SELECT * FROM public."Empleado" ORDER BY "idEmpleado" ASC ';
    let result = await BD.open(sql);
    result.rows.map(emp=>{
        let EmpSchema = {
            'id': emp.idEmpleado,
            'nombres':emp.nombres,
            'apellidos': emp.apellidos,
            'dni':emp.dni,
            'telefono': emp.telefono,
            'email':emp.email,
            'salario': emp.salario,
            'estado':emp.estado,
            'idCargo':emp.idCargo,
        }
        listaEmpleados.push(EmpSchema)
    });

    sql2='SELECT * FROM public."Cargo" ORDER BY "idCargo" ASC ';
    let result2 = await BD.open(sql2);
    const listaCargos = result2.rows.map(emp => ({
        'id': emp.idCargo,
        'cargo': emp.nombreCargo
    }));
    console.log(listaCargos);
    res.render("empleado/empleado",{
        empleados : listaEmpleados,
        cargos : listaCargos, 
    });
}

const renderAddEmp = async (req, res) => {
    let cod=req.body.cod;
    let nombre=req.body.nombre;
    let apellidos=req.body.apellidos;
    let dni=req.body.dni;
    let telefono=req.body.telefono;
    let email=req.body.email;
    let salario=req.body.salario;
    let idcargo=req.body.idcargo;
    sql=`INSERT INTO public."Empleado" ("idEmpleado", nombres, apellidos, dni, telefono, email, salario, estado, "idCargo") VALUES (${cod}, '${nombre}', '${apellidos}', ${dni}, '${telefono}', '${email}', ${salario}, 'A', ${idcargo});`;
    let result = await BD.open(sql);
    res.redirect('/empleados/listar');
}

const renderUpdateEmpleado = async (req, res) => {
    let cod=req.body.cod;
    let nombre=req.body.nombre;
    let apellidos=req.body.apellidos;
    let dni=req.body.dni;
    let telefono=req.body.telefono;
    let email=req.body.email;
    let salario=req.body.salario;
    let idcargo=req.body.idcargo;
    console.log(cod);
    console.log(nombre);
    console.log(apellidos);
    console.log(dni);
    console.log(telefono);
    console.log(email);
    console.log(salario);
    console.log(idcargo);
    
    sql=`UPDATE public."Empleado" SET nombres='${nombre}', apellidos='${apellidos}', dni=${dni}, telefono='${telefono}', email='${email}', salario=${salario}, "idCargo"=${idcargo}	WHERE "idEmpleado"=${cod};`;
    let result = await BD.open(sql);
    
    res.redirect('/empleados/listar');
}

module.exports={renderListar,renderAddEmp,renderUpdateEmpleado}