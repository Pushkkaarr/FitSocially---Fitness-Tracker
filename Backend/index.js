import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import socialRoute from './routes/socialRoute.js';
import cookiesParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './config/database.js'
import { app, server } from './socket/index.js';
import tweetRoute from './routes/tweetRoute.js'

dotenv.config({ path: ".env" });

//const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookiesParser())
app.use('/uploads', express.static('uploads'));

// app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//api endpoints
app.use("/api/user", userRoute);
app.use("/api/social", socialRoute);
app.use("/api/tweet", tweetRoute);


// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });  


// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start server due to DB connection error:", error);
    });