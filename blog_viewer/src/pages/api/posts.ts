import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Post Title ${i + 1}`,
    content: `This is the detailed content of post ${i + 1}.`,
  }));

  res.status(200).json(posts);
}