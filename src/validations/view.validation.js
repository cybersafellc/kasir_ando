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

const barangMasuk = Joi.object({
  q: Joi.string().empty("").optional(),
  page: Joi.number().empty("").optional(),
  take: Joi.number().empty("").optional(),
  id: Joi.string().required(),
}).optional();

const otpVerification = Joi.object({
  id: Joi.string().required(),
}).required();

const home = Joi.object({
  id: Joi.string().required(),
}).required();

const pengguna = Joi.object({
  q: Joi.string().empty("").optional(),
  page: Joi.number().empty("").optional(),
  take: Joi.number().empty("").optional(),
  id: Joi.string().required(),
}).optional();

export default {
  kategoriBarang,
  barang,
  barangMasuk,
  otpVerification,
  home,
  pengguna,
};
