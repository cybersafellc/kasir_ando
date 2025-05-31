import barangValidation from "../validations/barang.validation.js";
import { validation } from "../validations/validation.js";
import { database } from "../app/database.js";
import { ApiError } from "../errors/response.error.js";
import { Response } from "../utils/response.template.js";
import { generateItemCode } from "../utils/etc.js";

async function create(request) {
  console.log(request);
  const result = await validation(barangValidation.create, request);
  const checkKategoriId = await database.kategoriBarang.count({
    where: {
      id: result.kategori_id,
    },
  });
  console.log(checkKategoriId);
  if (!checkKategoriId)
    throw new ApiError(400, "kategori_id yang anda berikan tidak valid");
  const count = await database.barang.count({
    where: {
      nama: result.nama,
    },
  });
  if (count) throw new ApiError(400, "nama barang sudah ada !");
  const responseCreate = await database.barang.create({
    data: {
      id: crypto.randomUUID(),
      kategori_id: result.kategori_id,
      kode_barang: generateItemCode(),
      nama: result.nama,
      harga: result.harga,
      jumlah: 0,
      dibuat_oleh: result.user_id,
      penanggung_jawab_terakhir: result.user_id,
    },
  });
  return new Response(
    200,
    "berhasil menambahkan barang",
    responseCreate,
    null,
    false
  );
}

async function edit(request) {
  const result = await validation(barangValidation.edit, request);
  const count = await database.barang.count({
    where: {
      id: result.id,
    },
  });
  console.log(result);
  console.log(count);
  if (!count)
    throw new ApiError(400, "id barang yang anda masukkan tidak valid");
  const responseUpdate = await database.barang.update({
    data: {
      nama: result.nama,
      harga: result.harga,
      penanggung_jawab_terakhir: result.user_id,
    },
    where: {
      id: result.id,
    },
  });
  return new Response(200, "berhasil mengupdate", responseUpdate, null, false);
}

export default { create, edit };
