import { Router } from 'express';
import { uploader } from '../uploader.js';


const router = Router();

const carrito = [
    { id: 1, title: 'BotellaGrande', description: 'Botella de agua Grande', code: '001', price: '10000', stock: 10, category: 'botellas' },
    { id: 2, title: 'BotellaMediana', description: 'Botella de agua mediana', code: '002', price: '5000', stock: 10, category: 'botellas' },
    { id: 3, title: 'BotellaPequeña', description: 'Botella de agua pequeña', code: '003', price: '1000', stock: 10, category: 'botellas' },
    { id: 4, title: 'BotellaDeportiva', description: 'Botella de agua deportiva', code: '003', price: '15000', stock: 10, category: 'botellas' }
];

const auth = (req, res, next) => {
    console.log('Ejecuta el middleware de autenticación de producto');
    next();

}

router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: carrito });
});


router.post('/', auth, uploader.single('thumbnail'), (req, res) => {
    const { title, description } = req.body;

    if (title != '' && description != '') {
        const maxId = Math.max(...carrito.map(element => +element.id));
        const newCart = { id: maxId + 1, title: title, description: description };
        carrito.push(newCart);
        res.status(200).send({ error: null, data: newCart, file: req.file });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

router.put('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = carrito.findIndex(element => element.id === id);
    
    if (index > -1) {
        carrito[index] = req.body;
        res.status(200).send({ error: null, data: carrito[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});

router.delete('/:id', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = carrito.findIndex(element => element.id === id);
    
    if (index > -1) {
        carrito.splice(index, 1);
        res.status(200).send({ error: null, data: 'Carrito borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});


export default router;