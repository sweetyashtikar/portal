import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Card } from 'react-bootstrap';

const EditEmployee = ({ employeeId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    salary: '',
    age: '',
  });

  useEffect(() => {
    fetchEmployee();
  }, [employeeId]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/employees/${employeeId}`);
      const { name, email, occupation, salary, age } = response.data;
      setFormData({ name, email, occupation, salary, age });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/employees/${employeeId}`, formData);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              </Form.Group>
              <Form.Group controlId="occupation">
                <Form.Label>Occupation</Form.Label>
                <Form.Control type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" required />
              </Form.Group>
              <Form.Group controlId="salary">
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
              </Form.Group>
              <Button variant="primary" type="submit">Update</Button>
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default EditEmployee;
