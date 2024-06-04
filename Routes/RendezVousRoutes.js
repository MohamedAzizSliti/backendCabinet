// Routes/RendezVousRoutes.js
const express = require("express");
const { getRendezVousBySecretaireCIN, updateRendezVousStatusToWaitingRoom, getRendezVousInWaitingRoom, updateRendezVousStatusToDotorRoom, updateRendezVousStatusToFinishConsultation } = require("../Controllers/RendezVousController");
const router = express.Router();
const {
  addRendezVous,
  getRendezVous,
  getRendezVousById,
  getRendezVousByDoctorID,
  updateRendezVous,
  deleteRendezVous,
} = require("../Controllers/RendezVousController");

router.post("/add", addRendezVous);
router.get("/", getRendezVous);
router.get("/:id", getRendezVousById);
router.get("/doctor/:doctorID", getRendezVousByDoctorID);
router.get("/secretaire/:secretaireCIN", getRendezVousBySecretaireCIN); // Define the new route
router.put("/:id", updateRendezVous);
router.delete("/:id", deleteRendezVous);
router.get('/waitingRoom/:doctorID', getRendezVousInWaitingRoom);
router.put('/status/waitingRoom/:id', updateRendezVousStatusToWaitingRoom); 
router.put('/status/doctorRoom/:id', updateRendezVousStatusToDotorRoom); 
router.put('/status/finishConsultation/:id', updateRendezVousStatusToFinishConsultation); 

module.exports = router;
