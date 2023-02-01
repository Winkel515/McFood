import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const apiURL = 'https://mcfood.onrender.com/';

type ReviewObject = {
  [key: string]: {
    rating: number;
    userId: string;
  };
};

async function postRating(rating: number, food: string) {
  axios.post(
    apiURL,
    {
      rating,
      food,
      userId: localStorage.getItem('userId'),
    },
    {
      headers: { 'Access-Control-Allow-Origin': '*' },
    }
  );
}

export default function FoodCard({
  name,
  imageURL,
  reviews,
}: {
  name: string;
  imageURL: string;
  reviews: ReviewObject;
}) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(reviews[name] ? reviews[name].rating : 0);
  }, [reviews, name]);

  // todo: how to make height smaller when on mobile?
  return (
    <div
      className={`flex flex-col bg-wrapper rounded-lg shadow-md m-4 p-3 w-80`}
    >
      <div className="flex flex-col">
        <Link href={`/analysis/${name}`}>
          <Image
            className="object-cover"
            src={imageURL}
            alt="Image of food"
            width={500}
            height={500}
            style={{ height: '250px' }}
          />
        </Link>
        <p className="flex mt-2 text-white text-xl [text-shadow:_2px_1px_0_rgb(0_0_0_/_100%)]">
          <Link href={`/analysis/${name}`}>{name}</Link>
        </p>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((x) => (
            <svg
              key={x}
              onClick={() => {
                setRating(x);
                postRating(x, name);
              }}
              aria-hidden="true"
              className={`cursor-pointer w-6 h-6 ${
                rating >= x ? 'text-mcYellow' : 'text-white'
              } hover:text-mcYellow transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 fill-current`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
