// Controllers/PatientController.js
const { db } = require('../Database/database');

const addPatient = (req, res) => {
  const { CIN, Nom, Prenom, Email, Adresse, NumTel, Sexe, DateNaissance, Age, Profession, DoctorID } = req.body;
  
  const patient = {
    CIN,
    Nom,
    Prenom,
    Email,
    Adresse,
    NumTel,
    Sexe,
    DateNaissance,
    Age,
    Profession,
    DoctorID,
  };

  const sql = "INSERT INTO Patient SET ?";
  db.query(sql, patient, (err, result) => {
    if (err) throw err;
    res.send("Patient entry added");
  });
};

const getPatients = (req, res) => {
  const sql = "SELECT * FROM Patient";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getPatientByCIN = (req, res) => {
  const sql = `SELECT * FROM Patient WHERE CIN = '${req.params.CIN}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
};

const updatePatient = (req, res) => {
  const { Nom, Prenom, Email, Adresse, NumTel, Sexe, DateNaissance, Age, Profession, DoctorID } = req.body;
  
  const updatedInfo = {
    Nom,
    Prenom,
    Email,
    Adresse,
    NumTel,
    Sexe,
    DateNaissance,
    Age,
    Profession,
    DoctorID,
  };

  const sql = `UPDATE Patient SET ? WHERE CIN = '${req.params.CIN}'`;
  db.query(sql, updatedInfo, (err, result) => {
    if (err) throw err;
    res.send("Patient entry updated");
  });
};

const deletePatient = (req, res) => {
  const sql = `DELETE FROM Patient WHERE CIN = '${req.params.CIN}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Patient entry deleted");
  });
};
const getPatientsByDoctorID = (req, res) => {
    const sql = `SELECT * FROM Patient WHERE DoctorID = '${req.params.DoctorID}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  };
  const getTotalAppointmentsByPatientCIN = (req, res) => {
    const { patientCIN } = req.params;
    const sql = `SELECT COUNT(*) AS totalAppointments FROM Rendez_vous WHERE patientCIN = '${patientCIN}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  };
  
  const getTotalConsultationsByPatientCIN = (req, res) => {
    const { patientCIN } = req.params;
    const sql = `SELECT COUNT(*) AS totalConsultations FROM Consultation WHERE patientCIN = '${patientCIN}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  };
  
 
  
  const getTotalFeesPaidByPatientCIN = (req, res) => {
    const { patientCIN } = req.params;
    const sql = `SELECT SUM(MontantPayee) AS totalFeesPaid FROM Consultation WHERE patientCIN = '${patientCIN}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  };
  
module.exports = {
  addPatient,
  getPatients,
  getPatientByCIN,
  updatePatient,
  deletePatient,
  getPatientsByDoctorID,
  getTotalConsultationsByPatientCIN,
  getTotalFeesPaidByPatientCIN,
  getTotalAppointmentsByPatientCIN
};
