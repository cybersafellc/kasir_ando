import barangService from "../services/barang.service.js";

async function create(req, res, next) {
  try {
    req.body.user_id = await req.id;
    const response = await barangService.create(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function edit(req, res, next) {
  try {
    req.body.user_id = await req.id;
    const response = await barangService.edit(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function gether(req, res, next) {
  try {
    if (req?.query?.id) {
      const response = await barangService.getById(req.query);
      res.status(response.status).json(response).end();
    } else {
      const response = await barangService.gether(req.query);
      res.status(response.status).json(response).end();
    }
  } catch (error) {
    next(error);
  }
}

async function hapus(req, res, next) {
  try {
    const response = await barangService.hapus(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default { create, edit, gether, hapus };
