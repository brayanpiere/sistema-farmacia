const {Router} = require('express');
const router=Router();
const BD = require('../config/config');

router.get('/',(req,res)=>{
    res.render("login");
});

router.get('/compras',(req,res)=>{
    res.render("compra");
});

router.get('/cargo', async (req,res)=>{
    const listaCargos =[];
    sql='SELECT * FROM public."Cargo" ORDER BY "idCargo" ASC ';

    let result = await BD.open(sql,[],false);
    result.rows.map(emp=>{
        let cargoSchema = {
            'id': emp[0],
            'cargo':emp[1],
        }
        listaCargos.push(cargoSchema)
    });

    res.render('empleados',{
        cargos : listaCargos,
    })
})

module.exports=router;