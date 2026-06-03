const express = require("express");

const {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getPackages)
  .post(protect, adminOnly, createPackage);

router
  .route("/:id")
  .get(getPackageById)
  .patch(protect, adminOnly, updatePackage)
  .delete(protect, adminOnly, deletePackage);

module.exports = router;