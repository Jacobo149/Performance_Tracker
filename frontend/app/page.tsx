'use client'; // Add this line to indicate the component is a client component

import { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Axios instance
import Link from 'next/link';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Define a type for the performance data
interface PerformanceData {
  id: number;
  date_completed: string;
  task_description: string;
  hours_spent: number;
  difficulty: number;
  learning_score: number;
}

const Home = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    // Fetch performance data on page load
    axios
      .get('/performance')
      .then((response) => {
        setPerformanceData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Prepare chart data
  const chartData = {
    labels: performanceData.map((entry) => entry.date_completed.slice(0, 10)), // Dates
    datasets: [
      {
        label: 'Difficulty',
        data: performanceData.map((entry) => entry.difficulty),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Hours Spent',
        data: performanceData.map((entry) => entry.hours_spent),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Learning Score',
        data: performanceData.map((entry) => entry.learning_score),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Performance Tracker</h1>

      <Link href="/add_entry" className="text-blue-500 underline mb-4 block">
        Go To Add Entry
      </Link>

      <div className="mb-8">
        <h2 className="text-xl font-semibold">Performance Chart</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <ul className="space-y-2">
        {performanceData.map((entry) => (
          <li key={entry.id} className="border p-2 rounded">
            <strong>{entry.task_description}</strong>: {entry.date_completed.slice(0, 10)}, {entry.hours_spent} hours, difficulty {entry.difficulty}, learning score {entry.learning_score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
