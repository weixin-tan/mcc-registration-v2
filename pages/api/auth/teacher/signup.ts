import { NextApiRequest, NextApiResponse } from "next";
import { hash, genSalt } from "bcrypt";
import MESSAGES from "../../../../utils/api-messages";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const salt = await genSalt();
  const hashedPassword = await hash(password + salt, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingUser) {
    res.status(409).json({ error: MESSAGES.EMAIL_REGISTERED });
    return;
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        salt: salt,
        role: "TEACHER",
      },
    });
    res.status(200).json({ message: MESSAGES.SIGN_UP_SUCCESS });
  } catch (err) {
    res.status(500).json({ error: `${MESSAGES.SIGN_UP_FAIL}: ${err}` });
  }
}
