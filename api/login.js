import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY);

      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);
      return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    } finally {
      client.release();
    }
  }

  return res.status(404).end();
}
