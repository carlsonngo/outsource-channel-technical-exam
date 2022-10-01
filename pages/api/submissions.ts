import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(404).end();
    return;
  }

  const { s } = req.query;

  let whereParams: any;

  if (s) {
    whereParams = {
      ...whereParams,
      OR: [
        {
          title: {
            contains: s,
            mode: "insensitive",
          },
        },
        {
          selftext: {
            contains: s,
            mode: "insensitive",
          },
        },
      ],
    };
  }

  const data = await prisma.submission.findMany({
    where: whereParams,
  });

  res.send({ data });
}
