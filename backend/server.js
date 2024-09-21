require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const evaluationRoutes = require('./routes/evaluation');

// express app
const app = express();

// Middleware to handle CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend on port 3000 to access backend on port 4000
}));

// Middleware to parse JSON
app.use(express.json());

// Log request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/evaluation', evaluationRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests on the specified port (4000)
    app.listen(process.env.PORT || 4000, () => {
      console.log('connected to db & listening on port', process.env.PORT || 4000);
    });
  })
  .catch((error) => {
    console.log(error);
  });
