import { Router } from 'express';
import { uploader } from '../uploader.js';


const router = Router();

const productos = [
    { id: 1, title: 'BotellaGrande', description: 'Botella de agua Grande', code: '001', price: '10000', stock: 10, category: 'botellas' },
    { id: 2, title: 'BotellaMediana', description: 'Botella de agua mediana', code: '002', price: '5000', stock: 10, category: 'botellas' },
    { id: 3, title: 'BotellaPequeña', description: 'Botella de agua pequeña', code: '003', price: '1000', stock: 10, category: 'botellas' }
];

const auth = (req, res, next) => {
    console.log('Ejecuta el middleware de autenticación de producto');
    next();

}

router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: productos });
});


router.post('/', auth, uploader.single('thumbnail'), (req, res) => {
    const { title, description } = req.body;

    if (title != '' && description != '') {
        const maxId = Math.max(...productos.map(element => +element.id));
        const newProduct = { id: maxId + 1, title: 'Botella deportiva', description: 'Una botella deportiva' };
        productos.push(newProduct);
        res.status(200).send({ error: null, data: newProduct, file: req.file });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

router.put('/', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(element => element.id === id);
    
    if (index > -1) {
        productos[index] = req.body;
        res.status(200).send({ error: null, data: productos[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});

router.delete('/', auth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(element => element.id === id);
    
    if (index > -1) {
        productos.splice(index, 1);
        res.status(200).send({ error: null, data: 'Producto borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }
});


export default router;