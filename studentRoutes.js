const express = require('express');
const router = express.Router();
const connection = require('./database');

// Middleware to handle database errors
const handleDatabaseError = (err, res, operation) => {
    console.error(`Error ${operation}:`, err);
    return res.status(500).json({ error: `Failed to ${operation}` });
};

// Get all students
router.get('/students', async (req, res) => {
    try {
        const sql = "SELECT * FROM Students ORDER BY id ASC";
        connection.query(sql, (err, results) => {
            if (err) return handleDatabaseError(err, res, 'fetch students');
            res.json(results);
        });
    } catch (error) {
        handleDatabaseError(error, res, 'fetch students');
    }
});

// Add a new student
router.post('/students', async (req, res) => {
    try {
        const { name, mobile, email } = req.body;
        if (!name || !mobile || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const sql = "INSERT INTO Students (name, mobile, email) VALUES (?, ?, ?)";
        connection.query(sql, [name, mobile, email], (err, result) => {
            if (err) return handleDatabaseError(err, res, 'add student');
            res.status(201).json({
                id: result.insertId,
                message: 'Student added successfully',
                student: { id: result.insertId, name, mobile, email }
            });
        });
    } catch (error) {
        handleDatabaseError(error, res, 'add student');
    }
});

// Search students
router.get('/students/search', async (req, res) => {
    try {
        const { term } = req.query;
        if (!term) {
            return res.status(400).json({ error: 'Search term is required' });
        }

        const sql = "SELECT * FROM Students WHERE name LIKE ? OR email LIKE ? OR mobile LIKE ? ORDER BY id ASC";
        const searchTerm = `%${term}%`;
        connection.query(sql, [searchTerm, searchTerm, searchTerm], (err, results) => {
            if (err) return handleDatabaseError(err, res, 'search students');
            res.json(results);
        });
    } catch (error) {
        handleDatabaseError(error, res, 'search students');
    }
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Student ID is required' });
        }

        const sql = "DELETE FROM Students WHERE id = ?";
        connection.query(sql, [id], (err, result) => {
            if (err) return handleDatabaseError(err, res, 'delete student');
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json({ message: 'Student deleted successfully', id });
        });
    } catch (error) {
        handleDatabaseError(error, res, 'delete student');
    }
});

// Update a student
router.put('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, mobile, email } = req.body;
        
        if (!id || !name || !mobile || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const sql = "UPDATE Students SET name = ?, mobile = ?, email = ? WHERE id = ?";
        connection.query(sql, [name, mobile, email, id], (err, result) => {
            if (err) return handleDatabaseError(err, res, 'update student');
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json({
                message: 'Student updated successfully',
                student: { id, name, mobile, email }
            });
        });
    } catch (error) {
        handleDatabaseError(error, res, 'update student');
    }
});

module.exports = router;
