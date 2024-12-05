'use client'; // Add this line to indicate the component is a client component

import { useState } from 'react';
import axios from '../../utils/axios'; // Axios instance

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
      <h1>Add a New Performance Entry</h1>
      <form onSubmit={handleSubmit}>
        <label>Date Completed</label>
        <input
          type="date"
          name="date_completed"
          value={formData.date_completed}
          onChange={handleInputChange}
        />
        <label>Task Description</label>
        <input
          type="text"
          name="task_description"
          value={formData.task_description}
          onChange={handleInputChange}
        />
        <label>Hours Spent</label>
        <input
          type="number"
          name="hours_spent"
          value={formData.hours_spent}
          onChange={handleInputChange}
        />
        <label>Difficulty</label>
        <input
          type="number"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
        />
        <label>Learning Score</label>
        <input
          type="number"
          name="learning_score"
          value={formData.learning_score}
          onChange={handleInputChange}
        />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default AddEntry;
