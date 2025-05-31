import Joi from "joi";

const kategoriBarang = Joi.object({
  q: Joi.string().empty("").optional(),
  page: Joi.number().empty("").optional(),
  take: Joi.number().empty("").optional(),
  id: Joi.string().required(),
}).optional();

const barang = Joi.object({
  q: Joi.string().empty("").optional(),
  page: Joi.number().empty("").optional(),
  take: Joi.number().empty("").optional(),
  id: Joi.string().required(),
}).optional();

export default { kategoriBarang, barang };
