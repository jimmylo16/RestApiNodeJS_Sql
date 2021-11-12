const {Router} = require ('express');
const router = Router();
const mysqlConnection =require('../database');
const movies=require('../sample.json');
const _= require('underscore');
// console.log(movies);

//busqueda total a la base de datos
router.get('/',(req,res)=>{ 
    mysqlConnection.query('SELECT * FROM clientes', (err,rows,fields)=>{
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
    mysqlConnection.query('SELECT * FROM clientes WHERE id=?',[id], (err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/',(req,res)=>{  
    const {Cedula,Nombre,Email}=req.body;  
    if (Cedula && Nombre && Email) {
        mysqlConnection.query('INSERT INTO clientes VALUES ?', [1,Cedula,Nombre,Email],(err,rows,fields)=>{
            if (!err) {
                res.json(rows);
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
    const {title,director,year,rating} =req.body;
    if (title && director && year && rating) {
        _.each(movies, (movie,i)=>{  
            if (movie.id==id) { 
                movie.title=title;
                movie.director=director;
                movie.year=year;
                movie.rating=rating;
            }
        });
        res.json(movies);
    }else{
        res.status(500).json({error: 'there was an error'})
    }
    
});

router.delete('/:id',(req,res)=>{    
    const {id} =req.params;
    _.each(movies, (movie,i)=>{  //recorro todo el arreglo de peliculas, obtengo una pelicula por cada vez que se recorra

        if (movie.id==id) { //si el ide de la pelicula es igual al ide que reciba entonces
            movies.splice(i,1);  // con splice corto el array en esa posicion
        }
    });
    res.send(movies);//luego muestro el json con el elemento quitado
    
    
});

module.exports = router;