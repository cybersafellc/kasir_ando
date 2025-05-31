import penggunaValidation from "../validations/pengguna.validation.js";
import { validation } from "../validations/validation.js";
import { database } from "../app/database.js";
import { ApiError } from "../errors/response.error.js";
import { Response } from "../utils/response.template.js";
import bcrypt from "bcrypt";
const roleNya = ["admin", "user"];
import Jwt from "jsonwebtoken";

async function create(request) {
  const result = await validation(penggunaValidation.create, request);
  const secret = await process.env.SECRET;
  if (!roleNya.includes(result.role)) {
    throw new ApiError(
      400,
      "Invalid Role, Pastikan Role hanya admin atau user!"
    );
  }
  if (result.secret !== secret) {
    throw new ApiError(400, "Secret Salah!");
  }
  const countUsername = await database.pengguna.count({
    where: {
      username: result.username,
    },
  });
  if (countUsername) {
    throw new ApiError(400, "Pengguna sudah terdaftar!");
  }
  const countEmail = await database.pengguna.count({
    where: {
      email: result.email,
    },
  });
  if (countEmail) {
    throw new ApiError(400, "Email address sudah terdaftar!");
  }
  result.secret = undefined;
  result.id = await crypto.randomUUID();
  result.password = await bcrypt.hash(result.password, 10);
  const responseCreate = await database.pengguna.create({
    data: result,
    select: {
      id: true,
      username: true,
      role: true,
      nama: true,
      email: true,
      phone: true,
    },
  });
  return new Response(200, "berhasil mendaftar", responseCreate, null, false);
}

async function auth(request) {
  const result = await validation(penggunaValidation.auth, request);
  const user = await database.pengguna.findUnique({
    where: {
      username: result.username,
    },
  });
  if (!user || !(await bcrypt.compare(result.password, user.password))) {
    throw new ApiError(400, "username atau password salah!");
  }
  const access_token = await Jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
  return new Response(200, "login berhasil", { access_token }, null, false);
}

export default { create, auth };
