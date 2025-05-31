import kategori_barangService from "../services/kategori_barang.service.js";

async function create(req, res, next) {
  try {
    if (req?.body) {
      req.body.dibuat_oleh = await req.id;
    }
    const response = await kategori_barangService.create(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function gether(req, res, next) {
  try {
    if (req?.query?.id && req?.query?.id !== "") {
      const response = await kategori_barangService.getById(req.query);
      res.status(response.status).json(response).end();
    } else {
      const response = await kategori_barangService.gether(req?.query);
      res.status(response.status).json(response).end();
    }
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const response = await kategori_barangService.update(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function hapus(req, res, next) {
  try {
    const response = await kategori_barangService.hapus(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default { create, gether, update, hapus };
