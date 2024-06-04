// Controllers/RendezVousController.js
const { db } = require('../Database/database');

const addRendezVous = (req, res) => {
  const { patientCIN, secretaireID, heure_debut, heure_fin, etat,title } = req.body;

  // Check if secretaire exists in staffMedical table
  const secretaireSql = `SELECT DoctorID FROM staffMedical WHERE CIN = '${secretaireID}' AND role = 'secretaire'`;
  db.query(secretaireSql, (err, result) => {
    if (err) throw err; 

    if (result.length === 0) {
      return res.status(404).send("Secrétaire not found");
    }

    const doctorId = result[0].DoctorID;

    const rendezVous = {
      patientCIN,
      doctorID: doctorId,
      heure_debut,
      title,
      heure_fin,
      etat,
      status:"pending"
    };
    console.log('====================================');
    console.log(JSON.stringify(rendezVous));
    console.log('====================================');

    const sql = "INSERT INTO Rendez_vous SET ?";
    db.query(sql, rendezVous, (err, result) => {
      if (err) throw err;
      res.send("Rendez-vous entry added");
    });
  });
};

const getRendezVous = (req, res) => {
  const sql = "SELECT * FROM Rendez_vous";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getRendezVousById = (req, res) => {
  const sql = `SELECT * FROM Rendez_vous WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getRendezVousByDoctorID = (req, res) => {
  const sql = `SELECT * FROM Rendez_vous WHERE doctorID = '${req.params.doctorID}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const updateRendezVous = (req, res) => {
  const { heure_debut, heure_fin, etat,title } = req.body;
  console.log('====================================');
  console.log(JSON.stringify( heure_debut, heure_fin, etat,title));
  console.log('====================================');
  const updatedInfo = {
    title,
    heure_debut,
    heure_fin,
    etat,
  };

  const sql = `UPDATE Rendez_vous SET ? WHERE id = '${req.params.id}'`;
  db.query(sql, updatedInfo, (err, result) => {
    if (err) throw err;
    res.send("Rendez-vous entry updated");
  });
};

const deleteRendezVous = (req, res) => {
  const sql = `DELETE FROM Rendez_vous WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Rendez-vous entry deleted");
  });
};
const getRendezVousBySecretaireCIN = (req, res) => {
  const { secretaireCIN } = req.params;

  // Check if secretaire exists in staff table
  const sql = `SELECT DoctorID FROM staffMedical WHERE CIN = '${secretaireCIN}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(404).send("Secrétaire not found");
    }

    const doctorId = result[0].DoctorID;

    // If secretaire found, get rendezvous by doctor ID
    const rendezVousSql = `SELECT * FROM Rendez_vous WHERE doctorID = '${doctorId}'`;
    db.query(rendezVousSql, (err, rendezVousResult) => {
      if (err) throw err;
      res.send(rendezVousResult);
    });
  });
};
const getRendezVousInWaitingRoom = (req, res) => {
  const doctorID = req.params.doctorID;
  const sql = `
    SELECT * FROM Rendez_vous 
    WHERE status = 'waiting room' 
      AND doctorID = '${doctorID}' 
      AND DATE(heure_debut) = CURDATE()
    ORDER BY heure_debut ASC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("An error occurred while fetching data.");
      return;
    }
    res.send(result);
  });
};


const updateRendezVousStatusToWaitingRoom = (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE Rendez_vous SET status = 'waiting room' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Rendez-vous status updated to 'waiting room'");
  });
};
const updateRendezVousStatusToDotorRoom = (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE Rendez_vous SET status = 'doctor room' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Rendez-vous status updated to 'doctor room'");
  });
};
const updateRendezVousStatusToFinishConsultation = (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE Rendez_vous SET status = 'finish consultation' WHERE id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Rendez-vous status updated to 'finish consultation'");
  });
};
module.exports = {
  getRendezVousBySecretaireCIN,
  addRendezVous,
  getRendezVous,
  getRendezVousById,
  getRendezVousByDoctorID,
  updateRendezVous,
  deleteRendezVous,
  getRendezVousInWaitingRoom,
  updateRendezVousStatusToWaitingRoom,
  updateRendezVousStatusToDotorRoom,
  updateRendezVousStatusToFinishConsultation
};
