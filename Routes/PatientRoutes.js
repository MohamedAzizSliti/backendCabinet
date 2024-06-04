// Routes/PatientRoutes.js
const express = require("express");
const router = express.Router();
const {
  addPatient,
  getPatients,
  getPatientByCIN,
  updatePatient,
  deletePatient,
  getPatientsByDoctorID,
  getTotalConsultationsByPatientCIN,
  getTotalFeesPaidByPatientCIN,
  getTotalAppointmentsByPatientCIN
} = require("../Controllers/PatientController");

router.post("/add", addPatient);
router.get("/", getPatients);
router.get("/:CIN", getPatientByCIN);
router.put("/:CIN", updatePatient);
router.delete("/:CIN", deletePatient);
router.get("/doctor/:DoctorID", getPatientsByDoctorID);
router.get("/consultations/total/:patientCIN", getTotalConsultationsByPatientCIN);
router.get("/fees/total/:patientCIN", getTotalFeesPaidByPatientCIN);
router.get("/appointments/total/:patientCIN", getTotalAppointmentsByPatientCIN);

module.exports = router;
