import CONSTANTS from "@/utils/constants";
import { IronSession } from "iron-session";


export interface LoggedInUser extends IronSession<object> {
  isLoggedIn: true;
  username: string;
  name: string;
}

type Session = LoggedInUser | object;

export default Session;

export const sessionOptions = {
  password: process.env.COOKIES_PASSWORD,
  cookieName: CONSTANTS.COOKIES.LOGIN,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
}