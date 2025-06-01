import { database } from "../app/database.js";
import { ApiError } from "../errors/response.error.js";
import { Response } from "../utils/response.template.js";
import kategori_barangValidation from "../validations/kategori_barang.validation.js";
import { validation } from "../validations/validation.js";

async function create(request) {
  const result = await validation(kategori_barangValidation.create, request);
  const count = await database.kategoriBarang.count({
    where: {
      nama: result.nama,
    },
  });
  if (count) {
    throw new ApiError(400, "kategori sudah ada!");
  }
  result.id = await crypto.randomUUID();
  const responseCreate = await database.kategoriBarang.create({
    data: result,
  });
  return new Response(
    200,
    "berhasil menambahkan kategori barang",
    responseCreate,
    null,
    false
  );
}

async function gether(request) {
  const result = await validation(kategori_barangValidation.gether, request);
  const kategoriBarang = await database.kategoriBarang.findMany({
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
    },
    orderBy: {
      nama: "asc",
    },
  });
  return new Response(
    200,
    "berhasil mendapatkan kategori",
    kategoriBarang,
    null,
    false
  );
}

async function getById(request) {
  const result = await validation(kategori_barangValidation.getById, request);
  const data = await database.kategoriBarang.findUnique({
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
    },
  });
  if (!data)
    throw new ApiError(
      400,
      "kategori barang dengan id yang anda masukkan tidak ada"
    );
  return new Response(
    200,
    "berhasil mendapatkan kategori barang dengan id yang anda berikan",
    data,
    null,
    false
  );
}

async function update(request) {
  const result = await validation(kategori_barangValidation.update, request);
  const count = await database.kategoriBarang.count({
    where: {
      id: result.id,
    },
  });
  if (!count)
    throw new ApiError(400, "kategori barang id yang kamu berikan tidak valid");
  const updateResponse = await database.kategoriBarang.update({
    data: {
      nama: result.nama,
    },
    where: {
      id: result.id,
    },
  });
  return new Response(
    200,
    "berhasil mengupdate !",
    updateResponse,
    null,
    false
  );
}

async function hapus(request) {
  const result = await validation(kategori_barangValidation.hapus, request);
  const count = await database.kategoriBarang.count({
    where: {
      id: result.id,
    },
  });
  if (!count)
    throw new ApiError(400, "kategori barang id yang kamu berikan tidak valid");
  const responseDelete = await database.kategoriBarang.delete({
    where: {
      id: result.id,
    },
  });
  return new Response(200, "berhasil menghapus", responseDelete, null, false);
}

export default { create, gether, getById, update, hapus };
