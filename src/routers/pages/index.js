import express from "express";
import viewsController from "../../controllers/views.controller.js";
import authorizationMiddleware from "../../middlewares/authorization.middleware.js";

const router = express.Router();
router.get("/daftar", viewsController.daftar);
router.get("/login", viewsController.login);
router.get("/home", authorizationMiddleware.allRolePages, viewsController.home);
router.get(
  "/kategori_barang",
  authorizationMiddleware.allRolePages,
  viewsController.kategoriBarang
);
router.get(
  "/logout",
  authorizationMiddleware.allRolePages,
  viewsController.logout
);
router.get(
  "/barang",
  authorizationMiddleware.allRolePages,
  viewsController.barang
);
router.get(
  "/barang/masuk",
  authorizationMiddleware.allRolePages,
  viewsController.barangMasuk
);
router.get(
  "/otp/verification",
  authorizationMiddleware.token2FAauthPages,
  viewsController.otpVerification
);
router.get(
  "/pengguna",
  authorizationMiddleware.adminRolePages,
  viewsController.pengguna
);
export default router;
