import type { NextApiRequest, NextApiResponse } from 'next';
import { getIronSession } from 'iron-session';
import { LoggedInUser, sessionOptions } from '@/interfaces/Session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Normally you'd validate the username and password against your database
    // Presently accepting any username and password
    if (username && password) {
      // Get session using iron-session, passing req and res
      const session: LoggedInUser = await getIronSession(req, res, sessionOptions);

      // Set session properties
      session.username = username;
      session.name = username.split("@")[0];
      session.isLoggedIn = true; // Indicate the user is logged in

      // Save the session
      await session.save();

      return res.status(200).json({ message: 'Login successful!' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // If method is not POST, respond with Method Not Allowed
  res.status(405).json({ message: 'Method not allowed' });
}
