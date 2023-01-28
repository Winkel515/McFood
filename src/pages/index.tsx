import Head from 'next/head';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import FoodCard from '@/components/FoodCard';
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      localStorage.setItem('userId', uuid());
    }
  }, []);

  return (
    <>
      <Head>
        {/* in tab */}
        <title>McFoods</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavBar />

      <div className="bg-gradient-to-b from-mcBlue to-white bg-fixed">
        {/* heading/title + logo */}
        <div className="flex p-14 justify-center text-white">
          <h1 className="flex mt-15 p-15 text-6xl font-bold [text-shadow:_5px_4px_0_rgb(255_0_0_/_100%)]">
            McFoods
          </h1>
        </div>
        <div id="breakfast" className="text-2xl text-white font-bold pb-10">
          <p className="pl-5 [text-shadow:_2px_1px_0_rgb(255_0_0_/_100%)]">
            Breakfast
          </p>
          <div className="flex">
            <FoodCard name="dog" imageURL="/shiba.jpeg" />
          </div>
        </div>
        <div id="lunch" className="text-2xl text-white font-bold pb-10">
          <p className="pl-5 pt-3 [text-shadow:_2px_1px_0_rgb(255_0_0_/_100%)]">
            Lunch
          </p>
          <div className="flex">
            <FoodCard name="Wrap" imageURL="/wrap.jpg" />
          </div>
        </div>
        <div id="supper" className="text-2xl text-white font-bold pb-10">
          <p className="pl-5 pt-3 [text-shadow:_2px_1px_0_rgb(255_0_0_/_100%)]">
            Supper
          </p>
          <div className="flex">
            <FoodCard name="dog" imageURL="/shiba.jpeg" />
          </div>
        </div>
        <div id="snacks" className="text-2xl text-white font-bold pb-10">
          <p className="pl-5 pt-3 [text-shadow:_2px_1px_0_rgb(255_0_0_/_100%)]">
            Snacks & Drink
          </p>
          <div className="flex flex-wrap">
            <FoodCard name="Apple" imageURL="/apple.jpg" />
            <FoodCard name="Chewy Bars" imageURL="/chewy_bars.jpg" />
            <FoodCard name="Coffee" imageURL="/coffee.jpg" />
            <FoodCard name="Juice Box" imageURL="/juice_box.jpg" />
            <FoodCard name="Soda" imageURL="/soda.jpg" />
          </div>
        </div>
      </div>
    </>
  );
}
