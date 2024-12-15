const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

//PostreSQL connection configuration
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'myuser',
    password: 'mypassword',
    database: 'mydb'
});

// Connect to the database
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(error => console.error('Error connecting to PostgreSQL', error));

// Define the API routes

// Get all entries (Example)
app.get('/performance', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM performance_tracker');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new entry
app.post('/performance', async (req, res) => {
    const { date_completed, task_description, hours_spent, difficulty, learning_score, wellness } = req.body;

    try {
        const result = await client.query(
            `INSERT INTO performance_tracker (date_completed, task_description, hours_spent, difficulty, learning_score, wellness)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [date_completed, task_description, hours_spent, difficulty, learning_score, wellness]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete an entry by ID
app.delete('/performance/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await client.query('DELETE FROM performance_tracker WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Entry not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});