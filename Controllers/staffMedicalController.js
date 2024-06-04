const { db } = require("../Database/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing or empty");
  }
  const {
    CIN,
    Nom,
    Prenom,
    Email,
    Role,
    MdpDePasse,
    NumTel,
    tel_ix,
    Specialite,
    AdresseCabinet,
    DateRecrutement,
    DoctorID,
  } = req.body;

  bcrypt.hash(MdpDePasse, 10, (err, hashedPassword) => {
    if (err) throw err;

    let staff = {
      CIN,
      Nom,
      Prenom,
      Email,
      Role,
      MdpDePasse: hashedPassword,
      NumTel,
      tel_ix,
      Specialite: Role === "Medecin" ? Specialite : null,
      AdresseCabinet: Role === "Medecin" ? AdresseCabinet : null,
      DateRecrutement: Role === "Secretaire" ? DateRecrutement : null,
      DoctorID: Role === "Secretaire" ? DoctorID : null,
      status: Role === "Medecin" ? "pending" : "accepted"
    };

    let sql = "INSERT INTO staffMedical SET ?";
    db.query(sql, staff, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Registration successful");
    });
  });
};

const login = (req, res) => {
  const { Email, MdpDePasse } = req.body;

  let sql = "SELECT * FROM staffMedical WHERE Email = ?";
  db.query(sql, [Email], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(400).send("Email or password is incorrect");
    }

    const user = results[0];

    // Check if the user is a doctor and their status is 'pending' or 'declined'
    if (user.Role === "Medecin" && (user.status === "pending" || user.status === "declined")) {
      return res.status(401).send("Doctor registration is pending or declined");
    }

    bcrypt.compare(MdpDePasse, user.MdpDePasse, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch) {
        return res.status(400).send("Email or password is incorrect");
      }

      const token = jwt.sign({ id: user.CIN, role: user.Role }, "secret", {
        expiresIn: "1h",
      });
      res.json({ id: user.CIN, role: user.Role, token });
    });
  });
};


const addstaffMedical = (req, res) => {
  let staff = {
    CIN: req.body.CIN,
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Email: req.body.Email,
    Role: req.body.Role,
    MdpDePasse: req.body.MdpDePasse,
    NumTel: req.body.NumTel,
    tel_ix: req.body.tel_ix,
    Specialite: req.body.Role === "Medecin" ? req.body.Specialite : null,
    AdresseCabinet: req.body.Role === "Medecin" ? req.body.AdresseCabinet : null,
    DateRecrutement: req.body.Role === "Secretaire" ? req.body.DateRecrutement : null,
    DoctorID: req.body.Role === "Secretaire" ? req.body.DoctorID : null,
  };
  let sql = "INSERT INTO staffMedical SET ?";
  db.query(sql, staff, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("staffMedical entry added");
  });
};

const getstaffMedicals = (req, res) => {
  let sql = "SELECT * FROM staffMedical";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
};

const getstaffMedicalByCIN = (req, res) => {
  let sql = `SELECT * FROM staffMedical WHERE CIN= '${req.params.CIN}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result[0]);
    res.send(result[0]);
  });
};

const updatestaffMedical = (req, res) => {
  let updatedInfo = {
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Email: req.body.Email,
    Role: req.body.Role,
    MdpDePasse: req.body.MdpDePasse,
    NumTel: req.body.NumTel,
    tel_ix: req.body.tel_ix,
    Specialite: req.body.Role === "Medecin" ? req.body.Specialite : null,
    AdresseCabinet: req.body.Role === "Medecin" ? req.body.AdresseCabinet : null,
    DateRecrutement: req.body.Role === "Secretaire" ? req.body.DateRecrutement : null,
    DoctorID: req.body.Role === "Secretaire" ? req.body.DoctorID : null,
  };
  let sql = `UPDATE staffMedical SET ? WHERE CIN='${req.params.CIN}'`;
  db.query(sql, updatedInfo, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("staffMedical entry updated");
  });
};

const getstaffMedicalById = (req, res) => {
  let sql = `SELECT * FROM staffMedical WHERE id= '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
};

const deletestaffMedical = (req, res) => {
  let sql = `DELETE FROM staffMedical WHERE CIN='${req.params.CIN}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("staffMedical entry deleted");
  });
};

const getstaffMedicalsByRoleAndStatus = (req, res) => {
  const { role } = req.params;
  const { status } = req.query; // Retrieve status from query parameters
  let sql = `SELECT * FROM staffMedical WHERE Role=?`;
  let params = [role];

  // If status is provided, add it to the SQL query and params
  if (status ) {
    sql += ` AND status=?`;
    params.push(status);
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error fetching staffMedicals by role and status:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("StaffMedicals by role and status:", result);
      res.send(result);
    }
  });
};




const getDoctorByCIN = (req, res) => {
  const CIN = req.params.CIN;
  let sql = `SELECT * FROM staffMedical WHERE CIN='${CIN}' AND Role='Medecin'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching doctor by CIN:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Doctor by CIN:", result);
      res.send(result[0]);
    }
  });
};

const getSecretaryByDoctorId = (req, res) => {
  const CIN = req.params.DoctorID;
  console.log('====================================');
  console.log(CIN);
  console.log('====================================');
  let sql = `SELECT * FROM staffMedical WHERE DoctorID='${CIN}' `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching secretary by CIN:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Secretary by CIN:", result);
      res.send(result[0]);
    }
  });
};

const acceptDoctor = (req, res) => {
  const { doctorId } = req.params;
  let sql = "UPDATE staffMedical SET status = 'accepted' WHERE CIN = ?";
  db.query(sql, [doctorId], (err, result) => {
    if (err) {
      console.error("Error accepting doctor:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(result);
      res.send({ message: 'Doctor accepted successfully' });
    }
  });
};

const declineDoctor = (req, res) => {
  const { doctorId } = req.params;
  let sql = "UPDATE staffMedical SET status = 'declined' WHERE CIN = ?";
  db.query(sql, [doctorId], (err, result) => {
    if (err) {
      console.error("Error declining doctor:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(result);
      res.send({ message: 'Doctor declined successfully' });
    }
  });
};


module.exports = {
  register,
  login,
  addstaffMedical,
  getstaffMedicals,
  getstaffMedicalByCIN,
  updatestaffMedical,
  deletestaffMedical,
  getstaffMedicalById,
  getstaffMedicalsByRoleAndStatus,
  getDoctorByCIN,
  getSecretaryByDoctorId,
  acceptDoctor,
  declineDoctor
};
