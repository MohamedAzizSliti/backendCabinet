const express = require("express");
const router = express.Router();
const staffMedicalController = require("../Controllers/staffMedicalController");

router.post("/register", staffMedicalController.register);
router.post("/login", staffMedicalController.login);
router.post("/addstaffMedical", staffMedicalController.addstaffMedical);
router.get("/getstaffMedicals", staffMedicalController.getstaffMedicals);
router.get("/getstaffMedicalById/:id", staffMedicalController.getstaffMedicalById);
router.get("/getstaffMedical/:CIN", staffMedicalController.getstaffMedicalByCIN);
router.put("/updatestaffMedical/:CIN", staffMedicalController.updatestaffMedical);
router.delete("/deletestaffMedical/:CIN", staffMedicalController.deletestaffMedical);
router.get("/role/:role", staffMedicalController.getstaffMedicalsByRoleAndStatus);
router.get("/getDoctorByCIN/:CIN", staffMedicalController.getDoctorByCIN);
router.get("/getSecretaryByDoctorId/:DoctorID", staffMedicalController.getSecretaryByDoctorId);
router.put("/acceptDoctor/:doctorId", staffMedicalController.acceptDoctor);
router.put("/declineDoctor/:doctorId", staffMedicalController.declineDoctor);

module.exports = router;
