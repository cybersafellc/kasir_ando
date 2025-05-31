import penggunaService from "../services/pengguna.service.js";

async function create(req, res, next) {
  try {
    const response = await penggunaService.create(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function auth(req, res, next) {
  try {
    const response = await penggunaService.auth(req.body);
    res.cookie("access_token", response.data.access_token);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default { create, auth };
