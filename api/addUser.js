import { addUser } from '../lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body;
  const result = addUser(name, email, password);

  if (result.error) {
    res.status(400).json({ success: false, error: result.error });
  } else {
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  }
}
