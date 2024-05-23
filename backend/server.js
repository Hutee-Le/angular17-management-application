import express from 'express';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World",
        status: "success",
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server up and running");
});