import type { NextApiRequest, NextApiResponse } from 'next';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/interfaces/Session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    const session = await getIronSession(req, res, sessionOptions);

    session.destroy();

    console.log(session);

    return res.status(200).json({ message: 'Logout successful' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).json({ message: 'Method not allowed' });
}
