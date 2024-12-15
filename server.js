const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./database');

// Enable CORS for all routes
app.use(cors());


app.use(express.json());
app.use(express.static('public'));

// Get all students
app.get('/api/students', (req, res) => {
  const sql = "SELECT * FROM Students";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: 'An error occurred while fetching students' });
    } else {
      res.json(results);
    }
  });
});

// Add a new student
app.post('/api/students', (req, res) => {
  console.log(req.body);
  
  const { StudentID, Name, DOB, DOJ, Mobile, Email, Address, Gender } = req.body;
  const sql = "INSERT INTO Students (StudentID, Name, DOB, DOJ, Mobile, Email, Address, Gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, [StudentID, Name, DOB, DOJ, Mobile, Email, Address, Gender], (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      res.status(500).json({ error: 'An error occurred while adding the student' });
    } else {
      res.json({ message: 'Student added successfully', id: result.insertId });
    }
  });
});

// Search students by name
app.get('/api/students/search', (req, res) => {
  const { name } = req.query;
  const sql = "SELECT * FROM Students WHERE Name LIKE ?";
  connection.query(sql, [`%${name}%`], (err, results) => {
    if (err) {
      console.error('Error searching students:', err);
      res.status(500).json({ error: 'An error occurred while searching for students' });
    } else {
      res.json(results);
    }
  });
});

// Delete a student by ID
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Students WHERE StudentID = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).json({ error: 'An error occurred while deleting the student' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  });
});

// Update a student
app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const { Name, DOB, DOJ, Mobile, Email, Address, Gender } = req.body;
  const sql = "UPDATE Students SET Name = ?, DOB = ?, DOJ = ?, Mobile = ?, Email = ?, Address = ?, Gender = ? WHERE StudentID = ?";
  connection.query(sql, [Name, DOB, DOJ, Mobile, Email, Address, Gender, id], (err, result) => {
    if (err) {
      console.error('Error updating student:', err);
      res.status(500).json({ error: 'An error occurred while updating the student' });
    } else {
      res.json({ message: 'Student updated successfully' });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
