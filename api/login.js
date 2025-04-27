import { verifyUser } from '../src/lib/db.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, password } = req.body;
  const result = verifyUser(name, password);

  if (result.success) {
    res.status(200).json({ success: true, user: { name }, score: result.score });
  } else {
    res.status(401).json({ success: false, error: result.error });
  }
}
