'use client'; // Add this line to indicate the component is a client component

import { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Axios instance
import { Line } from 'react-chartjs-2';
import Navbar from './Navbar'; // Import the Navbar component

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
  wellness: number;
}

const Home = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [openDate, setOpenDate] = useState<string | null>(null); // Track which date is open

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

  // Order the data by date (least to greatest for the graph)
  const sortedDataForGraph = performanceData.sort((a, b) => {
    return new Date(a.date_completed).getTime() - new Date(b.date_completed).getTime();
  });

  // Group data by date
  const groupedData: { [key: string]: PerformanceData[] } = {};
  sortedDataForGraph.forEach((entry) => {
    const date = entry.date_completed.slice(0, 10); // Extract date (e.g., '2024-12-10')
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(entry);
  });

  // Prepare chart data (dates sorted from least to greatest)
  const chartData = {
    labels: Object.keys(groupedData), // Dates
    datasets: [
      {
        label: 'Difficulty',
        data: Object.keys(groupedData).map(
          (date) =>
            groupedData[date].reduce((sum, entry) => sum + entry.difficulty, 0)
        ),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Hours Spent',
        data: Object.keys(groupedData).map(
          (date) =>
            groupedData[date].reduce((sum, entry) => sum + entry.hours_spent, 0)
        ),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Learning Score',
        data: Object.keys(groupedData).map(
          (date) =>
            groupedData[date].reduce((sum, entry) => sum + entry.learning_score, 0)
        ),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Wellness',
        data: Object.keys(groupedData).map(
          (date) =>
            groupedData[date].reduce((sum, entry) => sum + entry.wellness, 0)
        ),
        borderColor: 'rgba(255, 159, 255, 1)',
        backgroundColor: 'rgba(255, 159, 255, 0.2)',
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

  // Toggle the dropdown for a given date
  const handleToggleDate = (date: string) => {
    if (openDate === date) {
      setOpenDate(null); // Close the dropdown if it's already open
    } else {
      setOpenDate(date); // Open the dropdown for the selected date
    }
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Performance Chart</h2>
          <Line data={chartData} options={chartOptions} />
        </div>

        <h2 className="text-xl font-semibold mb-4">Completed Entries</h2>
        {Object.keys(groupedData).map((date) => (
          <div key={date} className="mb-4">
            <button
              onClick={() => handleToggleDate(date)}
              className="w-full text-left p-4 bg-gray-800 text-white rounded-md shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:bg-blue-600"
            >
              {date} {/* Display the date */}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out mt-2 ${
                openDate === date ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="space-y-2">
                {/* Sort the entries within each date (greatest to least) */}
                {groupedData[date]
                  .sort((a, b) => new Date(b.date_completed).getTime() - new Date(a.date_completed).getTime()) // Sort entries from greatest to least
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="border p-4 rounded-md shadow-md bg-white transform transition-all duration-300 hover:scale-100 hover:shadow-xl"
                    >
                      <div className="text-sm">
                        <strong>ID:</strong> {entry.id}
                      </div>
                      <div>
                        <strong>Task:</strong> {entry.task_description}
                      </div>
                      <div className="text-sm">
                        <strong>Date:</strong> {entry.date_completed.slice(0, 10)}
                      </div>
                      <div className="text-sm">
                        <strong>Hours:</strong> {entry.hours_spent}, <strong>Difficulty:</strong>{' '}
                        {entry.difficulty}, <strong>Learning Score:</strong> {entry.learning_score}, <strong> Wellness:</strong> {entry.wellness}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
