import { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      await axios.post('https://feedback-app-backend-9ox0.onrender.com/feedback', formData);
      setSuccessMsg('Thank you for your feedback!');
      setFormData({ name: '', email: '', message: '' });
      onSuccess();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error(error);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-md text-gray-100">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-400 mb-6 text-center">We value your Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 bg-white/30 text-gray-900 placeholder-gray-600 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 bg-white/30 text-gray-900 placeholder-gray-600 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <textarea
          name="message"
          placeholder="Your Feedback"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 bg-white/30 text-gray-900 placeholder-gray-600 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        ></textarea>
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-600 to-slate-600 hover:opacity-90 text-white py-3 rounded-md font-medium transition duration-300 hover:scale-105"
        >
          Submit
        </button>
      </form>
      {successMsg && <p className="text-green-200 mt-4 text-center">{successMsg}</p>}
    </div>
  );
};

export default FeedbackForm;
