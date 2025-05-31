import express from "express";
import penggunaController from "../../controllers/pengguna.controller.js";
import kategori_barangController from "../../controllers/kategori_barang.controller.js";
import authorizationMiddleware from "../../middlewares/authorization.middleware.js";

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

export default router;
