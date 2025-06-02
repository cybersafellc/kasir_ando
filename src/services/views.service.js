import { database } from "../app/database.js";
import { formatRupiah } from "../utils/etc.js";
import { Response } from "../utils/response.template.js";
import { validation } from "../validations/validation.js";
import viewValidation from "../validations/view.validation.js";

async function daftar(request) {
  const data = {
    project_name: await process.env.PROJECT_NAME,
  };
  return new Response(200, "success response", data, "daftar", false);
}

async function login(request) {
  const data = {
    project_name: await process.env.PROJECT_NAME,
  };
  return new Response(200, "success response", data, "login", false);
}

async function kategoriBarang(request) {
  const result = await validation(viewValidation.kategoriBarang, request);
  const count = await database.kategoriBarang.count({
    where: {
      nama: {
        contains: result?.q,
      },
    },
  });
  const kategoriList = {
    data: await database.kategoriBarang.findMany({
      where: {
        nama: {
          contains: result?.q,
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
      skip: result?.page ? (result.page - 1) * result.take : 0,
      take: result?.take ? result.take : 10,
      orderBy: {
        update_at: "desc",
      },
    }),
    page: result?.page,
    max_page: Math.ceil(count / result?.take),
    user: await database.pengguna.findUnique({
      where: {
        id: result.id,
      },
    }),
  };
  return new Response(
    200,
    "success response",
    { kategoriList },
    "kategori_barang",
    false
  );
}

async function barang(request) {
  const result = await validation(viewValidation.barang, request);
  const count = await database.barang.count({
    where: {
      nama: {
        contains: result?.q,
      },
    },
  });
  let barang = {
    data: await database.barang.findMany({
      where: result?.q
        ? {
            OR: [
              {
                nama: {
                  contains: result?.q || undefined,
                },
              },
              {
                kode_barang: {
                  contains: result?.q || undefined,
                },
              },
            ],
          }
        : undefined,
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
      skip: result?.page ? (result.page - 1) * result.take : 0,
      take: result?.take ? result.take : 10,
      orderBy: {
        update_at: "desc",
      },
    }),
    kategori_barang: await database.kategoriBarang.findMany({
      orderBy: {
        nama: "asc",
      },
    }),
    page: result?.page,
    max_page: Math.ceil(count / result?.take),
    user: await database.pengguna.findUnique({
      where: {
        id: result.id,
      },
    }),
  };
  barang.data = barang.data.map(function (data) {
    data.harga = formatRupiah(data.harga);
    return data;
  });
  return new Response(200, "success response", { barang }, "barang", false);
}

async function barangMasuk(request) {
  const result = await validation(viewValidation.barangMasuk, request);
  const count = await database.stokMasuk.count();
  let barangMasuk = {
    data: await database.stokMasuk.findMany({
      where: result?.q
        ? {
            barang: {
              OR: [
                {
                  nama: {
                    contains: result?.q || undefined,
                  },
                },
                {
                  kode_barang: {
                    contains: result?.q || undefined,
                  },
                },
              ],
            },
          }
        : undefined,
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
        barang: true,
      },
      skip: result?.page ? (result.page - 1) * result.take : 0,
      take: result?.take ? result.take : 10,
      orderBy: {
        update_at: "desc",
      },
    }),
    barang: await database.barang.findMany({
      orderBy: {
        nama: "asc",
      },
    }),
    page: result?.page,
    max_page: Math.ceil(count / result?.take),
    user: await database.pengguna.findUnique({
      where: {
        id: result.id,
      },
    }),
  };
  barangMasuk.data = barangMasuk.data.map(function (data) {
    data.harga_satuan = formatRupiah(data.harga_satuan);
    return data;
  });
  return new Response(
    200,
    "berhasil response",
    { barangMasuk },
    "barang_masuk",
    false
  );
}

export default { daftar, login, kategoriBarang, barang, barangMasuk };
