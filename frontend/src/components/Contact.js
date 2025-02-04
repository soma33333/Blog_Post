import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import axios from "axios";

const Contact = () => {
  const {id}=useParams()
  const [reciever,setReceiver]=useState([])
  const {user,setUser}=useAuth()
  const [formData, setFormData] = useState({
    name: user?.name||'',
    email:user?.email  || '',
    message: '',
  });
  

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchreciever = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/getreceiver/${id}`
        );
        
        setReceiver(response.data.post.Contributer);
        
      } catch (error) {
        console.error("Error fetching receiver:", error);
      }
      
    };
    fetchreciever()
},[])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
  
    const serviceID = process.env.REACT_APP_SERVICEID;
    const templateID = process.env.REACT_APP_TEMPLATEID;
    const publicKey = process.env.REACT_APP_PUBLIC_KEY;
  
    const templateParams = {
      to_name:reciever.name,
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: reciever.email, // Change dynamically if needed
    };
  
    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };
  

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
