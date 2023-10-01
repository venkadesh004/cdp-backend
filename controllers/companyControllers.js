const CompanySchema = require("../models/companySchema");
const SupplierSchema = require("../models/supplierSchema");
const path = require("path");

const getCompany = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await CompanySchema.find({ email: data["email"] })
      .then((result) => {
        if (result.length === 0) {
          // console.log(result);
          res.status(404).json({ err: "User not found" });
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

const addCompany = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await CompanySchema.find({ email: data["email"] })
      .then(async (result) => {
        if (result.length > 0) {
          res.status(403).json({ err: "Email already Exists" });
        } else {
          await CompanySchema.insertMany(data)
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
    res.status(500).json({ err: "Internal server Error!" });
  }
};

const getSuppliers = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    await SupplierSchema.find({})
      .then((result) => {
        res.status(200).json(result);
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

const addComment = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await SupplierSchema.findOne({ _id: data["_id"] })
      .then(async (result) => {
        var comment = {
          name: data["compName"],
          email: data["compMail"],
          comment: data["comment"],
        };

        var comments = result["comments"];
        comments.push(comment);
        // console.log(comments);

        await SupplierSchema.updateOne(
          { _id: data["_id"] },
          {
            $set: {
              comments: comments,
            },
          }
        )
          .then((result) => {
            // console.log(result);
            res.status(204).json(result);
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

const addRating = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await SupplierSchema.findOne({ _id: data["_id"] })
      .then(async (result) => {
        var rating = data["rating"];
        var oldRating = result["rating"];
        oldRating = Math.round((oldRating + rating) / 2);
        // console.log(oldRating);

        await SupplierSchema.updateOne(
          { _id: data["_id"] },
          {
            $set: {
              rating: oldRating,
            },
          }
        )
          .then((result) => {
            // console.log(result);
            res.status(204).json(result);
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

const sendRequest = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await SupplierSchema.findOne({ _id: data["_id"] })
      .then(async (result) => {
        var newStatus = {
          compMail: data["compMail"],
          state: "requested",
        };

        var status = result["status"];
        status.push(newStatus);
        // console.log(status);

        await SupplierSchema.updateOne(
          { _id: data["_id"] },
          {
            $set: {
              status: status,
            },
          }
        )
          .then((result) => {
            // console.log(result);
            res.status(204).json(result);
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

const contractComplete = async (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  try {
    const data = req.body;

    await SupplierSchema.findOne({ _id: data["_id"] })
      .then(async (result) => {
        var status = result["status"];
        status.forEach((element) => {
          if (element["compMail"] === data["compMail"]) {
            element["state"] = "completed";
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
    // console.log(err);
    res.setHeader("Content-Type", "text/plain");
    res.status(500).json({ err: "Internal server Error!" });
  }
};

const getCompanyID = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  try {
    const data = req.params.id;
    await CompanySchema.find({"_id": data}).then(result => {
      if (result.length === 0) {
        res.status(404).json({err: "Company not found!"});
      } else {
        res.status(200).json(result);
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({err: "Internal server Error!"});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({err: "Internal server Error!"});
  }
};

module.exports.getCompany = getCompany;
module.exports.addCompany = addCompany;
module.exports.getSuppliers = getSuppliers;
module.exports.addComment = addComment;
module.exports.addRating = addRating;
module.exports.sendRequest = sendRequest;
module.exports.contractComplete = contractComplete;
module.exports.downloadFiles = downloadFiles;
module.exports.downloadCompanyFile = downloadCompanyFile;
module.exports.getCompanyID = getCompanyID;