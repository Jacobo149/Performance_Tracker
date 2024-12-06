'use client'; // Add this line to indicate the component is a client component

import { useState } from 'react';
import axios from '../../utils/axios'; // Axios instance
import Navbar from '../Navbar';

interface FormData {
  date_completed: string;
  task_description: string;
  hours_spent: string;
  difficulty: string;
  learning_score: string;
}

const AddEntry = () => {
  const [formData, setFormData] = useState<FormData>({
    date_completed: '',
    task_description: '',
    hours_spent: '',
    difficulty: '',
    learning_score: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post('/performance', formData)
      .then((response) => {
        console.log('Entry added:', response.data);
        window.location.href = '/'; // Redirect to the homepage after submission
      })
      .catch((error) => {
        console.error('Error adding entry:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto p-4 bg-gray-100 shadow-md rounded-md">
    <h1 className="text-2xl font-bold mb-4">Add a New Performance Entry</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Date Completed</label>
        <input
          type="date"
          name="date_completed"
          value={formData.date_completed}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Task Description</label>
        <input
          type="text"
          name="task_description"
          value={formData.task_description}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Hours Spent</label>
        <input
          type="number"
          name="hours_spent"
          value={formData.hours_spent}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Difficulty</label>
        <input
          type="number"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Learning Score</label>
        <input
          type="number"
          name="learning_score"
          value={formData.learning_score}
          onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Entry
      </button>
    </form>
  </div>
</div>

  );
};

export default AddEntry;
