import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "POST") {
    await prisma.submission.update({
      where: { id },
      data: { favorite: true },
    });

    res.status(201).end();
  } else if (req.method === "DELETE") {
    await prisma.submission.update({
      where: { id },
      data: { favorite: false },
    });

    res.status(204).end();
  } else {
    res.status(404).end();
  }
}
