// Controllers/AbonnementController.js
const { db } = require('../Database/database');

const addAbonnement = (req, res) => {
  const { doctorId, date_debut, date_fin, duree, etat, description, prix } = req.body;
  
  const abonnement = {
    doctorId,
    date_debut,
    date_fin,
    duree,
    etat,
    description,
    prix,
  };

  const sql = "INSERT INTO Abonnement SET ?";
  db.query(sql, abonnement, (err, result) => {
    if (err) throw err;
    res.send("Abonnement entry added");
  });
};

const getAbonnements = (req, res) => {
  const sql = "SELECT * FROM Abonnement";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getAbonnementById = (req, res) => {
  const sql = `SELECT * FROM Abonnement WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const updateAbonnement = (req, res) => {
  const { date_debut, date_fin, duree, etat, description, prix } = req.body;
  
  const updatedInfo = {
    date_debut,
    date_fin,
    duree,
    etat,
    description,
    prix,
  };

  const sql = `UPDATE Abonnement SET ? WHERE id = ${req.params.id}`;
  db.query(sql, updatedInfo, (err, result) => {
    if (err) throw err;
    res.send("Abonnement entry updated");
  });
};

const deleteAbonnement = (req, res) => {
  const sql = `DELETE FROM Abonnement WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Abonnement entry deleted");
  });
};

module.exports = {
  addAbonnement,
  getAbonnements,
  getAbonnementById,
  updateAbonnement,
  deleteAbonnement,
};
