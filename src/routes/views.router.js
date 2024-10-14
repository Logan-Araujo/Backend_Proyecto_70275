import { Router } from 'express';

const router = Router();

const productos = [
    { id: 1, title: 'BotellaGrande', description: 'Botella de agua Grande', code: '001', price: '10000', stock: 10, category: 'botellas' },
    { id: 2, title: 'BotellaMediana', description: 'Botella de agua mediana', code: '002', price: '5000', stock: 10, category: 'botellas' },
    { id: 3, title: 'BotellaPequeña', description: 'Botella de agua pequeña', code: '003', price: '1000', stock: 10, category: 'botellas' }
];

router.get('/', (req, res) => {
    const data = {
        isAdmin: true,
        users: productos
    }
    res.status(200).render('index', data);
});

router.get('/realtimeproducts', (req, res) => {
    const data = {
        isAdmin: true,
        users: productos
    };
    res.status(200).render('realtimeproducts', data);
});

export default router;