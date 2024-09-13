import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import userRoute from './routes/userRoute';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/FitSocial', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
    
// Create an Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

app.use('/',userRoute);

// Start the server
server.listen(3000, () => {
    console.log('Server is Running on http://localhost:3000');
});