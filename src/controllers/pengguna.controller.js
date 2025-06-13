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
    res.cookie("token_2fa", response.data.token_2fa);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function otpVerification(req, res, next) {
  try {
    req.body.id = await req.id;
    const response = await penggunaService.otpVerification(req.body);
    res.cookie("access_token", response.data.access_token);
    res.status(200).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default { create, auth, otpVerification };
