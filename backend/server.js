// import necessary modules
import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';

import config from './config/config.js';
import productRoute from './src/routes/productRoute.js'
import userRoute from './src/routes/userRoute.js'

// create express app
const app = express();

// Middleware setup
app.use(urlencoded({ extended: true }));
app.use(json()); // Cho phép parse application/json

// config CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));

// define get route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World",
        status: "success",
    });
});

//routes
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

// start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server up and running in at http://localhost:${PORT}/`);
});