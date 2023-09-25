const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: "*"
    })
);

const PORT = 5000;

const connectDB = require('./db/db');
const adminRoutes = require('./routes/adminRoutes');

connectDB();

app.use('/admin', bodyParser.json(), adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});