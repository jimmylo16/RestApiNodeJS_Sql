const { Router } =require('express');
const router = Router(); // con esto puedo crear nuevas rutas

router.get('/',(req,res)=>{ // '/' se refiere a la ruta inicial
    res.send('hola'); //con res.send envio strings, con res.json envio un json
    // res.json({"nombre":"jimmy"});
});

module.exports= router;