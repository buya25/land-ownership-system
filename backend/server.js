const express = require('express');
const app = express();
const cors = require('cors');
const connectToDatabase = require('./db/db-connect');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const landRoutes = require('./routes/landRoutes');
const errorHandler = require('./utils/errorHandler');
const api = process.env.API_URL


// Use the CORS middleware
app.use(cors({
  origin: process.env.FRONT_API, // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
  credentials: true, // If you need to send cookies or other credentials
}));


app.use(express.json());
app.use(`/api/auth`, authRoutes);
app.use(`/api/land`, landRoutes);


app.use(errorHandler)

const PORT = process.env.PORT || 5000;

connectToDatabase();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
