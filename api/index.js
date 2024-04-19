// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

// Import database connection function, route handlers, and error middleware
import connect from './config/db.js';
import appRoutes from './routes/app.route.js';
import coreRoutes from './routes/core.route.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js'

// Initialize environment variables
dotenv.config();

// Set the port from environment variables or use a default
const PORT = process.env.PORT || 4000;

// Initialize the express application
const app = express();

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS middleware configuration for cross-origin requests
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Allow requests from this origin
//     credentials: true, // Allow cookies to be sent with requests
//     methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"], // Allowed HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed HTTP headers
//   })
// );

// Serve static files from the /Assets directory
const currentUrl = import.meta.url;
const currentPath = fileURLToPath(currentUrl);
const currentDir = path.dirname(currentPath);
app.use('/Assets', express.static(path.join(currentDir, 'Assets')));

// Use the defined routes for the application
app.use(appRoutes);
app.use(coreRoutes);

// Global error handling middleware
app.use(errorMiddleware);

// Start the server and connect to the database
app.listen(PORT, () => {
    connect(); // Connect to the database
    console.log(`Server is running on port ${PORT} !!!`);
});
