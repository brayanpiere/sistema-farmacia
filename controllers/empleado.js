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
    let cargo=req.body.cargo;
    sql=`INSERT INTO public."Cargo"("idCargo", "nombreCargo") VALUES (${cod}, '${cargo}');`;
    let result = await BD.open(sql);
    res.redirect('/cargos/listar');
}


module.exports={renderListar,renderAddEmp}