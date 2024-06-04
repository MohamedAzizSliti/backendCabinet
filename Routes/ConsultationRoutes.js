// Routes/ConsultationRoutes.js
const express = require("express");
const router = express.Router();
const {
  addConsultation,
  getConsultations,
  getConsultationById,
  getConsultationByDoctorID,
  updateConsultation,
  deleteConsultation,
} = require("../Controllers/ConsultationController");

router.post("/add", addConsultation);
router.get("/", getConsultations);
router.get("/:id", getConsultationById);
router.get("/doctor/:doctorID", getConsultationByDoctorID);
router.put("/:id", updateConsultation);
router.delete("/:id", deleteConsultation);

module.exports = router;
