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

export default { allRoleApi, allRolePages, adminRoleApi, adminRolePages };
