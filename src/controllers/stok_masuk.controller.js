import stok_masukService from "../services/stok_masuk.service.js";

async function create(req, res, next) {
  try {
    req.body.user_id = await req.id;
    const response = await await stok_masukService.create(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function hapus(req, res, next) {
  try {
    req.body.user_id = await req.id;
    const response = await stok_masukService.hapus(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default { create, hapus };
