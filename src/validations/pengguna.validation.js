import Joi from "joi";

const create = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  nama: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  secret: Joi.string().required(),
}).required();

const auth = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

export default { create, auth };
