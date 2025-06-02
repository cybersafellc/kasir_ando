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
  kategori_id: Joi.string().optional(),
}).required();

const gether = Joi.object({
  q: Joi.string().empty("").optional(),
  id: Joi.string().empty("").optional(),
}).optional();

const getById = Joi.object({
  id: Joi.string().empty("").required(),
}).required();

const hapus = Joi.object({
  id: Joi.string().required(),
}).required();

export default { create, edit, gether, getById, hapus };
