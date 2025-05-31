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

export default { create, edit };
