const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('./db');

const PORT = 5000;

const app = express();

app.use(bodyParser.json());

const sql = `CREATE TABLE IF NOT EXISTS lists
(
    id    INTEGER AUTO_INCREMENT PRIMARY KEY,
    value TEXT
);`
db.pool.query(sql, (err, results) => {
    console.log('results', results)
});

// GET /api/values
app.get('/api/values', (req, res) => {
    db.pool.query(`SELECT * FROM lists;`, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.json(results)
    });
});

// POST /api/value
app.post('/api/value', (req, res) => {
    db.pool.query(`INSERT INTO lists (value) VALUES ("${req.body.value}");`, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(201).json({
            success: true,
            value: req.body.value
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
