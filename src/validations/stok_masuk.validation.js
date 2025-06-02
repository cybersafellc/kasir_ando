import Joi from "joi";

const create = await Joi.object({
  barang_id: Joi.string().required(),
  jumlah: Joi.number().required(),
  harga_satuan: Joi.number().required(),
  user_id: Joi.string().required(),
}).required();

const hapus = Joi.object({
  id: Joi.string().required(),
  user_id: Joi.string().required(),
}).required();

export default { create, hapus };
