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
  if (result.kategori_id) {
    const count = await database.kategoriBarang.count({
      where: {
        id: result.kategori_id,
      },
    });
    if (!count)
      throw new ApiError(400, "kategori id yang anda berikan tidak valid");
  }
  const count = await database.barang.count({
    where: {
      id: result.id,
    },
  });
  if (!count)
    throw new ApiError(400, "id barang yang anda masukkan tidak valid");
  const responseUpdate = await database.barang.update({
    data: {
      nama: result.nama,
      harga: result.harga,
      penanggung_jawab_terakhir: result.user_id,
      kategori_id: result.kategori_id,
    },
    where: {
      id: result.id,
    },
  });
  return new Response(200, "berhasil mengupdate", responseUpdate, null, false);
}

async function gether(request) {
  const result = await validation(barangValidation.gether, request);
  const barang = await database.barang.findMany({
    where: {
      nama: {
        contains: result.q || undefined,
      },
    },
    include: {
      pembuat: {
        select: {
          id: true,
          username: true,
          role: true,
          nama: true,
          email: true,
          phone: true,
          created_at: true,
          update_at: true,
        },
      },
      penanggungJawab: {
        select: {
          id: true,
          username: true,
          role: true,
          nama: true,
          email: true,
          phone: true,
          created_at: true,
          update_at: true,
        },
      },
    },
  });
  return new Response(200, "berhasil mendapatkan barang", barang, null, false);
}

async function getById(request) {
  const result = await validation(barangValidation.getById, request);
  const data = await database.barang.findUnique({
    where: {
      id: result.id,
    },
    include: {
      pembuat: {
        select: {
          id: true,
          username: true,
          role: true,
          nama: true,
          email: true,
          phone: true,
          created_at: true,
          update_at: true,
        },
      },
      penanggungJawab: {
        select: {
          id: true,
          username: true,
          role: true,
          nama: true,
          email: true,
          phone: true,
          created_at: true,
          update_at: true,
        },
      },
      kategori: true,
    },
  });
  if (!data)
    throw new ApiError(400, "barang dengan id yang anda masukkan tidak ada");
  return new Response(
    200,
    "berhasil mendapatkan barang dengan id yang anda berikan",
    data,
    null,
    false
  );
}

async function hapus(request) {
  const result = await validation(barangValidation.hapus, request);
  const count = await database.barang.count({
    where: {
      id: result.id,
    },
  });
  if (!count)
    throw new ApiError(400, "barang id yang kamu berikan tidak valid");
  const responseDelete = await database.barang.delete({
    where: {
      id: result.id,
    },
  });
  return new Response(200, "berhasil menghapus", responseDelete, null, false);
}

export default { create, edit, gether, getById, hapus };
