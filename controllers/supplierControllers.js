const SupplierSchema = require("../models/supplierSchema");
const CompanySchema = require("../models/companySchema");
const path = require("path");

const getSupplier = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  try {
    const data = req.body;

    await SupplierSchema.find({ email: data["email"] })
      .then((result) => {
        if (result.length === 0) {
          // console.log(result);
          res.status(404).json({ err: "User not found!" });
        } else {
          if (result[0]["password"] === data["password"]) {
            res.status(200).json(result);
          } else {
            res.status(401).json({ err: "Password Mismatch!" });
          }
        }
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ err: "Internal server Error!" });
  }
};

const addSupplier = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await SupplierSchema.find({ email: data["email"] })
      .then(async (result) => {
        if (result.length > 0) {
          res.status(403).json({ err: "Email already Exists" });
        } else {
          await SupplierSchema.insertMany(data)
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((err) => {
              // console.log(err);
              res.status(500).json({
                err: "Internal server Error!",
              });
            });
        }
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ err: "Internal server Error!" });
  }
};

const editProfile = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await SupplierSchema.updateOne({ _id: data["_id"] }, data)
      .then((result) => {
        res.status(204).json(result);
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ err: "Internal server Error!" });
  }
};

const acceptContract = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await SupplierSchema.findOne({ _id: data["_id"] })
      .then(async (result) => {
        var status = result["status"];
        status.forEach((element) => {
          if (element["compMail"] === data["compMail"]) {
            element["state"] = "ongoing";
          }
        });
        // console.log(status);

        await SupplierSchema.updateOne(
          { _id: data["_id"] },
          {
            $set: {
              status: status,
            },
          }
        )
          .then((output) => {
            // console.log(output);
            res.status(204).json(output);
          })
          .catch((err) => {
            // console.log(err);
            res.status(500).json({ err: "Internal server Error!" });
          });
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ err: "Internal server Error!" });
  }
};

const rejectContract = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await SupplierSchema.findOne({ _id: data["_id"] })
      .then(async (result) => {
        var status = result["status"];
        status.forEach((element) => {
          if (element["compMail"] === data["compMail"]) {
            element["state"] = "rejected";
          }
        });
        // console.log(status);

        await SupplierSchema.updateOne(
          { _id: data["_id"] },
          {
            $set: {
              status: status,
            },
          }
        )
          .then((output) => {
            // console.log(output);
            res.status(204).json(output);
          })
          .catch((err) => {
            // console.log(err);
            res.status(500).json({ err: "Internal server Error!" });
          });
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ err: "Internal server Error!" });
      });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ err: "Internal server Error!" });
  }
};

const downloadFiles = async (req, res) => {
  try {
    const data = req.params.id;
    await SupplierSchema.findOne({ _id: data })
      .then((result) => {
        res.setHeader("Content-Type", "application/pdf");
        var destination = path.join(
          "documents",
          "supplierData",
          result["filename"]
        );
        res.status(200).download(destination);
      })
      .catch((err) => {
        console.log(err);
        res.setHeader("Content-Type", "text/plain");
      });
  } catch (err) {
    // console.log(err);
    res.setHeader("Content-Type", "text/plain");
    res.status(500).json({ err: "Internal server Error!" });
  }
};

const downloadCompanyFile = async (req, res) => {
  try {
    const data = req.params.id;
    await CompanySchema.findOne({ _id: data })
      .then((result) => {
        res.setHeader("Content-Type", "application/pdf");
        var destination = path.join(
          "documents",
          "companyData",
          result["filename"]
        );
        res.status(200).download(destination);
      })
      .catch((err) => {
        console.log(err);
        res.setHeader("Content-Type", "text/plain");
      });
  } catch (err) {
    console.log(err);
    res.setHeader("Content-Type", "text/plain");
    res.status(500).json({ err: "Internal server Error!" });
  }
};

module.exports.getSupplier = getSupplier;
module.exports.addSupplier = addSupplier;
module.exports.editProfile = editProfile;
module.exports.acceptContract = acceptContract;
module.exports.rejectContract = rejectContract;
module.exports.downloadFiles = downloadFiles;
module.exports.downloadCompanyFile = downloadCompanyFile;