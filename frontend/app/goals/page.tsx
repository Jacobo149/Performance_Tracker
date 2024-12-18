'use client'; // Add this line to indicate the component is a client component

import { useState, useEffect } from 'react';
import axios from '../../utils/axios'; // Axios instance
import Navbar from '../Navbar';
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
  wellness: number;
}

const GoalTracker = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [goal, setGoal] = useState<number | null>(null);
  const [inputGoal, setInputGoal] = useState<number | string>(''); // Track input value separately
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    // Retrieve the goal from localStorage on page load
    const storedGoal = localStorage.getItem('goal');
    if (storedGoal) {
      setGoal(Number(storedGoal)); // Convert string to number
    }
  }, []);

  // Calculate running total of hours spent
  const runningTotalHours = performanceData.reduce((acc, entry, index) => {
    const newTotal = (acc[index - 1] || 0) + entry.hours_spent;
    return [...acc, newTotal];
  }, [] as number[]);

  const totalHours = runningTotalHours[runningTotalHours.length - 1] || 0;
  const progressPercentage = goal ? Math.min((totalHours / goal) * 100, 100) : 0;

  // Chart Data
  const chartData = {
    labels: performanceData.map((entry) => entry.date_completed.slice(0, 10)),
    datasets: [
      {
        label: 'Cumulative Hours Spent',
        data: runningTotalHours,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Goal',
        data: new Array(performanceData.length).fill(goal || 0),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
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

  const handleSetGoal = () => {
    if (!inputGoal || Number(inputGoal) <= 0) {
      setErrorMessage('Please enter a valid positive goal.');
      return;
    }
    setGoal(Number(inputGoal));
    localStorage.setItem('goal', inputGoal.toString()); // Store goal in localStorage
    setInputGoal(''); // Clear the input field
    setErrorMessage(null); // Clear error message
  };

  const handleExportData = () => {
    axios
      .get('/performance')
      .then((response) => {
        const data = response.data;

        const header = ['id', 'date_completed', 'task_description', 'hours_spent', 'difficulty', 'learning_score', 'wellness'];
        const rows = data.map((item: PerformanceData) => [
          item.id,
          item.date_completed,
          item.task_description,
          item.hours_spent,
          item.difficulty,
          item.learning_score,
          item.wellness,
        ]);

        const csvContent = [
          header.join(','),
          ...rows.map((row: any[]) => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'performance_data.csv';
        a.click();
      })
      .catch((error) => {
        console.error('Error exporting data:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">

        <h1 className="text-2xl font-bold mb-4">Goal Tracker</h1>

        <div className="mb-6">
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
            Set Your Goal (Hours):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="goal"
              value={inputGoal || ''}
              onChange={(e) => setInputGoal(parseInt(e.target.value, 10))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 50"
            />
            <button
              onClick={handleSetGoal}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Set Goal
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Progress</h2>
          <p>
            Total Hours: <strong>{totalHours}</strong>
          </p>
          <p>
            Progress: <strong>{progressPercentage.toFixed(2)}%</strong>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Progress Chart</h2>
          <Line data={chartData} options={chartOptions} />
        </div>

        <button 
          onClick={handleExportData}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Export Data
        </button>
      </div>
    </div>
  );
};

export default GoalTracker;
