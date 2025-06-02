import { database } from "../app/database.js";
import { ApiError } from "../errors/response.error.js";
import { Response } from "../utils/response.template.js";
import stok_masukValidation from "../validations/stok_masuk.validation.js";
import { validation } from "../validations/validation.js";

async function create(request) {
  const result = await validation(stok_masukValidation.create, request);
  const barancountCheck = await database.barang.findUnique({
    where: {
      id: result.barang_id,
    },
  });
  if (!barancountCheck)
    throw new ApiError(400, "barang dengan id yang anda berikan tidak ada !");

  await database.barang.update({
    data: {
      jumlah: (barancountCheck.jumlah += result.jumlah),
      penanggung_jawab_terakhir: result.user_id,
    },
    where: {
      id: result.barang_id,
    },
  });
  const responseCreate = await database.stokMasuk.create({
    data: {
      id: crypto.randomUUID(),
      barang_id: result.barang_id,
      jumlah: result.jumlah,
      harga_satuan: result.harga_satuan,
      dibuat_oleh: result.user_id,
    },
  });
  return new Response(
    200,
    "berhasil menambahkan stok",
    responseCreate,
    null,
    false
  );
}

async function hapus(request) {
  const result = await validation(stok_masukValidation.hapus, request);
  const dataStok = await database.stokMasuk.findUnique({
    where: {
      id: result.id,
    },
  });
  if (!dataStok)
    throw new ApiError(400, "id stok masuk yang anda berikan tidak valid");
  const barang = await database.barang.findUnique({
    where: {
      id: dataStok.barang_id,
    },
  });
  await database.barang.update({
    data: {
      jumlah: barang.jumlah - dataStok.jumlah,
      penanggung_jawab_terakhir: result.user_id,
    },
    where: {
      id: dataStok.barang_id,
    },
  });
  const responseDelete = await database.stokMasuk.delete({
    where: {
      id: result.id,
    },
  });
  return new Response(
    200,
    "berhasil menghapus record stok",
    responseDelete,
    null,
    false
  );
}

export default { create, hapus };
