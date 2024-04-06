import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeForm from './EmployeeForm';
import EditEmployee from './EditEmployee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Employee?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        fetchEmployees(); // Refresh employee list after deletion
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEdit = (id) => {
    setEditEmployeeId(id);
  };

  const handleCloseEdit = () => {
    setEditEmployeeId(null);
    fetchEmployees(); // Refresh employee list after editing
  };

  const handleAddEmployee = () => {
    setShowForm(true); // Show the form modal to add new employee
  };

  return (
    <div>
      <h2>Employee List</h2>
      <button onClick={handleAddEmployee} className="btn btn-primary mb-3">Add Employee</button>

      {/* Render EmployeeForm in modal */}
      {showForm && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Employee</h5>
                <button type="button" className="close" onClick={() => setShowForm(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <EmployeeForm onAddEmployee={() => {
                  setShowForm(false);
                  fetchEmployees();
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
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.occupation}</td>
              <td>{employee.salary}</td>
              <td>{employee.age}</td>
              <td>
                <button onClick={() => handleEdit(employee._id)} className="btn btn-primary">Edit</button>
                <button onClick={() => handleDelete(employee._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render EditEmployee in modal */}
      {editEmployeeId && <EditEmployee employeeId={editEmployeeId} onClose={handleCloseEdit} />}
    </div>
  );
};

export default EmployeeList;
