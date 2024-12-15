# student_management_system 👤
The Student Management &amp; Facilitation System aims to create a web-based platform that allows educational institutions to efficiently manage and maintain student records. This system will include functionalities for adding, updating, and deleting student information. 

---

**Contributers:** 📝

*Abhijeet Suresh Thorat (asthorat)*

*Aditya Kadam (askadam)*

*Neha Kothavade (nkothav)*

---

**Initial Setup**
- Database connection configuration with connecting MAMP and MySQL Workbench
- Create student_database

**Database Structure**
The Students table is created with constraints:
- StudentID: Is the primary key and cannot be null value
- Name: Required field so cannot be null value
- Date of Birth: Must be valid and not exceed current date
- Date of Joining: Must be after date of birth and not exceed current date
- Contact Details: Email and mobile number must be unique
- Gender: Options include 'Male', 'Female', 'Other', or 'Prefer Not to Say'

**Data Management system implements CRUD (Create, Read, Update, Delete) operation flow:**

**Create Operations**
- Data insertion of new student
- Data validation checking when inserting data
- Error handling for incorrect formats of data


**Data Retrieval and Modification**
- Read: Access the student records
- Update: Modify the existing student information
- Delete: Remove student records from the database

**Error Handling**
If data validation fails, it routes to an error handling process after which the user can insert valid data again.

**Advanced Features**
Provisions for advanced functionalities are possible, making the system extensible for future enhancements.

