require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// File Upload Config (temporary storage for uploaded files)
const upload = multer({ dest: 'uploads/' });

// Log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Endpoint to evaluate stance from an uploaded image
app.post('/api/evaluate-stance', upload.single('file'), (req, res) => {
  const filePath = req.file.path;

  // Ensure the file exists before passing it to the Python script
  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ error: 'File not found' });
  }

  // Call Python script with the uploaded file path
  exec(`C:/Users/prakh/AppData/Local/Programs/Python/Python312/python.exe evaluate_stance.py ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${stderr}`);
      return res.status(500).json({ error: 'Error processing the image' });
    }

    // Respond with the output from the Python script
    res.json({ result: stdout.trim() });

    // Delete the file after processing
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log('Connected to DB & listening on port', process.env.PORT || 4000);
    });
  })
  .catch(error => {
    console.log(error);
  });
