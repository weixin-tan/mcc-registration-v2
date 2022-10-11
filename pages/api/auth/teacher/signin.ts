import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  EMAIL_PASSWORD_INCORRECT,
} from "../../../../utils/api-messages";

import { NextApiRequest, NextApiResponse } from "next";
import { hash, compare } from "bcrypt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    res.status(401).json({
      error: `${SIGN_IN_FAIL}: ${EMAIL_PASSWORD_INCORRECT}`,
    });
    return;
  }

  const salt = user.salt;
  const hashedPassword = await hash(password + salt, 10);

  compare(hashedPassword, user.hashedPassword, (err, same) => {
    if (err) {
      res.status(401).json({
        error: `${SIGN_IN_FAIL}: ${EMAIL_PASSWORD_INCORRECT}`,
      });
      return;
    }

    res.status(200).json({ message: SIGN_IN_SUCCESS });
  });
}
