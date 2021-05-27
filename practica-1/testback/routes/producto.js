const  express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');

// api/producto => post

router.post('/', productoController.crearProducto);
router.get('/', productoController.listarProducto);
router.put('/:id', productoController.editarProducto);
router.get('/:id', productoController.obtenerProducto);
router.delete('/:id', productoController.eliminarProducto);



module.exports  = router;