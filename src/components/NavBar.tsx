import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function NavBar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="bg-mcBlue border-mcBlue px-2 sm:px-4 py-2.5 dark:bg-mcBlue">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <div className="w-5"></div>
          <span className="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            OnlyFoods
          </span>
        </Link>
        <button
          onClick={() => setNavbar(!navbar)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          {navbar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            navbar ? 'block' : 'hidden'
          }`}
        >
          <ul className="items-end justify-evenly space-y-8 flex md:flex md:space-x-8 md:space-y-0 flex-col md:flex-row text-xl font-mono">
            <li className={`text-white inline-block mr-6 md:mr-0`}>
              <div className="inline-block w-20"></div>
              <Link href="#breakfast">Breakfast</Link>
            </li>
            <li className={`text-white inline-block mr-6 md:mr-0`}>
              <div className="inline-block w-2"></div>
              <Link href="#lunch">Lunch</Link>
            </li>
            <li className={`text-white inline-block mr-6 md:mr-0`}>
              <div className="inline-block w-2"></div>
              <Link href="#supper">Supper</Link>
            </li>
            <li className={`text-white inline-block mr-6 md:mr-0`}>
              <div className="inline-block w-2"></div>
              <Link href="#snacks">Snacks & Drinks</Link>
            </li>
            {
              <li className={`text-white inline-block mr-6 md:mr-0`}>
                <div className="inline-block w-2"></div>
                <Link href="/analysis">Analysis</Link>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
