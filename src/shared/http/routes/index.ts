import { Router } from 'express';

import productsRoute from '@modules/products/routes/products.routes';
import usersRoute from '@modules/users/routes/users.routes';
import sessionRoute from '@modules/users/routes/session.routes';

const routes = Router();

routes.use('/products', productsRoute);
routes.use('/users', usersRoute);
routes.use('/sessions', sessionRoute);

export default routes;
