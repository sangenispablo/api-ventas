import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionRoute = Router();
const sessionController = new SessionsController();

sessionRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRoute;
