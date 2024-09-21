const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory for uploaded files

// Endpoint for stance evaluation
router.post('/evaluate-image', upload.single('image'), (req, res) => {
    const imagePath = path.join(__dirname, '../', req.file.path); // Path to uploaded image

    // Run the Python script with the uploaded image
    const pythonProcess = spawn('python', ['C:/Users/prakh/OneDrive/Desktop/devjams 24/SkillPulse/backend/scripts/cric_stance.py', imagePath]);

    pythonProcess.stdout.on('data', (data) => {
        res.json({ result: data.toString().trim() }); // Trim whitespace
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send('Error in evaluation');
    });

    pythonProcess.on('error', (error) => {
        console.error(`Error spawning Python process: ${error}`);
        res.status(500).send('Internal server error');
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code: ${code}`);
            return res.status(500).send('Error in evaluation');
        }
    });
});

module.exports = router;
