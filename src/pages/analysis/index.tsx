import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ReviewObject = {
  [key: string]: Array<{
    rating: number;
    userId: string;
  }>;
};

export async function getServerSideProps() {
  const apiURL = 'https://mcfood.onrender.com/';
  const res = await axios.get(apiURL);

  const reviewObj: ReviewObject = {};
  for (const review of res.data) {
    if (!reviewObj[review.food]) reviewObj[review.food] = [];
    reviewObj[review.food].push({
      rating: review.rating,
      userId: review.userId,
    });
  }

  const reviewArr = [];
  for (const [key, val] of Object.entries(reviewObj)) {
    let sum = 0;
    for (const review of val) sum += review.rating;
    reviewArr.push({
      name: key,
      avg: Math.round((sum / val.length) * 100) / 100,
      count: val.length,
    });
  }

  return {
    props: {
      reviewArr,
    },
  };
}

export default function Analytics({ reviewArr }: { reviewArr: Array<any> }) {
  const dataAvg = {
    labels: reviewArr.map((x) => x.name),
    datasets: [
      {
        label: 'Average Star Rating',
        data: reviewArr.map((x) => x.avg),
        backgroundColor: '#FFD028AF',
      },
    ],
  };

  const dataCount = {
    labels: reviewArr.map((x) => x.name),
    datasets: [
      {
        label: 'Number of Reviews',
        data: reviewArr.map((x) => x.count),
        backgroundColor: '#FFD028AF',
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex items-center justify-between flex-wrap bg-gradient-to-b from-mcBlue to-white bg-fixed h-full px-11 py-5">
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: '#EEE',
                  font: {
                    size: 20,
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#555',
                  font: {
                    size: 16,
                  },
                },
              },
              y: {
                ticks: {
                  color: '#555',
                  font: {
                    size: 16,
                    weight: 'bold',
                  },
                },
              },
            },
          }}
          data={dataAvg}
          height={100}
          className="flex-1"
        />

        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: '#EEE',
                  font: {
                    size: 20,
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#555',
                  font: {
                    size: 16,
                  },
                },
              },
              y: {
                ticks: {
                  color: '#555',
                  font: {
                    size: 16,
                    weight: 'bold',
                  },
                },
              },
            },
          }}
          data={dataCount}
          height={100}
          className="flex-1"
        />
      </div>
    </div>
  );
}
