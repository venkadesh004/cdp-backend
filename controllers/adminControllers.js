const AdminSchema = require("../models/adminSchema");

const getAdmin = async (req, res) => {
  try {
    const data = req.body;

    await AdminSchema.find({ username: data.username })
      .then((result) => {
        // console.log(result);
        if (result.length === 0) {
          res.setHeader("Content-Type", "text/plain");
          res.status(404).json({ err: "ID not found" });
        } else {
          if (result[0]["password"] !== data["password"]) {
            res.setHeader("Content-Type", "text/plain");
            res.status(401).json({ err: "Password Mismatch" });
          } else {
            res.setHeader("Content-Type", "text/plain");
            res.status(200).json(result);
          }
        }
      })
      .catch((err) => {
        // console.log(err);
        res.setHeader("Content-Type", "text/plain");
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    // console.log(err);
  }
};

const addAdmin = async (req, res) => {
  try {
    const data = req.body;

    // // console.log(data);

    await AdminSchema.find({ username: data["username"] })
      .then(async (result) => {
        if (result.length > 0) {
          res.setHeader("Content-Type", "text/plain");
          res.status(403).json({ err: "Already username Exists" });
        } else {
          await AdminSchema.insertMany(data)
            .then((result) => {
              res.setHeader("Content-Type", "text/plain");
              res.status(201).json(result);
            })
            .catch((err) => {
              // console.log(err);
              res.setHeader("Content-Type", "text/plain");
              res.status(500).json({ err: "Internal server Error!" });
            });
        }
      })
      .catch((err) => {
        // console.log(err);
        res.setHeader("Content-Type", "text/plain");
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    // console.log(err);
  }
};

module.exports.getAdmin = getAdmin;
module.exports.addAdmin = addAdmin;