'use client'; // Add this line to indicate the component is a client component

import { useState, useEffect } from 'react';
import axios from '../../utils/axios'; // Axios instance

// Define a type for the performance data
interface PerformanceData {
  id: number;
  date_completed: string;
  task_description: string;
  hours_spent: number;
  difficulty: number;
  learning_score: number;
}

const DeleteEntry = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [deleteId, setDeleteId] = useState<string>('');
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
  }, []);

  const handleDelete = () => {
    const id = parseInt(deleteId, 10);
    if (isNaN(id)) {
      setErrorMessage('Please enter a valid numeric ID.');
      return;
    }

    axios
      .delete(`/performance/${id}`)
      .then(() => {
        console.log('Entry deleted');
        setPerformanceData((prevData) => prevData.filter((entry) => entry.id !== id)); // Update UI without refreshing
        setDeleteId(''); // Clear input
        setErrorMessage(null); // Clear error message
      })
      .catch((error) => {
        console.error('Error deleting entry:', error);
        setErrorMessage('Failed to delete entry. Please try again.');
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Delete a Performance Entry</h1>

      <div className="mb-6">
        <label htmlFor="deleteId" className="block text-sm font-medium text-gray-700 mb-2">
          Enter the ID of the entry to delete:
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="deleteId"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 1"
          />
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      </div>

      <h2 className="text-xl font-semibold mb-4">Existing Entries</h2>
      <ul className="space-y-2">
        {performanceData.map((entry) => (
          <li key={entry.id} className="border p-2 rounded shadow-sm bg-gray-50">
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
              {entry.difficulty}, <strong>Learning Score:</strong> {entry.learning_score}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteEntry;
