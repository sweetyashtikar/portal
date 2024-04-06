import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StudentsForm } from './StudentsForm';
import { EditStudents } from './EditStudents';
export const ListStudents = () => {
    const [studentss, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editStudentsId, setEditStudentsId] = useState(null);
  
    useEffect(() => {
      fetchStudentss();
    }, []);
  
    const fetchStudentss = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const toggleForm = () => {
      setShowForm(!showForm);
    };
  
    const handleDelete = async (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this Students?');
      if (confirmDelete) {
        try {
          await axios.delete(`http://localhost:5000/students/${id}`);
          fetchStudentss(); // Refresh employee list after deletion
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
  
    const handleEdit = (id) => {
      setEditStudentsId(id);
    };
  
    const handleCloseEdit = () => {
      setEditStudentsId(null);
      fetchStudentss(); // Refresh employee list after editing
    };
  
    const handleAddStudents = () => {
      setShowForm(true); // Show the form modal to add new employee
    };
  
  
  return (
    <div>
    <h2>Students List</h2>
    <button onClick={handleAddStudents} className="btn btn-primary mb-3">Add Students</button>

    {/* Render EmployeeForm in modal */}
    {showForm && (
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Students</h5>
              <button type="button" className="close" onClick={() => setShowForm(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <StudentsForm onAddStudents={() => {
                setShowForm(false);
                fetchStudentss();
              }} />
            </div>
          </div>
        </div>
      </div>
    )}

    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Occupation</th>
          <th>Salary</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {studentss.map((students) => (
          <tr key={students._id}>
            <td>{students.name}</td>
            <td>{students.email}</td>
            <td>{students.occupation}</td>
            <td>{students.salary}</td>
            <td>{students.age}</td>
            <td>
              <button onClick={() => handleEdit(students._id)} className="btn btn-primary">Edit</button>
              <button onClick={() => handleDelete(students._id)} className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Render EditStudents in modal */}
    {editStudentsId && <EditStudents studentsId={editStudentsId} onClose={handleCloseEdit} />}
  </div>
  )
}
