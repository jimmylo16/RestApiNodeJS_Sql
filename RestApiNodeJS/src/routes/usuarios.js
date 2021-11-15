const {Router} = require ('express');
const router = Router();
const mysqlConnection =require('../database');
const movies=require('../sample.json');
const _= require('underscore');



//busqueda total a la base de datos
router.get('/',(req,res)=>{ 
    mysqlConnection.query('SELECT * FROM usuarios', (err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

//busqueda por id
router.get('/:id',(req,res)=>{ 
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM usuarios WHERE id=?',[id], (err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/',(req,res)=>{  
    const {Cedula,Nombre,Email}=req.body;  
    var sql='INSERT INTO usuarios (CEDULA, NOMBRE, CORREO) VALUES (?,?,?)';
    var values= [Cedula,Nombre,Email];
    if (Cedula && Nombre && Email) {
        mysqlConnection.query(sql, values,(err,rows,fields)=>{
            if (!err) {
                mysqlConnection.query('SELECT * FROM usuarios', (err,rows,fields)=>{
                    if (!err) {
                        res.json(rows);
                    }else{
                        console.log(err);
                    }
                });
            }else{
                console.log(err);
            }
        });
    } else{  
        res.status(500).json({error: 'hubo un error'});
    }
    
});

router.put('/:id',(req,res)=>{    
    const {id} =req.params;
    const {Cedula,Nombre,Email}=req.body;  
    if (Cedula && Nombre && Email) {
        mysqlConnection.query('UPDATE usuarios SET CEDULA=?,NOMBRE=?, CORREO=? WHERE ID=?',[Cedula,Nombre,Email,id],(err,rows,fields)=>{
            if (!err) {
                mysqlConnection.query('SELECT * FROM usuarios', (err,rows,fields)=>{
                    if (!err) {
                        res.json(rows);
                    }else{
                        console.log(err);

                    }
                });
            }else{
                console.log(err);
                res.json(err.sqlMessage);
            }
        });
    }else{
        res.status(500).json({error: 'there was an error'})
    }
    
});

router.delete('/:id',(req,res)=>{    
    const {id} =req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE ID=?',[id],(err,rows,fields)=>{
        if (!err) {
            mysqlConnection.query('SELECT * FROM usuarios', (err,rows,fields)=>{
                if (!err) {
                    res.json(rows);
                }else{
                    console.log(err);

                }
            });
        }else{
            console.log(err);
            res.json(err.sqlMessage);
        }
    });    
});

module.exports = router;