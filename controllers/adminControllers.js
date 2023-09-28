const AdminSchema = require("../models/adminSchema");
const SupplierSchema = require("../models/supplierSchema");
const transport = require('../config/mailConfig');
const path = require('path');

const getAdmin = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  try {
    const data = req.body;

    await AdminSchema.find({ username: data.username })
      .then((result) => {
        // console.log(result);
        if (result.length === 0) {
          res.status(404).json({ err: "ID not found" });
        } else {
          if (result[0]["password"] !== data["password"]) {
            res.status(401).json({ err: "Password Mismatch" });
          } else {
            res.status(200).json(result);
          }
        }
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    // console.log(err);
    res.status(500).json({err: "Internal server Error!"});
  }
};

const addAdmin = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  try {
    const data = req.body;

    // console.log(data);

    await AdminSchema.find({ username: data["username"] })
      .then(async (result) => {
        if (result.length > 0) {
          res.status(403).json({ err: "Already username Exists" });
        } else {
          await AdminSchema.insertMany(data)
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((err) => {
              // console.log(err);
              res.status(500).json({ err: "Internal server Error!" });
            });
        }
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    // console.log(err);
    res.status(500).json({err: "Internal server Error!"});
  }
};

const getUnapprovedData = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  try {
    await SupplierSchema.find({}).then((result) => {
      var unapprovedList = [];

      result.forEach(element => {
        if (element["supplierID"] === "None") {
          unapprovedList.push(element);
        }
      });

      res.status(200).json(unapprovedList);
    }).catch((err) => {
      // console.log(err);
      res.status(500).json({err: "Internal server Error!"});
    })
  } catch (err) {
    // console.log(err);
    res.status(500).json({err: "Internal server Error!"});
  }
}

const getApprovedData = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  try {
    await SupplierSchema.find({}).then((result) => {
      var approvedList = [];

      result.forEach(element => {
        if (element["supplierID"] !== "None") {
          approvedList.push(element);
        }
      });

      res.status(200).json(approvedList);
    }).catch((err) => {
      // console.log(err);
      res.status(500).json({err: "Internal server Error!"});
    })
  } catch (err) {
    // console.log(err);
    res.status(500).json({err: "Internal server Error!"});
  }
}

const allowSuppliers = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  try {
    const data = req.body;
    
    // console.log(data["_id"]);

    await SupplierSchema.updateOne({_id: data["_id"]}, {
      $set: {
        supplierID: data["_id"],
        authorizer: data["username"]
      }
    }).then((result) => {
      res.status(204).json(result);
    }).catch((err) => {
      // console.log(err);
      res.status(500).json({err: "Internal server Error!"});
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({err: "Internal server Error!"});
  }
}

const denySuppliers = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  try {
    const data = req.body;

    await SupplierSchema.find({_id: data["_id"]}).then((result) => {
      if (result.length === 0) {
        res.status(404).json({err: "ID not found!"});
      } else {
        var mailOptions = {
          from: process.env.MAILUSER,
          to: result[0]["email"],
          subject: "Rejection of the application",
          text: data["comments"]
        };

        transport.sendMail(mailOptions, function (err, info) {
          if (err) {
            // console.log(err);
            res.status(500).json({err: "Internal server Error!"});
          } else {
            res.status(204).json(info.response);
          }
        });
      }
    }).catch((err) => {
      // console.log(err);
      res.status(500).json({err: "Internal server Error!"});
    })
  } catch (err) {
    // console.log(err);
    res.status(500).json({err: "Internal server Error!"});
  } 
}

const downloadFiles = async (req, res) => {
  try {
    const data = req.body;
    await SupplierSchema.findOne({_id: data["_id"]}).then(result => {
      res.setHeader('Content-Type', 'application/pdf');
      var destination = path.join('documents', 'supplierData', result["filename"]);
      res.status(200).download(destination);
    }).catch(err => {
      console.log(err);
      res.setHeader('Content-Type', 'text/plain');
    });
  } catch (err) {
    // console.log(err);
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).json({err: "Internal server Error!"});
  }
}

module.exports.getAdmin = getAdmin;
module.exports.addAdmin = addAdmin;
module.exports.getUnapprovedData = getUnapprovedData;
module.exports.getApprovedData = getApprovedData;
module.exports.allowSuppliers = allowSuppliers;
module.exports.denySuppliers = denySuppliers;
module.exports.downloadFiles = downloadFiles;