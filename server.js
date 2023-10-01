const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(
    cors({
        origin: "*"
    })
);

app.use(bodyParser.json());

const {supplierUpload, companyUpload} = require('./config/supplierDataStorage');

const connectDB = require('./db/db');
const adminRoutes = require('./routes/adminRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const companyRoutes = require('./routes/companyRoutes');
const SupplierSchema = require('./models/supplierSchema');
const CompanySchema = require('./models/companySchema');

connectDB();

app.use('/admin', adminRoutes);
app.use('/supplier', supplierRoutes);
app.use('/company', companyRoutes);

app.post('/supplier/fileUpload', supplierUpload.single('file'), async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    try {
        const data = req.body;  

        await SupplierSchema.updateOne({_id: data["_id"]}, {
            $set: {
                filename: req.file.filename,
                authorizer: ""
            }
        }).then(result => {
            console.log(result);
            res.status(201).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({err: "Internal server Error!"});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({err: "Internal server Error!"});
    }
});

app.post('/company/fileUpload', companyUpload.single('file'), async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    try {
        const data = req.body;

        await CompanySchema.updateOne({_id: data["_id"]}, {
            $set: {
                filename: req.file.filename
            }
        }).then(result => {
            console.log(result);
            res.status(201).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({err: "Internal server Error!"});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({err: "Internal server Error!"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});