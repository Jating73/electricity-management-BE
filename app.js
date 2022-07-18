const dotenv = require('dotenv');
// Environment variable Initialization
dotenv.config();

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const dbConfig = require('./db/dbHandler');
const app = express();
const PORT = process.env.PORT || 6000;

// Imported Routes
const electricity = require('./routes/electricity');

// Cors Enabled
app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routes
app.use('/', electricity);

// Server listening at specific port
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});