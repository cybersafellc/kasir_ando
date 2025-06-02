import express from "express";
import penggunaController from "../../controllers/pengguna.controller.js";
import kategori_barangController from "../../controllers/kategori_barang.controller.js";
import authorizationMiddleware from "../../middlewares/authorization.middleware.js";
import barangController from "../../controllers/barang.controller.js";
import stok_masukController from "../../controllers/stok_masuk.controller.js";

const router = express.Router();
// pengguna route
router.post("/users", penggunaController.create);
router.post("/users/auth", penggunaController.auth);
// kategori barang route
router.post(
  "/kategori_barang",
  authorizationMiddleware.allRoleApi,
  kategori_barangController.create
);
router.put(
  "/kategori_barang",
  authorizationMiddleware.allRoleApi,
  kategori_barangController.update
);
router.delete(
  "/kategori_barang",
  authorizationMiddleware.allRoleApi,
  kategori_barangController.hapus
);
router.get(
  "/kategori_barang",
  authorizationMiddleware.allRoleApi,
  kategori_barangController.gether
);

// barang route
router.post(
  "/barang",
  authorizationMiddleware.allRoleApi,
  barangController.create
);
router.put(
  "/barang",
  authorizationMiddleware.allRoleApi,
  barangController.edit
);
router.get(
  "/barang",
  authorizationMiddleware.allRoleApi,
  barangController.gether
);
router.delete(
  "/barang",
  authorizationMiddleware.allRoleApi,
  barangController.hapus
);

//stok masuk service
router.post(
  "/stok_masuk",
  authorizationMiddleware.allRoleApi,
  stok_masukController.create
);
router.delete(
  "/stok_masuk",
  authorizationMiddleware.allRoleApi,
  stok_masukController.hapus
);
export default router;
