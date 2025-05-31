import Joi from "joi";

const create = Joi.object({
  kategori_id: Joi.string().required(),
  nama: Joi.string().required(),
  harga: Joi.number().required(),
  user_id: Joi.string().required(),
}).required();

const edit = Joi.object({
  id: Joi.string().required(),
  user_id: Joi.string().required(),
  nama: Joi.string().optional(),
  harga: Joi.number().optional(),
}).required();

export default { create, edit };
