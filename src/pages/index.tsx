import Head from 'next/head';
import NavBar from '../components/NavBar';
import FoodCard from '@/components/FoodCard';
import { v4 as uuid } from 'uuid';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

type ReviewObject = {
  [key: string]: {
    rating: number;
    userId: string;
  };
};

const apiURL = 'https://mcfood.onrender.com/';

export default function Home() {
  const dataFetchedRef = useRef(false);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuid();
      localStorage.setItem('userId', userId);
    }

    const getReviews = async () => {
      const res = await axios.get(`${apiURL}${userId}`, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      const reviewObj: ReviewObject = {};
      for (const review of res.data) {
        reviewObj[review.food] = {
          rating: review.rating,
          userId: review.userId,
        };
      }
      setReviews(reviewObj);
    };

    getReviews();
  }, []);

  return (
    <>
      <Head>
        {/* in tab */}
        <title>McFoods</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavBar />

      <div className="bg-gradient-to-b from-mcBlue to-white bg-fixed p-8">
        {/* heading/title + logo */}
        <div className="flex flex-col p-12 justify-center text-white">
          <h1 className="flex justify-center mt-15 p-15 text-6xl font-bold [text-shadow:_5px_4px_0_rgb(255_0_0_/_100%)]">
            McFoods
          </h1>
          <p className="flex text-xl justify-center text-center mt-2 font-mono">
            To make the next McHacks tastier...
          </p>
        </div>
        <div id="breakfast" className="text-3xl text-white font-bold pb-7">
          <p className="pl-5 [text-shadow:_2px_1px_0_rgb(255_0_0_/_100%)]">
            Breakfast
          </p>
          <div className="flex flex-wrap">
            <FoodCard
              reviews={reviews}
              name="Muffin"
              imageURL="/muffins.jpeg"
            />
            <FoodCard reviews={reviews} name="Bagel" imageURL="/bagel.jpeg" />
            <FoodCard reviews={reviews} name="Coffee" imageURL="/coffee.jpg" />
          </div>
        </div>
        <div id="lunch" className="text-3xl text-white font-bold pb-7">
          <p className="pl-5 pt-2 [text-shadow:_2px_1px_0_rgb(255_0_0_/_100%)]">
            Lunch
          </p>
          <div className="flex flex-wrap">
            <FoodCard reviews={reviews} name="Wrap" imageURL="/wrap.jpg" />
            <FoodCard
              reviews={reviews}
              name="Sandwich"
              imageURL="/sandwich.jpg"
            />
          </div>
        </div>
        <div id="supper" className="text-3xl text-white font-bold pb-7">
          <p className="pl-5 pt-3 [text-shadow:_2px_1px_0_rgb(255_0_0_/_100%)]">
            Supper
          </p>
          <div className="flex flex-wrap">
            <FoodCard
              reviews={reviews}
              name="Rice dish"
              imageURL="/rice_dish.jpeg"
            />
          </div>
        </div>
        <div id="snacks" className="text-3xl text-white font-bold pb-7">
          <p className="pl-5 pt-2 [text-shadow:_2px_1px_0_rgb(255_0_0_/_100%)]">
            Snacks & Drink
          </p>
          <div className="flex flex-wrap">
            <FoodCard reviews={reviews} name="Apple" imageURL="/apple.jpg" />
            <FoodCard reviews={reviews} name="Banana" imageURL="/banana.jpg" />
            <FoodCard
              reviews={reviews}
              name="Chewy Bars"
              imageURL="/chewy_bars.jpg"
            />
            <FoodCard
              reviews={reviews}
              name="Samosas"
              imageURL="/samosas.jpg"
            />
            <FoodCard reviews={reviews} name="Ramen" imageURL="/ramen.jpg" />
            <FoodCard reviews={reviews} name="Chips" imageURL="/chips.jpg" />
            <FoodCard
              reviews={reviews}
              name="Fruitsations"
              imageURL="/fruitsations.jpg"
            />

            <FoodCard
              reviews={reviews}
              name="Juice Box"
              imageURL="/juice_box.jpg"
            />
            <FoodCard reviews={reviews} name="Soda" imageURL="/soda.jpg" />
            <FoodCard
              reviews={reviews}
              name="Red Bull"
              imageURL="/redbull.jpg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

//TODO: check if Breakfast has a weird amrgin // double check logo // font size (is it too big for mobile)
// fix curvy right top button list
