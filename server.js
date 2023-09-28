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

const supplierUpload = require('./config/supplierDataStorage');

const connectDB = require('./db/db');
const adminRoutes = require('./routes/adminRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const companyRoutes = require('./routes/companyRoutes');

connectDB();

app.use('/admin', adminRoutes);
app.use('/supplier', supplierRoutes);
app.use('/company', companyRoutes);

app.post('/supplier/fileUpload', supplierUpload.single('file'), (req, res) => {
    res.status(201).json("Done");
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});