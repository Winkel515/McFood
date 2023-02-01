import axios from 'axios';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import NavBar from '../../components/NavBar';

interface IParams extends ParsedUrlQuery {
  foodName: string;
}

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

const apiURL = 'https://mcfood.onrender.com/';

export async function getServerSideProps(context: GetStaticPropsContext) {
  const apiURL = 'https://mcfood.onrender.com/';
  const res = await axios.get(apiURL);
  const { foodName } = context.params as IParams;

  const ratingArr = [];
  for (const review of res.data) {
    if (review.food !== foodName) continue;
    ratingArr.push({
      rating: review.rating,
      userId: review.userId,
    });
  }

  const reviewArr = [0, 0, 0, 0, 0];
  for (const rating of ratingArr) reviewArr[rating.rating - 1]++;

  return {
    props: {
      reviewArr,
      foodName,
    },
  };
}

export default function foodName({
  reviewArr,
  foodName,
}: {
  reviewArr: Array<number>;
  foodName: string;
}) {
  const data = {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        label: `${foodName} Rating Distribution`,
        data: reviewArr,
        backgroundColor: '#FFD028AF',
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen">
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
          data={data}
          height={100}
          className="flex-1"
        />
      </div>
    </div>
  );
}
