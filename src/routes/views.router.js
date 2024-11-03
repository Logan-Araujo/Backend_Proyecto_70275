import { Router } from 'express';
import ProductController from '../dao/products.controller.js';
import CartController from '../dao/carts.controller.js';

const router = Router();
const controller = new ProductController
const cart = new CartController

router.get('/chat', (req, res) => {
    const data = {};
    
    res.status(200).render('chat', data);
});

router.get('/products/:pg?', async (req, res) => {
    const pg = req.params.pg || 1;
    const data = await controller.getPaginated(pg);
    console.log(data);
    
    res.status(200).render('products', { products: data });
});

router.get('/carts/:pg?', async (req, res) => {
    const pg = req.params.pg || 1;
    const data = await cart.getPaginated(pg);
    console.log(data);
    
    res.status(200).render('carts', { carts: data });
});

router.get('/newproduct', (req, res) => {
    const data = {};
    
    res.status(200).render('newproduct', data);
});

router.get('/newcart', (req, res) => {
    const data = {};
    
    res.status(200).render('newcart', data);
});

export default router;