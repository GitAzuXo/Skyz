import { getUsers } from '../lib/db';

export default function handler(req, res) {
  const users = getUsers();
  res.status(200).json(users);
}
