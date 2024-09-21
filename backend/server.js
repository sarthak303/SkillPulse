const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const fsPromises = fs.promises;

const app = express();

// Middleware
app.use(cors());
app.use(express.static('output_videos')); // Serve processed videos from the output_videos directory
app.use(express.json()); // Middleware to parse JSON body

// Ensure the directories exist
const ensureDirectoryExists = async (dir) => {
  try {
    await fsPromises.access(dir);
  } catch (error) {
    await fsPromises.mkdir(dir, { recursive: true });
  }
};

ensureDirectoryExists('input_videos');
ensureDirectoryExists('output_videos');

// Configure multer to handle video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'input_videos'); // Directory to save uploaded videos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save video with the original name
  },
});

const upload = multer({ storage: storage });

// Promisified exec for easier async/await usage
const execAsync = promisify(exec);

// POST route to handle basketball predictions
app.post('/api/predict-shot', async (req, res) => {
  const shotData = req.body;

  // Validate input
  if (!shotData) {
    return res.status(400).json({ error: 'No shot data provided' });
  }

  try {
    // Write shot data to data.json
    const shotDataFile = 'data.json';
    await fsPromises.writeFile(shotDataFile, JSON.stringify(shotData));

    // Execute the basketball prediction script
    const command = `python basketball.py ${shotDataFile}`;
    
    // Log the command for debugging
    console.log(`Executing command: ${command}`);

    const { stdout, stderr } = await execAsync(command);
    
    // Check for stderr but do not return an error if it's just warnings
    console.log(`Python stdout: ${stdout}`);
    if (stderr && !stderr.includes('Warning')) {
      console.error(`Python stderr: ${stderr}`);
      return res.status(500).json({ error: 'Error during shot prediction.' });
    }

    // Parse the result from stdout
    const predictionResult = JSON.parse(stdout);

    // Send the prediction result back to the client
    res.json(predictionResult);

  } catch (error) {
    console.error(`Error processing shot prediction: ${error.message || error}`);
    res.status(500).json({ error: 'Shot prediction failed' });
  } finally {
    // Clean up the temporary file if needed
    await fsPromises.unlink('data.json').catch(() => {});
  }
});

// Start the server
app.listen(4000, () => {
  console.log('Server running on port 4000');
});
