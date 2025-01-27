import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();  
    try {
      const response = await axios.post('http://localhost:3001/', { fname: fName, lname: lName });
      console.log(response.data);
      alert('Admin added successfully!');
      setFName('');
      setLName('');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add admin.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          value={fName}
          placeholder="First Name"
          onChange={(e) => setFName(e.target.value)}
          required
        />
        <input
          type="text"
          name="lastname"
          value={lName}
          placeholder="Last Name"
          onChange={(e) => setLName(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/view">View</Link>
    </>
  );
};

export default Add;
