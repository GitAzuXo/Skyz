import { getUsers } from '../src/lib/db.js';

export default function handler(req, res) {
  const users = getUsers();
  res.status(200).json(users);
}
