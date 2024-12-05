// Script to create the Performance Tracker application table

const { Client } = require('pg');

// PostresSQL connection configuration
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'myuser',
    password: 'mypassword',
    database: 'mydb'
});

// Define the table query
const createTableQuery = `
CREATE TABLE IF NOT EXISTS performance_tracker (
    date_completed DATE,
    task_description TEXT,
    hours_spent FLOAT,
    difficulty INTEGER,
    learning_score INTEGER
);
`;

// Connect to the database and create the table
(async () => {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');

        await client.query(createTableQuery);
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await client.end();
        console.log('Disconnected from PostgreSQL');
    }
})();
