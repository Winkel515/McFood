import { NextApiResponse, NextApiRequest } from 'next';
import { Review } from '@/db/schema/review';
require('mongoose');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  res.send(await Review.find({ userId }));
}
