const CONNECTION_URL = "http://localhost:3000/api/students/";


function showForm(formId) {
    document.querySelectorAll('.form').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

function closeForm(formId) {
    document.getElementById(formId).style.display = 'none';
}

function addStudent() {
    const student = {
        StudentID: document.getElementById('studentId').value,
        Name: document.getElementById('name').value,
        DOB: document.getElementById('dob').value,
        DOJ: document.getElementById('doj').value,
        Mobile: document.getElementById('mobile').value,
        Email: document.getElementById('email').value,
        Address: document.getElementById('address').value,
        Gender: document.getElementById('gender').value
    };
    console.log(student);
    

    fetch(CONNECTION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        closeForm('addForm');
        loadStudents();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function deleteStudent() {
    const studentId = document.getElementById('deleteId').value;
    
    fetch(`${CONNECTION_URL}${studentId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        closeForm('deleteForm');
        loadStudents();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function searchStudent() {
    const searchName = document.getElementById('searchName').value;

    fetch(`${CONNECTION_URL}search?name=${searchName}`)
    .then(response => response.json())
    .then(data => {
        displayStudents(data);
        closeForm('searchForm');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateStudent() {
    const studentId = document.getElementById('updateId').value;
    const student = {
        Name: document.getElementById('updateName').value,
        DOB: document.getElementById('updateDob').value,
        DOJ: document.getElementById('updateDoj').value,
        Mobile: document.getElementById('updateMobile').value,
        Email: document.getElementById('updateEmail').value,
        Address: document.getElementById('updateAddress').value,
        Gender: document.getElementById('updateGender').value
    };

    fetch(`http://localhost:3000/api/students/${studentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        closeForm('updateForm');
        loadStudents();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// function updateStudent() {
//     const studentId = document.getElementById('updateId').value;
//     const fieldToUpdate = document.getElementById('updateField').value;
//     const newValue = document.getElementById('updateValue').value;

//     if (!fieldToUpdate || !newValue) {
//         console.error('Field to update and new value must be provided');
//         return;
//     }

//     const updateData = {
//         [fieldToUpdate]: newValue
//     };

//     fetch(`${CONNECTION_URL}${studentId}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updateData),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         closeForm('updateForm');
//         loadStudents();
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// } 

function loadStudents() {
    fetch(CONNECTION_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayStudents(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


function displayStudents(students) {
    const tableBody = document.getElementById('studentTable');
    tableBody.innerHTML = '';
    students.forEach(student => {
        const row = `<tr>
            <td>${student.StudentID}</td>
            <td>${student.Name}</td>
            <td>${student.DOB}</td>
            <td>${student.DOJ}</td>
            <td>${student.Mobile}</td>
            <td>${student.Email}</td>
            <td>${student.Address}</td>
            <td>${student.Gender}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}


document.addEventListener('DOMContentLoaded', loadStudents);
