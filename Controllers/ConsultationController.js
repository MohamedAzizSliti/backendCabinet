// Controllers/ConsultationController.js
const { db } = require('../Database/database');

const addConsultation = (req, res) => {
  const { DateConsultation, Description, MontantPayee, Payee, Reste, patientCIN, doctorID } = req.body;

  const consultation = {
    DateConsultation,
    Description,
    MontantPayee,
    patientCIN,
    doctorID,
  };

  const sql = "INSERT INTO Consultation SET ?";
  db.query(sql, consultation, (err, result) => {
    if (err) {
      console.error("An error occurred while adding consultation:", err);
      res.status(500).send("An error occurred while adding consultation");
      return;
    }

    // Attach the insertId from the result to the consultation object
    consultation.id = result.insertId;

    res.status(201).json({
   consultation,
    });
  });
};



const getConsultations = (req, res) => {
  const sql = "SELECT * FROM Consultation";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getConsultationById = (req, res) => {
  const sql = `SELECT * FROM Consultation WHERE NumeroConsultation = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getConsultationByDoctorID = (req, res) => {
  const sql = `SELECT * FROM Consultation WHERE doctorID = '${req.params.doctorID}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const updateConsultation = (req, res) => {
  const { DateConsultation, Description, MontantPayee, Payee, Reste } = req.body;
  const updatedInfo = {
    DateConsultation,
    Description,
    MontantPayee,
    Payee,
    Reste,
  };

  const sql = `UPDATE Consultation SET ? WHERE NumeroConsultation = '${req.params.id}'`;
  db.query(sql, updatedInfo, (err, result) => {
    if (err) throw err;
    res.send("Consultation entry updated");
  });
};

const deleteConsultation = (req, res) => {
  const sql = `DELETE FROM Consultation WHERE NumeroConsultation = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Consultation entry deleted");
  });
};

module.exports = {
  addConsultation,
  getConsultations,
  getConsultationById,
  getConsultationByDoctorID,
  updateConsultation,
  deleteConsultation,
};
