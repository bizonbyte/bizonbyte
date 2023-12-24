'use client';
import React, { useState } from 'react';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            name: event.target.name.value,
            subject: event.target.subject.value,
            email: event.target.email.value,
            message: event.target.message.value,
        };

        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="Subject">Subject:</label>
            <input type="subject" id="subject" name="subject" required onChange={(e) => setSubject(e.target.value)} />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required onChange={(e) => setMessage(e.target.value)}></textarea>

            <button type="submit">Send</button>
        </form>
    );
}
