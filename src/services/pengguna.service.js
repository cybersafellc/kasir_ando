import penggunaValidation from "../validations/pengguna.validation.js";
import { validation } from "../validations/validation.js";
import { database } from "../app/database.js";
import { ApiError } from "../errors/response.error.js";
import { Response } from "../utils/response.template.js";
import bcrypt from "bcrypt";
const roleNya = ["admin", "user"];
import Jwt from "jsonwebtoken";
import { generateOTP, sentOtpMail } from "../utils/etc.js";
import { logger } from "../app/logging.js";

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
  const otp = generateOTP();
  await database.pengguna.update({
    data: {
      otp: otp,
    },
    where: {
      id: user.id,
    },
  });
  sentOtpMail({
    otp: otp,
    username: user.username,
    email: user.email,
    nama: user.nama,
  })
    .then((ress) => {
      logger.info("berhasil mengirim email OTP ke " + user.email);
    })
    .catch((err) => {
      logger.error(err.message);
    });
  const token_2fa = await Jwt.sign(
    { id: user.id, role: user.role },
    process.env.TWOFA_SECRET,
    {
      expiresIn: "5m",
    }
  );
  setTimeout(async () => {
    await database.pengguna.update({
      data: {
        otp: null,
      },
      where: {
        id: user.id,
      },
    });
  }, 300000);
  return new Response(
    200,
    "Usernam dan Password Benar !",
    { token_2fa },
    null,
    false
  );
}

async function otpVerification(request) {
  console.log(request);
  const result = await validation(penggunaValidation.otpVerification, request);
  const user = await database.pengguna.findUnique({
    where: {
      id: result.id,
      otp: result.otp,
    },
  });
  if (!user) throw new ApiError(400, "Otp tidak valid !");

  await database.pengguna.update({
    data: {
      otp: null,
    },
    where: {
      id: user.id,
    },
  });

  const access_token = Jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
  return new Response(
    200,
    "berhasil verifikasi otp",
    { access_token: access_token },
    null,
    false
  );
}

export default { create, auth, otpVerification };
