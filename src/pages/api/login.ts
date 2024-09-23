// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';


const SECRET_KEY = process.env.SECRET_KEY;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Normally you'd validate the username and password against your database
    // Presently accepting any username and password
    if (username && password) {

      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1d' });

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development', // for https config
          maxAge: 60 * 60 * 24,
          sameSite: 'strict',
          path: '/',
        })
      );

      return res.status(200).json({ message: 'Login successful!' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
