// backend/server.js
const express = require('express');
const cors = require('cors');
const { addUser, getUsers, verifyUser } = require('./db.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // parse JSON request bodies

// Routes
app.get('/api/getUsers', (req, res) => {
  res.json(getUsers());
});

app.post('/api/addUser', (req, res) => {
    const { name, email, password } = req.body;
    const result = addUser(name, email, password);
  
    if (result.error) {
      // If the addUser function returns an error, send a 400 response with the error message
      res.status(400).json({ success: false, error: result.error });
    } else {
      // If the user is successfully added, send a 201 response
      res.status(201).json({ success: true, id: result.lastInsertRowid });
    }
  });

app.post('/api/login', (req, res) => {
    const { name, password } = req.body;
    const result = verifyUser(name, password);
  
    if (result.success) {
      res.json({ success: true, user: { name } }); // Return the username directly
    } else {
      res.status(401).json({ success: false, message: result.error }); // Return the error message
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
