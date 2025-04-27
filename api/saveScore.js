import { saveScore } from '../lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, score } = req.body;
  const result = saveScore(name, score);

  if (result.error) {
    res.status(400).json({ success: false, error: result.error });
  } else {
    res.status(200).json({ success: true });
  }
}
