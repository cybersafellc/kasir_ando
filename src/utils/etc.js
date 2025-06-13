import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

function generateItemCode() {
  // Generate 11 random digits
  const digits = [];
  for (let i = 0; i < 11; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  // Hitung check digit (digit ke-12) menggunakan rumus UPC-A
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += digits[i] * (i % 2 === 0 ? 3 : 1);
  }
  const checkDigit = (10 - (sum % 10)) % 10;

  // Gabungkan semua digit jadi satu string
  digits.push(checkDigit);
  return digits.join("");
}

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}

async function sentOtpMail({ otp, username, email, nama }) {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465 ? true : false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  let htmlTemplate = await fs.readFile(
    path.join("src/utils/otp.html"),
    "utf-8"
  );
  htmlTemplate = htmlTemplate.replace("{{NAMA_PENGGUNA}}", nama);
  htmlTemplate = htmlTemplate.replace("{{OTP_CODE}}", otp);
  htmlTemplate = htmlTemplate.replace("{{EXPIRE_TIME}}", 5);
  htmlTemplate = htmlTemplate.replace("{{NAMA_PROYEK}}", "pelangganshop.com");
  const comppose = {
    from: `"pelangganshop.com" <${process.env.SMTP_USERNAME}>`,
    to: `"${nama}" <${email}>`,
    subject: "Berikut OTP untuk masuk ke sistem",
    html: htmlTemplate,
  };
  await transport.sendMail(comppose);
}

function generateOTP() {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
}

export { generateItemCode, formatRupiah, sentOtpMail, generateOTP };
