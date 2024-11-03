import { Router } from 'express';
import { uploader } from '../uploader.js';
import CartController from '../dao/carts.controller.js';
//import { auth } from './products.router.js'


const router = Router();

const controller = new CartController();

const auth = (req, res, next) => {
    console.log('Ejecuta el middleware de autenticación de usuario');
    next();
}

router.get('/', async (req, res) => {
    const data = await controller.get();
    res.status(200).send({ error: null, data: data });
});

router.get('/paginated/:pg?', async (req, res) => {
    const pg = req.params.pg || 1;
    const data = await controller.getPaginated(pg);
    res.status(200).send({ error: null, data: data });
});

router.post('/', auth, uploader.single('thumbnail'), async (req, res) => {
    const { title, description, price } = req.body;

    if (title != '' && description != '' && price != '') {
        const newProduct = { title: title, description: description, price: price };
        const process = await controller.add(newProduct);


        const socketServer = req.app.get('socketServer');
        socketServer.emit('new_product', newProduct);
        
        res.status(200).send({ error: null, data: process, file: req.file });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

router.put('api/carts/:cid', auth, async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const filter = { _id: id };
    const updated = { title: title, description: description, price: price };
    const options = { new: true };

    const process = await controller.update(filter, updated, options);
    
    if (process) {
        res.status(200).send({ error: null, data: process });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});

router.put('api/carts/:cid/products/:pid', auth, async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const filter = { _id: id };
    const updated = { title: title, description: description, price: price };
    const options = { new: true };

    const process = await controller.update(filter, updated, options);
    
    if (process) {
        res.status(200).send({ error: null, data: process });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});

router.delete('api/carts/:cid', auth, async (req, res) => {
    const { id } = req.params;
    const filter = { _id: id };
    const options = {};

    const process = await controller.delete(filter, options);
    
    if (process) {
        res.status(200).send({ error: null, data: 'Producto borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});

router.delete('api/carts/:cid/products/:pid', auth, async (req, res) => {
    const { id } = req.params;
    const filter = { _id: id };
    const options = {};

    const process = await controller.delete(filter, options);
    
    if (process) {
        res.status(200).send({ error: null, data: 'Producto borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});


export default router;