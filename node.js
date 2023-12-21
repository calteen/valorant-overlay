const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for handling file uploads
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'overlay/'); // Save uploaded files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, "blueTeamLogo.png");
  },
});
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'overlay/'); // Save uploaded files to the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, "redTeamLogo.png");
    },
  });

const upload1 = multer({ storage: storage1 });
const upload2 = multer({ storage: storage2 });

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload1', upload1.single('t1'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded! t1');
});
app.post('/upload2', upload2.single('t2'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded! t2');
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});