const { addQuestion } = require('../lib/db.js');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, answer, difficulty, option1, option2, option3 } = req.body;

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
    console.error('Error in addQuestion:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
