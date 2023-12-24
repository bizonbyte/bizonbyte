'use client';
import React, { useState } from 'react';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isError, setIsError] = useState(false);


    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
        };


        try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            setStatusMessage('Message sent successfully!');
            setIsError(false);
            // Optionally clear the form here
        } else {
            setStatusMessage(data.message || 'Failed to send message.');
            setIsError(true);
        }
    } catch (error) {
        setStatusMessage('An error occurred.');
        setIsError(true);
    }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md mx-auto">
            <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 font-semibold">Name:</label>
                <input type="text" id="name" name="name" required onChange={(e) => setName(e.target.value)} className="text-gray-900 border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-semibold">Email:</label>
                <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} className="text-gray-900 border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="subject" className="mb-1 font-semibold">Subject:</label>
                <input type="text" id="subject" name="subject" required onChange={(e) => setSubject(e.target.value)} className="text-gray-900 border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none" />
            </div>

            <div className="flex flex-col">
                <label htmlFor="message" className="mb-1 font-semibold">Message:</label>
                <textarea id="message" name="message" required onChange={(e) => setMessage(e.target.value)} className="text-gray-900 border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none" rows="4"></textarea>
            </div>

            <button type="submit" className="bg-orange-700 text-white p-2 rounded-md hover:bg-orange-600 mt-2">Send</button>

            {statusMessage && (
                <div className={`mt-2 p-2 rounded-md text-center font-semibold ${isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {statusMessage}
                </div>
            )}
        </form>

    );
}
