import viewsService from "../services/views.service.js";

async function daftar(req, res, next) {
  try {
    const response = await viewsService.daftar(req.body);
    res.status(response.status).render(response.refrence, response.data);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const response = await viewsService.login(req.body);
    res.status(response.status).render(response.refrence, response.data);
  } catch (error) {
    next(error);
  }
}

async function kategoriBarang(req, res, next) {
  try {
    const data = {
      page: req.query.page <= 0 ? 1 : req.query.page,
      take: req.query.take < 10 ? 10 : req.query.take,
      q: req.query.q || undefined,
      id: req.id,
    };
    data.page = data?.page ? data.page : 1;
    data.take = data?.take ? data.take : 10;
    const response = await viewsService.kategoriBarang(data);
    res.status(response.status).render(response.refrence, response.data);
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie("access_token");
    res.redirect("/login");
    return;
  } catch (error) {
    next(error);
  }
}

async function barang(req, res, next) {
  try {
    const data = {
      page: req.query.page <= 0 ? 1 : req.query.page,
      take: req.query.take < 10 ? 10 : req.query.take,
      q: req.query.q || undefined,
      id: req.id,
    };
    data.page = data?.page ? data.page : 1;
    data.take = data?.take ? data.take : 10;
    const response = await viewsService.barang(data);
    res.status(response.status).render(response.refrence, response.data);
  } catch (error) {
    next(error);
  }
}

async function barangMasuk(req, res, next) {
  try {
    const data = {
      page: req.query.page <= 0 ? 1 : req.query.page,
      take: req.query.take < 10 ? 10 : req.query.take,
      q: req.query.q || undefined,
      id: req.id,
    };
    data.page = data?.page ? data.page : 1;
    data.take = data?.take ? data.take : 10;
    const response = await viewsService.barangMasuk(data);
    res.status(response.status).render(response.refrence, response.data);
  } catch (error) {
    next(error);
  }
}

async function otpVerification(req, res, next) {
  try {
    const data = {
      id: await req.id,
    };
    const response = await viewsService.otpVerification(data);
    res.status(response.status).render(response.refrence, response.data);
  } catch (error) {
    next(error);
  }
}

async function home(req, res, next) {
  try {
    const data = {
      id: await req.id,
    };
    const response = await viewsService.home(data);
    res.status(response.status).render(response.refrence, response.data);
  } catch (error) {
    home(error);
  }
}

async function pengguna(req, res, next) {
  try {
    const data = {
      page: req.query.page <= 0 ? 1 : req.query.page,
      take: req.query.take < 10 ? 10 : req.query.take,
      q: req.query.q || undefined,
      id: req.id,
    };
    data.page = data?.page ? data.page : 1;
    data.take = data?.take ? data.take : 10;
    const response = await viewsService.pengguna(data);
    res.status(response.status).render(response.refrence, response.data);
  } catch (error) {
    next(error);
  }
}

export default {
  daftar,
  login,
  kategoriBarang,
  logout,
  barang,
  barangMasuk,
  otpVerification,
  home,
  pengguna,
};
