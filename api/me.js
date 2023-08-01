import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return res.status(200).json({ username: decoded.username });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  return res.status(404).end();
}
