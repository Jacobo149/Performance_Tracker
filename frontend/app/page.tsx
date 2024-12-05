'use client'; // Add this line to indicate the component is a client component

import { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Axios instance
import Link from 'next/link';


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
    axios.get('/performance')
      .then(response => {
        setPerformanceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Performance Tracker</h1>

      <Link href="/add_entry">Go To Add Entry</Link>

      <ul>
        {performanceData.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.task_description}</strong> - {entry.hours_spent} hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
