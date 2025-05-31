import Joi from "joi";

const create = Joi.object({
  nama: Joi.string().required(),
  dibuat_oleh: Joi.string().required(),
}).required();

const gether = Joi.object({
  q: Joi.string().empty("").optional(),
  id: Joi.string().empty("").optional(),
}).optional();

const getById = Joi.object({
  id: Joi.string().empty("").required(),
}).required();

const update = Joi.object({
  id: Joi.string().required(),
  nama: Joi.string().required(),
}).required();

const hapus = Joi.object({
  id: Joi.string().required(),
}).required();

export default { create, gether, getById, update, hapus };
