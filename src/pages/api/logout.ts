import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear the token cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      maxAge: 0, // Expire the cookie immediately
      sameSite: 'strict',
      path: '/',
    }));

    return res.status(200).json({ message: 'Logout successful' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).json({ message: 'Method not allowed' });
}
