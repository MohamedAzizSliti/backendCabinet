const { db } = require('../Database/database');

const addDocument = (req, res) => {
  const { title, description, type, date_creation, consultationID, documentType, nombre_days, DateDoccument } = req.body;

  const document = { title, description, type, date_creation, consultationID, documentType, nombre_days };

  // Conditionally include date_debut_certificat based on document type
  if (documentType === 'Certificat') {
    document.DateDoccument = DateDoccument;
  }
  const sql = "INSERT INTO Document SET ?";
  db.query(sql, document, (err, result) => {
    if (err) {
      console.error("Error adding document:", err);
      res.status(500).send("Error adding document");
    } else {
      console.log("Document entry added");
      res.status(200).send("Document entry added");
    }
  });
};

const getDocuments = (req, res) => {
  const sql = "SELECT * FROM Document";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching documents:", err);
      res.status(500).send("Error fetching documents");
    } else {
      res.status(200).send(result);
    }
  });
};

const getDocumentById = (req, res) => {
  const sql = `SELECT * FROM Document WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching document by ID:", err);
      res.status(500).send("Error fetching document by ID");
    } else {
      if (result.length > 0) {
        res.status(200).send(result[0]);
      } else {
        res.status(404).send("Document not found");
      }
    }
  });
};

const updateDocument = (req, res) => {
  const { title, description, type, date_creation, consultationID, documentType, nombre_days, date_debut_certificat } = req.body;
  const updatedInfo = { title, description, type, date_creation, consultationID, documentType, nombre_days, date_debut_certificat };

  const sql = `UPDATE Document SET ? WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, updatedInfo, (err, result) => {
    if (err) {
      console.error("Error updating document:", err);
      res.status(500).send("Error updating document");
    } else {
      res.status(200).send("Document entry updated");
    }
  });
};

const deleteDocument = (req, res) => {
  const sql = `DELETE FROM Document WHERE id = ${db.escape(req.params.id)}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error deleting document:", err);
      res.status(500).send("Error deleting document");
    } else {
      res.status(200).send("Document entry deleted");
    }
  });
};

module.exports = {
  addDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
