import { Router, Response, Request } from 'express';

import productsRouter from '@modules/products/routes/products.routes';

const routes = Router();

// Rutas de Productos
routes.use('/products', productsRouter);

export default routes;
