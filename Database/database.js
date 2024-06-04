const mysql = require("mysql");

// Create initial connection without specifying database
const initialDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

// Create connection for main usage (with the specified database)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "CabinetMedcine",
});

const setupDatabase = () => {
  initialDb.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Initial connection done");

    initialDb.query(
      "CREATE DATABASE IF NOT EXISTS CabinetMedcine",
      (err, result) => {
        if (err) throw err;
        console.log("Database ensured to exist");

        db.connect((err) => {
          if (err) {
            throw err;
          }
          console.log("Connection to CabinetMedcine database done");

          const createStaffMedicalTableQuery = `
            CREATE TABLE IF NOT EXISTS staffMedical (
              CIN VARCHAR(255) PRIMARY KEY,
              Nom VARCHAR(255),
              Prenom VARCHAR(255),
              Email VARCHAR(255),
              Role VARCHAR(255),
              MdpDePasse VARCHAR(255),
              NumTel VARCHAR(255),
              tel_ix VARCHAR(255),
              Specialite VARCHAR(255),
              AdresseCabinet VARCHAR(255),
              DateRecrutement DATE,
              DoctorID VARCHAR(255),
              status VARCHAR(255),
              FOREIGN KEY (DoctorID) REFERENCES staffMedical(CIN)
            )
          `;

          const createAbonnementTableQuery = `
            CREATE TABLE IF NOT EXISTS Abonnement (
              id INT AUTO_INCREMENT PRIMARY KEY,
              doctorId VARCHAR(255),
              date_debut DATE,
              date_fin DATE,
              duree INT,
              etat INT,
              description TEXT,
              prix DOUBLE,
              FOREIGN KEY (doctorId) REFERENCES staffMedical(CIN)
            )
          `;

          const createPatientTableQuery = `
            CREATE TABLE IF NOT EXISTS Patient (
              CIN VARCHAR(255) PRIMARY KEY,
              Nom VARCHAR(255),
              Prenom VARCHAR(255),
              Email VARCHAR(255),
              Adresse VARCHAR(255),
              NumTel VARCHAR(255),
              Sexe VARCHAR(50),
              DateNaissance DATE,
              Age INT,
              Profession VARCHAR(255),
              DoctorID VARCHAR(255),
              FOREIGN KEY (DoctorID) REFERENCES staffMedical(CIN)
            )
          `;

          const createConsultationTableQuery = `
            CREATE TABLE IF NOT EXISTS Consultation (
              NumeroConsultation INT AUTO_INCREMENT PRIMARY KEY,
              DateConsultation DATE,
              Description VARCHAR(255),
              MontantPayee DOUBLE,
              patientCIN VARCHAR(255),
              doctorID VARCHAR(255),
              FOREIGN KEY (patientCIN) REFERENCES Patient(CIN),
              FOREIGN KEY (doctorID) REFERENCES staffMedical(CIN)
            )
          `;

          const createDocumentTableQuery = `
          CREATE TABLE IF NOT EXISTS Document (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            type VARCHAR(255),
            date_creation DATE,
            consultationID INT,
            documentType ENUM('Ordonnance', 'Certificat', 'CompteRendu'),
            nombre_days INT, -- Added for Ordonnance
            DateDoccument DATE, -- Added for Certificat
            FOREIGN KEY (consultationID) REFERENCES Consultation(NumeroConsultation)
          )
        `;
        

          const createRendezVousTableQuery = `
            CREATE TABLE IF NOT EXISTS Rendez_vous (
              id INT AUTO_INCREMENT PRIMARY KEY,
              title VARCHAR(255),
              patientCIN VARCHAR(255),
              doctorID VARCHAR(255),
              heure_debut TIMESTAMP NOT NULL,
              heure_fin TIMESTAMP NOT NULL DEFAULT '2038-01-19 03:14:07',
              etat INT,
              status VARCHAR(50), -- Add status column
              FOREIGN KEY (patientCIN) REFERENCES Patient(CIN),
              FOREIGN KEY (doctorID) REFERENCES staffMedical(CIN)
            )
          `;

          db.query(createStaffMedicalTableQuery, (err, result) => {
            if (err) throw err;
            console.log("staffMedical table ensured to exist");
          });

          db.query(createAbonnementTableQuery, (err, result) => {
            if (err) throw err;
            console.log("Abonnement table ensured to exist");
          });

          db.query(createPatientTableQuery, (err, result) => {
            if (err) throw err;
            console.log("Patient table ensured to exist");
          });

          db.query(createConsultationTableQuery, (err, result) => {
            if (err) throw err;
            console.log("Consultation table ensured to exist");
          });

          db.query(createDocumentTableQuery, (err, result) => {
            if (err) throw err;
            console.log("Document table ensured to exist");
          });

          db.query(createRendezVousTableQuery, (err, result) => {
            if (err) throw err;
            console.log("Rendez_vous table ensured to exist");
          });
        });
      }
    );
  });
};

module.exports = { db, setupDatabase };
