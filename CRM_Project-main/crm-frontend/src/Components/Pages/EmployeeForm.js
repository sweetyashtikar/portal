import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const EmployeeForm = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    salary: '',
    age: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/employees', formData);
      alert('Employee registered successfully!');
      setFormData({
        name: '',
        email: '',
        occupation: '',
        salary: '',
        age: '',
      });
      onAddEmployee(); // Trigger refresh of employee list
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add Employee</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Name" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="form-control" placeholder="Occupation" required />
          </div>
          <div className="form-group">
            <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="form-control" placeholder="Salary" required />
          </div>
          <div className="form-group">
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" placeholder="Age" required />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
