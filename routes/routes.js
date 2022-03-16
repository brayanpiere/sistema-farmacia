const {Router} = require('express');
const router=Router();

router.get('/',(req,res)=>{
    res.render("login");
});

router.get('/compras',(req,res)=>{
    res.render("compra");
});

module.exports=router;