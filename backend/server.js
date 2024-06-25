// import necessary modules
import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';

import config from './config/config.js';
import productRoute from './src/routes/productRoute.js'

// create express app
const app = express();

// Middleware setup
app.use(urlencoded({ extended: false })); // parse URL-encoded data
app.use(json()); // parse JSON data

// config CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions)); // enable CORS

// define get route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World",
        status: "success",
    });
});

//routes
app.use('/api/products', productRoute);

// start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server up and running in at http://localhost:${PORT}/`);
});