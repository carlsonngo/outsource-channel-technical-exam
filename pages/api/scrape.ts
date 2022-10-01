import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { flatten, pick, pickBy } from "lodash";
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

  const { subreddit, size = 25 } = req.query;
  // subreddit and size parameters are required

  if (!subreddit) {
    res.status(400).end();
    return;
  }

  const {
    data: { data },
  } = await axios.get(
    `https://api.pushshift.io/reddit/search/submission?${new URLSearchParams(
      pickBy({
        subreddit: flatten([subreddit])[0],
        size: "" + size,
      })
    ).toString()}`
  );

  await Promise.all(
    data.map((d: any) => {
      const _row = pick(d, ["title", "full_link", "selftext", "score"]);

      return prisma.submission.upsert({
        where: {
          id: d.id,
        },
        update: _row,
        create: { id: d.id, ..._row },
      });
    })
  );

  res.send(`Successfully scraped ${data.length} entries.`);
}
