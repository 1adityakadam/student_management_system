#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
# Name: 1. Abhijeet Suresh Thorat (asthorat)
#		2. Aditya Kadam	(askadam)																														
#		3. Neha Kothavade (nkothav)
#
# Subject: Applied Database Technologies
# Project: Student Management System
# 																										  																																	  																																		  																																	  
#+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#																													

# Creating database
# By askadam
CREATE DATABASE student_database;
USE student_database;

# Creating "students" table in "student_database"
# By askadam
CREATE TABLE Students (
    StudentID INTEGER NOT NULL PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    DOB DATE NOT NULL,
    DOJ DATE NOT NULL,
    Mobile VARCHAR(15) UNIQUE,
    Email VARCHAR(50) UNIQUE,
    Address VARCHAR(100),
    Gender VARCHAR(50),
    CreatedDate DATE DEFAULT (CURRENT_DATE),
    CONSTRAINT chk_gender CHECK (Gender IN ('Male', 'Female', 'Other', 'Prefer Not to Say')),
    CONSTRAINT chk_dob CHECK (DOB <= CreatedDate),
    CONSTRAINT chk_doj CHECK (DOJ > DOB AND DOJ <= CreatedDate)
);

DESCRIBE Students;

# Check the Students table
# By askadam
SELECT * FROM Students;

# Insert data in Students table
#By asthorat
#++-------------------------------------------------------------------------------------------------------------------------------------++# 
INSERT INTO Students (StudentID, Name, DOB, DOJ, Mobile, Email, Address, Gender) VALUES
(1, 'Aarav Kumar', '2001-03-15', '2024-08-16', '+11234567890', 'aakumar@iu.edu', '3209 E 10th Street, I-1, Bloomington, Indiana - 47408', 'Male'),
(2, 'Vivaan Singh', '2000-07-21', '2024-08-17', '+11234567891', 'visingh@iu.edu', '3209 E 10th Street, I-2, Bloomington, Indiana - 47408', 'Male'),
(3, 'Diya Kapoor', '1999-11-30', '2024-08-18', '+11234567892', 'dikapoor@iu.edu', '3209 E 10th Street, I-3, Bloomington, Indiana - 47408', 'Female'),
(4, 'Isha Patel', '2002-01-12', '2024-08-19', '+11234567893', 'ispatel@iu.edu', '3209 E 10th Street, I-4, Bloomington, Indiana - 47408', 'Female'),
(5, 'Vihaan Dutta', '2001-05-09', '2024-08-20', '+11234567894', 'vidutta@iu.edu', '3209 E 10th Street, I-5, Bloomington, Indiana - 47408', 'Male'),
(6, 'Sara Ali', '2000-12-22', '2024-08-21', '+11234567895', 'saali@iu.edu', '3209 E 10th Street, I-6, Bloomington, Indiana - 47408', 'Female'),
(7, 'Kabir Shah', '2002-02-18', '2024-08-22', '+11234567896', 'kashah@iu.edu', '3209 E 10th Street, I-7, Bloomington, Indiana - 47408', 'Male'),
(8, 'Zara Khan', '1999-10-05', '2024-08-23', '+11234567897', 'zakhan@iu.edu', '3209 E 10th Street, I-8, Bloomington, Indiana - 47408', 'Female'),
(9, 'Arjun Rao', '2001-06-20', '2024-08-24', '+11234567898', 'arrao@iu.edu', '3209 E 10th Street, I-9, Bloomington, Indiana - 47408', 'Male'),
(10, 'Neha Maurya', '2000-04-25', '2024-08-25', '+11234567899', 'nemaurya@iu.edu', '3209 E 10th Street, I-10, Bloomington, Indiana - 47408', 'Female');
#++-------------------------------------------------------------------------------------------------------------------------------------++#

#Checking the inserted data
#By asthorat
SELECT * FROM Students;

#++------------------------------------------------------------ CREATE --------------------------------------------------------------------++#
# By nkothav
INSERT INTO Students (StudentID, Name, DOB, DOJ, Mobile, Email, Address, Gender)
VALUES 
(11, 'Kiara Goyal', '2001-10-19', '2024-08-24', '+19876543210', 'kikiara@iu.edu', '3209 E 10th street, I-11, Bloomington, Indiana - 47408', 'Female');
#++-------------------------------------------------------------------------------------------------------------------------------------++#


# ++---------------------------------------------- SEARCH ---------------------------------------------------------------------------- ++ #

-- Search the student by ID
SET @searchID = 1;
SELECT * FROM Students WHERE StudentID = @searchID;

-- Search the student by Name
SET @searchName = 'Diya Kapoor';
SELECT * FROM Students WHERE Name = @searchName;

-- Query to search for students using partial matching in the name
SET @partialName = '%Kapoor%';
SELECT * FROM Students WHERE Name LIKE @partialName;

# ++------------------------------------------------- DELETE ------------------------------------------------------------------------- ++ #
-- Set a variable for the student name
SET @studentName = 'Diya Kapoor';
-- Delete using the variable
DELETE FROM Students WHERE Name = @studentName;

-- Set a variable for the student ID
SET @studentID = 11;

-- Delete using the variable
DELETE FROM Students WHERE StudentID = @studentID;

SELECT * FROM Students;

# ++ ------------------------------------------------------- UPDATE ------------------------------------------------------------------ ++#
-- Set variables for dynamic update
# By askadam
SET @studentID = 3;
SET @newEmail = 'dynamicemail@domain.com';

-- Update using variables
UPDATE Students
SET Email = @newEmail
WHERE StudentID = @studentID;


-- Set variables for dynamic update
SET @studentName = 'Diya Kapoor';
SET @newEmail = 'dynamicemail@domain.com';

-- Update using variables
UPDATE Students
SET Email = @newEmail
WHERE Name = @studentName;

# ++ ------------------------------------------------------------------------------------------------------------------------------- ++#

# ++ ----------------------------------------------------- SHOW ---------------------------------------------------------------------- ++#
-- Set the name in a variable
#By asthorat
SET @studentName = 'Diya Kapoor';

-- Retrieve the student's information
SELECT * FROM Students WHERE Name = @studentName;

-- Set the ID in a variable
SET @studentID = 1;

-- Retrieve the student's information by ID
SELECT * FROM Students WHERE StudentID = @studentID;
# ++ ------------------------------------------------------------------------------------------------------------------------------- ++#

# Drop "Students" table from student_database
DROP TABLE Students;









