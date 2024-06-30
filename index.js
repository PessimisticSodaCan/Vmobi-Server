const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());



app.post('/create_user', async (req, res) => {
    console.log('create_user request\n')

    const {Fname, Lname, username, date, month, year, gender,emergencyContacts} = req.body;

    

    const user = 'INSERT INTO users (Fname, Lname, username, date, month, year, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const result = await db.query(user, [Fname, Lname, username, date, month, year, gender], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const userID = (result.insertId)
            let contactsQuery = 'INSERT INTO user_contacts (userID';
            let placeholders = '(?';
            let values = [userID];
            const contactFields = ['FirstContact', 'SecondContact', 'ThirdContact', 'FourthContact'];

            for (let i = 0; i < emergencyContacts.length; i++) {
                contactsQuery += `, ${contactFields[i]}`;
                placeholders += ', ?';
                values.push(emergencyContacts[i]);
            }
            contactsQuery += ') VALUES ' + placeholders + ')';

            db.query(contactsQuery, values, (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json({ message: 'User created successfully' });
                }
            });
            
        }
    });


});

app.get('/get_user', async (req, res) => {
    console.log('get_user request')
    const { username } = req.query;
    const sql = 'SELECT * FROM users WHERE username = ?';
    const result = await db.query(sql, [username], (err, result) => {
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