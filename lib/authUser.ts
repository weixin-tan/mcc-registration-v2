import { verify } from "jsonwebtoken";

export interface UserJwt {
  id: string;
  role: string;
}

export const authUser = (jwtString: string): UserJwt => {
  try {
    return verify(jwtString, process.env.JWT_KEY) as UserJwt;
  } catch {
    return null;
  }
};
