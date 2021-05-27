const express = require('express');
const { use } = require('./routes/producto');
const cors = require("cors");

const app = express();
require('./database');


//middlewares
app.use(express.json());
app.use(cors());
//rutas
app.use('/api/productos', require('./routes/producto'));


app.listen(3000, () =>{
    console.log('el servidor se esta ejecutando')
})

