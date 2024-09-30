import express from 'express';
import productosRouter from './routes/productos.router.js';
import carritoRouter from './routes/carrito.router.js'
import config from './config.js';


const app = express();

const midd1 = (req, res, next) => {
    console.log('Se recibió una solicitud general');
    next();
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(midd1);

app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

app.use('/static', express.static(`${config.DIRNAME}/public`));


app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});