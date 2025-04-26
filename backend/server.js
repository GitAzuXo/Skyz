// backend/server.js
const express = require('express');
const cors = require('cors');
const { addUser, getUsers, verifyUser, getQuestions, addQuestion, saveScore } = require('./db.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.get('/api/getUsers', (req, res) => {
  res.json(getUsers());
});

app.post('/api/getQuestions', (req, res) => {
    const { limit, excludeIds } = req.body; // Extract excludeIds from the request body

    try {
        // Parse excludeIds into an array of integers
        const excludedIds = excludeIds ? excludeIds.map(id => parseInt(id, 10)) : [];

        // Fetch a random question that is not in the excludedIds list
        const questions = getQuestions(limit, excludedIds);

        if (questions.length === 0) {
            return res.status(404).json({ success: false, error: 'No questions available' });
        }

        res.json(questions); 
    } catch (error) {
        console.error('Error in /api/getQuestions:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.post('/api/saveScore', (req, res) => {
	const { name, score } = req.body;
	const result = saveScore(name, score);
  
	if (result.error) {
	  
	  res.status(400).json({ success: false, error: result.error });
	} else {
	  
	  res.status(200).json({ success: true });
	}
  });

app.post('/api/addUser', (req, res) => {
    const { name, email, password } = req.body;
    const result = addUser(name, email, password);
  
    if (result.error) {
      
      res.status(400).json({ success: false, error: result.error });
    } else {
      
      res.status(201).json({ success: true, id: result.lastInsertRowid });
    }
  });

  app.post('/api/addQuestion', (req, res) => {
    const { question, answer, difficulty, option1, option2, option3 } = req.body;

    // Validate the incoming payload
    if (!question || !answer || !difficulty || !option1 || !option2 || !option3) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    try {
        const result = addQuestion(question, answer, difficulty, option1, option2, option3);

        if (result.error) {
            res.status(400).json({ success: false, error: result.error });
        } else {
            res.status(201).json({ success: true, id: result.lastInsertRowid });
        }
    } catch (error) {
        console.error('Error in /api/addQuestion:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.post('/api/login', (req, res) => {
    const { name, password } = req.body;
    const result = verifyUser(name, password);
  
    if (result.success) {
      res.json({ success: true, user: { name }, score: result.score }); // Return the username directly
    } else {
      res.status(401).json({ success: false, message: result.error }); // Return the error message
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
