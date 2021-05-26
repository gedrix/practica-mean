const express = require('express');


const app = express();
require('./database');

//middlewares
app.use(express.json());

//rutas
app.use('/api/productos', require('./routes/producto'));


app.listen(3000, () =>{
    console.log('el servidor se esta ejecutando')
})

