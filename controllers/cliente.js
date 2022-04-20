const BD = require('../config/config');

const renderListar = async (req, res) => {
    const listaClientes =[];
    sql='SELECT * FROM public."Cliente" ORDER BY "idCliente" ASC ';
    let result = await BD.open(sql);
    result.rows.map(cli=>{
        let EmpSchema = {
            'id': cli.idCliente,
            'nombres':cli.nombres,
            'apellidos': cli.apellidos,
            'dni':cli.dni,
            'ruc': cli.ruc,
            'rs':cli.razonSocial,
            'direccion': cli.direccion,
            'telefono': cli.telefono,
            'email': cli.email,
            'sexo': cli.sexo,
            'estado':cli.estado,
        }
        listaClientes.push(EmpSchema)
    });

    res.render("cliente/cliente",{
        clientes : listaClientes,
    });
}

const renderAddCliente = async (req, res) => {
    let cod=req.body.cod;
    let nombre=req.body.nombre;
    let apellidos=req.body.apellidos;
    let dni=req.body.dni;
    let ruc=req.body.ruc;
    let rs=req.body.rs;
    let direccion=req.body.direccion;
    let telefono=req.body.telefono;
    let email=req.body.email;
    let s=req.body.s;
    sql=`INSERT INTO public."Cliente"("idCliente", nombres, apellidos, ruc, "razonSocial", direccion, telefono, email, sexo, dni, estado) VALUES (${cod}, '${nombre}', '${apellidos}', '${ruc}', '${rs}', '${direccion}', '${telefono}', '${email}', '${s}', '${dni}', 'A');`;
    let result = await BD.open(sql);
    res.redirect('/clientes/listar');
}

const renderUpdateCliente = async (req, res) => {
    let cod=req.body.cod;
    let nombre=req.body.nombre;
    let apellidos=req.body.apellidos;
    let dni=req.body.dni;
    let ruc=req.body.ruc;
    let rs=req.body.rs;
    let direccion=req.body.direccion;
    let telefono=req.body.telefono;
    let email=req.body.email;
    let s=req.body.s;
    sql=`UPDATE public."Cliente" SET nombres='${nombre}', apellidos='${apellidos}', ruc=${ruc}, "razonSocial"='${rs}', direccion='${direccion}', telefono=${telefono}, email='${email}', sexo='${s}', dni=${dni}	WHERE "idCliente"=${cod};`;
    let result = await BD.open(sql);
    res.redirect('/clientes/listar');
}

module.exports={renderListar,renderAddCliente,renderUpdateCliente}