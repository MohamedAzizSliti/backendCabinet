const express = require("express");
const router = express.Router();
const {
  addDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require("../Controllers/DocumentController");

router.post("/add", addDocument);
router.get("/", getDocuments);
router.get("/:id", getDocumentById);
router.put("/:id", updateDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
