import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import productosRouter from './routes/productos.router.js';
import viewsRouter from './routes/views.router.js';
import carritoRouter from './routes/carrito.router.js';
import config from './config.js';


const app = express();

const httpServer = app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});

const socketServer = new Server(httpServer);
const messages = [];

socketServer.on('connection', socket => {
    console.log(`Nuevo cliente conectado con id ${socket.id}`);

    socket.on('new_product_data', data =>{
        socket.emit('current_messages', messages);
        socket.broadcast.emit('new_product', data);
    })

    socket.on('new_own_msg', data => {
        messages.push(data);
        socketServer.emit('new_general_msg', data);
    })
});

const midd1 = (req, res, next) => {
    console.log('Se recibió una solicitud general');
    next();
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(midd1);


app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');


app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);
app.use('/views', viewsRouter);


app.use('/static', express.static(`${config.DIRNAME}/public`));