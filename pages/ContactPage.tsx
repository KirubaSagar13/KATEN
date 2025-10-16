import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage('');

    try {
      const fd = new FormData();
      fd.append('your-name', formData.name);
      fd.append('your-email', formData.email);
      fd.append('your-message', formData.message);

      // CF7 form ID (decimal) and unit tag
      fd.append('_wpcf7', '18');
      fd.append('_wpcf7_unit_tag', 'wpcf7-f18-p18-o1');

      const response = await fetch(
        'http://reactwpbackend.local/wp-json/contact-form-7/v1/contact-forms/18/feedback',
        {
          method: 'POST',
          body: fd,
        }
      );

      const result = await response.json();

      if (result.status === 'mail_sent') {
        setStatusMessage('✅ Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusMessage('❌ Error sending message. Please check your fields.');
        console.error(result);
      }
    } catch (error) {
      setStatusMessage('❌ Error sending message. Please try again later.');
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us using the form below.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          disabled={isSending}
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: isSending ? 'not-allowed' : 'pointer',
          }}
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {statusMessage && (
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{statusMessage}</p>
      )}
    </div>
  );
};

export default ContactPage;
