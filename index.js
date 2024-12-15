const express = require("express");
const app = express();
const connection = require('./database');

// Function to test database connection
function testDatabaseConnection() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT 1', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

app.get('/', function(req, res) {
    let sql = "SELECT * FROM Students";
    connection.query(sql, function(err, results) {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data' });
        }
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, async function() {
    console.log(`App listening on port ${PORT}`);
    
    try {
        await testDatabaseConnection();
        console.log('Database connection successful!');
        console.log('Connection info:', {
            host: connection.config.host,
            port: connection.config.port,
            user: connection.config.user,
            database: connection.config.database
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        console.log('Connection details:', connection.config);
    }
});

