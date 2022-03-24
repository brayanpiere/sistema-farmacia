const BD = require('../config/config');

const renderListar = async (req, res) => {
    const listaEmpleados =[];
    sql='SELECT * FROM public."Empleado" ORDER BY "idEmpleado" ASC ';
    let result = await BD.open(sql);
    console.log(result);
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
    res.render("empleado/empleado",{
        empleados : listaEmpleados,
    });
}


module.exports={renderListar}