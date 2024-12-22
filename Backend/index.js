import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import socialRoute from './routes/socialRoute.js';
import cookiesParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './config/database.js'
import { app, server } from './socket/index.js';
import tweetRoute from './routes/tweetRoute.js'
import bodyParser from 'body-parser';
import axios from 'axios';

dotenv.config({ path: ".env" });

//const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(express.json());
app.use(cookiesParser())
app.use('/uploads', express.static('uploads'));

// app.use(cors());

app.use(cors({
  origin: process.env.DEPLOYED_LINK, // Replace with your frontend URL
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

         // The reloader function to keep the server active
        const url = process.env.B_LINK; // Replace with your Render URL
        const interval = 30000; // Interval in milliseconds (30 seconds)
    
        function reloadWebsite() {
          axios.get(url)
            .then(response => {
              console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
            })
            .catch(error => {
              console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
            });
        }
    
        // Start the reloader function at the specified interval
        setInterval(reloadWebsite, interval);
    })
    .catch((error) => {
        console.error("Failed to start server due to DB connection error:", error);
    });