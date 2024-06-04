// Routes/AbonnementRoutes.js
const express = require("express");
const router = express.Router();
const {
  addAbonnement,
  getAbonnements,
  getAbonnementById,
  updateAbonnement,
  deleteAbonnement
} = require("../Controllers/AbonnementController");

router.post("/add", addAbonnement);
router.get("/", getAbonnements);
router.get("/:id", getAbonnementById);
router.put("/:id", updateAbonnement);
router.delete("/:id", deleteAbonnement);

module.exports = router;
