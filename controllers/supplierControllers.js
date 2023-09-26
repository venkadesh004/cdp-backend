const SupplierSchema = require("../models/supplierSchema");

const getSupplier = async (req, res) => {
  try {
    const data = req.body;

    await SupplierSchema.find({email: data["email"]}).then((result) => {
      if (result.length === 0) {
        console.log(result);
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).json({err: "User not found!"});
      } else {
        if (result[0]["password"] === data["password"]) {
          res.setHeader('Content-Type', 'text/plain');
          res.status(200).json(result);
        } else {
          res.setHeader('Content-Type', 'text/plain');
          res.status(401).json({err: "Password Mismatch!"});
        }
      }
    }).catch((err) => {
      console.log(err);
      res.setHeader('Content-Type', 'text/plain');
      res.status(500).json({err: "Internal server Error!"});
    });
  } catch (err) {
    console.log(err);
  }
}

const addSupplier = async (req, res) => {
  try {
    const data = req.body;

    await SupplierSchema.find({ email: data["email"] })
      .then(async (result) => {
        if (result.length > 0) {
          res.setHeader("Content-Type", "text/plain");
          res.status(403).json({ err: "Email already Exists" });
        } else {
          await SupplierSchema.insertMany(data)
            .then((result) => {
              res.setHeader("Content-Type", "text/plain");
              res.status(201).json(result);
            })
            .catch((err) => {
              console.log(err);
              res.setHeader("Content-Type", "text/plain");
              res.status(500).json({
                err: "Internal server Error!",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.setHeader("Content-Type", "text/plain");
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getSupplier = getSupplier;
module.exports.addSupplier = addSupplier;