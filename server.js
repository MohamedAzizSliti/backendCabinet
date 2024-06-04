const express = require("express");
const cors = require("cors");
const { setupDatabase } = require("./Database/database");
const staffMedicalRoutes = require("./Routes/staffMedicalRoutes");
const abonnementRoutes = require("./Routes/AbonnementRoutes");
const patientRoutes = require("./Routes/PatientRoutes");
const rendezVousRoutes = require("./Routes/RendezVousRoutes");
const consultationRoutes = require("./Routes/ConsultationRoutes");
const documentRoutes = require("./Routes/DocumentRoutes");

const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Ensure the database and table are created
setupDatabase();

// Use post routes
// app.use("/api/users", postRoutes); // Assuming postRoutes are for user-related routes
app.use("/api/staffMedical", staffMedicalRoutes); // Assuming staffMedicalRoutes are for staff medical-related routes
app.use("/api/abonnement", abonnementRoutes); // Abonnement routes
app.use("/api/patient", patientRoutes); // Patient routes
app.use("/api/rendezvous", rendezVousRoutes);
app.use("/api/consultation", consultationRoutes);
app.use("/api/document", documentRoutes);

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
  });
};
startServer();

// Handle port conflict error
app.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${PORT} is already in use. Trying another port...`);
    PORT++; // Try the next port
    startServer(); // Attempt to start the server again on the new port
  } else {
    console.error("Server startup error:", err);
  }
});
