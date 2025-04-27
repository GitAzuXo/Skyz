import { getQuestions } from '../lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { limit, excludeIds } = req.body;
  try {
    const excludedIds = excludeIds ? excludeIds.map(id => parseInt(id, 10)) : [];
    const questions = getQuestions(limit, excludedIds);

    if (questions.length === 0) {
      return res.status(404).json({ success: false, error: 'No questions available' });
    }
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error in getQuestions:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
