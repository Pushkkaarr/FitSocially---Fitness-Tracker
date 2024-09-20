import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import mongoose from './config/database.js';
import socialRoute from './routes/socialRoute.js';
import cookiesParser from 'cookie-parser';
import cors from 'cors'

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookiesParser())
// app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173' // Replace with your frontend URL
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//api endpoints
app.use("/api/user", userRoute);
app.use("/api/social", socialRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});