const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port',process.env.PORT || 3000);
app.set('json spaces',2); //hago que el json se visualice mas bonito


// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/Index'));
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/ejemplo',require('./routes/ejemplo'));



//starting the server

app.listen(3000,()=>{
    console.log(`server on port ${app.get('port')}`);
});

