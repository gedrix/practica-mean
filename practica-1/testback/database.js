const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/producto', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(db => console.log('base de datos conectado'))
    .catch(err => console.log(err));