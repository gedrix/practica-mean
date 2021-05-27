const express = require('express');
const app = express();
const cors = require('cors');

//conexion a base de datos
require('./db');

//middlewares

app.use(express.json());
app.use(cors());

//route

app.use('/api', require('./routes/web'));

app.listen(3000);
console.log('servidor en el puerto', 3000);