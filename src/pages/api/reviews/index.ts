import { NextApiResponse, NextApiRequest } from 'next';
import { Review } from '@/db/schema/review';
require('mongoose');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {
        rating = null,
        userId = null,
        comment = null,
        food = null,
      } = req.body;

      let review = await Review.findOne({ userId, food });

      if (!review) {
        review = new Review({
          rating,
          userId,
          food,
        });
      } else {
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;
      }

      await review.save();
      res.send({
        message: 'Success',
      });
    } catch (err) {
      res.status(400).send(err);
    }
    return;
  }

  res.send(await Review.find({}));
}
