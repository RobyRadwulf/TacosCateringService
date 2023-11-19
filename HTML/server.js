require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');

const app = express();
const port = 3000;

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

// Multer setup
const upload = multer();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle catering data
app.post('/api/catering', upload.none(), (req, res) => {
    const cateringData = req.body;

    // Extract payment data from cateringData
    const paymentData = {
        Card_type: cateringData.Card_type,
        cardholder_name: cateringData.cardholder_name,
        card_number: cateringData.card_number,
        expiry_date: cateringData.expiry_date,
        cvv: cateringData.cvv,
    };

    // Insert catering data into the MySQL database
    const cateringSql = 'INSERT INTO catering_requests SET ?';
    db.query(cateringSql, cateringData, (err) => {
        if (err) {
            console.error('Error saving catering data:', err);
            res.status(500).json({ error: 'Error saving catering data.', details: err.message });
        } else {
            console.log('Catering data saved successfully.');

            // Insert payment data into the MySQL database
            const paymentSql = 'INSERT INTO payment_info SET ?';
            db.query(paymentSql, paymentData, (err) => {
                if (err) {
                    console.error('Error saving payment data:', err);
                    res.status(500).json({ error: 'Error saving payment data.', details: err.message });
                } else {
                    console.log('Payment data saved successfully.');
                    res.status(200).json({ message: 'Catering and payment data saved successfully.' });
                }
            });
        }
    });
});


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
