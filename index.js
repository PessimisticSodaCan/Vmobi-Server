const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());



app.post('/create_user', (req, res) => {
    console.log('create_user request\n')

    const {Fname, Lname, username, date, month, year, gender} = req.body;
    
    console.log(Fname)
    console.log(Lname)

    const sql = 'INSERT INTO users (Fname, Lname, username, date, month, year, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [Fname, Lname, username, date, month, year, gender], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: 'User created successfully' });
        }
    });
});

app.get('/get_user', (req, res) => {
    console.log('get_user request')
    const { username } = req.query;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});