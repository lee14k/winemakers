import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      await axios.post('/api/register', { username, password });
      res.status(200).json({ message: 'User registered successfully!' });
    } catch (error) {
      const { response } = error;
      const errorMessage = response ? response.data.message : 'An error occurred.';
      res.status(500).json({ message: errorMessage });
    }
  } else {
    res.status(405).end();
  }
}
