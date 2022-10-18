import MESSAGES from "../../../../utils/api-messages";

import { NextApiRequest, NextApiResponse } from "next";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";
import { resolve } from "path";
import { UserJwt } from "../../../../lib/authUser";

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
      error: `${MESSAGES.SIGN_IN_FAIL}: ${MESSAGES.EMAIL_PASSWORD_INCORRECT}`,
    });
    return;
  }

  const salt = user.salt;
  const hashedPassword = await hash(password + salt, 10);

  compare(hashedPassword, user.hashedPassword, (err, same) => {
    if (err) {
      res.status(401).json({
        error: `${MESSAGES.SIGN_IN_FAIL}: ${MESSAGES.EMAIL_PASSWORD_INCORRECT}`,
      });
      resolve();
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      } as UserJwt,
      process.env.JWT_KEY
    );
    res.setHeader(
      "Set-Cookie",
      serialize("mccToken", token, {
        httpOnly: true,
        secure: false, // TODO
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).json({
      message: MESSAGES.SIGN_IN_SUCCESS,
      role: user.role,
    });
    resolve();
  });
}
