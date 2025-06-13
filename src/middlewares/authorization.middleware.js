import Jwt from "jsonwebtoken";
import { ApiError, PageError } from "../errors/response.error.js";

async function allRoleApi(req, res, next) {
  try {
    const access_token =
      (await req.headers["authorization"]?.split(" ")[1]) ||
      req.cookies["access_token"];
    const decode = await Jwt.verify(
      access_token,
      process.env.JWT_SECRET,
      function (err, decode) {
        return decode;
      }
    );
    if (!decode) throw new ApiError(400, "dibutuhkan akses token valid");
    req.id = await decode.id;
    req.role = await decode.role;
    next();
  } catch (error) {
    next(error);
  }
}

async function allRolePages(req, res, next) {
  try {
    const access_token =
      (await req.headers["authorization"]?.split(" ")[1]) ||
      req.cookies["access_token"];
    const decode = await Jwt.verify(
      access_token,
      process.env.JWT_SECRET,
      function (err, decode) {
        return decode;
      }
    );
    if (!decode) throw new PageError(400, "dibutuhkan akses token valid");
    req.id = await decode.id;
    req.role = await decode.role;
    next();
  } catch (error) {
    next(error);
  }
}

async function adminRoleApi(req, res, next) {
  try {
    const access_token =
      (await req.headers["authorization"]?.split(" ")[1]) ||
      req.cookies["access_token"];
    const decode = await Jwt.verify(
      access_token,
      process.env.JWT_SECRET,
      function (err, decode) {
        return decode;
      }
    );
    if (!decode) throw new ApiError(400, "dibutuhkan akses token valid");
    if (decode.role !== "admin") throw new ApiError(400, "Akeses Ditolak");
    req.id = await decode.id;
    req.role = await decode.role;
    next();
  } catch (error) {
    next(error);
  }
}

async function adminRolePages(req, res, next) {
  try {
    const access_token =
      (await req.headers["authorization"]?.split(" ")[1]) ||
      req.cookies["access_token"];
    const decode = await Jwt.verify(
      access_token,
      process.env.JWT_SECRET,
      function (err, decode) {
        return decode;
      }
    );
    if (!decode) throw new PageError(400, "dibutuhkan akses token valid");
    if (decode.role !== "admin") throw new ApiError(400, "Akeses Ditolak");
    req.id = await decode.id;
    req.role = await decode.role;
    next();
  } catch (error) {
    next(error);
  }
}

async function token2FAauthPages(req, res, next) {
  try {
    const token_2fa =
      (await req.headers["authorization"]?.split(" ")[1]) ||
      req.cookies["token_2fa"];
    const decode = await Jwt.verify(
      token_2fa,
      process.env.TWOFA_SECRET,
      function (err, decode) {
        return decode;
      }
    );
    if (!decode) throw new PageError(400, "Expired Session !");
    req.id = await decode.id;
    req.role = await decode.role;
    next();
  } catch (error) {
    next(error);
  }
}

async function token2FAauthAPI(req, res, next) {
  try {
    const token_2fa =
      (await req.headers["authorization"]?.split(" ")[1]) ||
      req.cookies["token_2fa"];
    const decode = await Jwt.verify(
      token_2fa,
      process.env.TWOFA_SECRET,
      function (err, decode) {
        return decode;
      }
    );
    if (!decode) throw new ApiError(400, "Session Expired !");
    req.id = await decode.id;
    req.role = await decode.role;
    next();
  } catch (error) {
    next(error);
  }
}

export default {
  allRoleApi,
  allRolePages,
  adminRoleApi,
  adminRolePages,
  token2FAauthPages,
  token2FAauthAPI,
};
