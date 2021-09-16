import { Joi } from 'celebrate'

export const validationSchema = {
  adminRouterCreate: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}
