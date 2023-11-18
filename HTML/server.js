require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', // your MySQL password
    database: 'catering_request', // your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Endpoint to handle catering data
app.post('/api/catering', (req, res) => {
    const cateringData = req.body;

    // Insert catering data into the MySQL database
    const sql = 'INSERT INTO catering_requests SET ?';

    db.query(sql, cateringData, (err, result) => {
        if (err) {
            console.error('Error saving catering data:', err);
            res.status(500).send('Error saving catering data.');
        } else {
            console.log('Catering data saved successfully.');
            res.status(200).send('Catering data saved successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
