import React, { useState } from 'react';

function ResumeForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input name="name" onChange={handleChange} required />
      
      <label>Email:</label>
      <input name="email" type="email" onChange={handleChange} required />
      
      <label>Phone:</label>
      <input name="phone" onChange={handleChange} required />
      
      <label>Skills:</label>
      <textarea name="skills" onChange={handleChange} required />
      
      <label>Experience:</label>
      <textarea name="experience" onChange={handleChange} required />
      
      <button type="submit">Generate Resume</button>
    </form>
  );
}

export default ResumeForm;
