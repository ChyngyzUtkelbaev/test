// src/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Получаем информацию о пользователе при загрузке страницы
        const fetchUser = async () => {
            const response = await axios.get('/user');
            setUser(response.data);
            setName(response.data.name);
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/profile', { name });
            if (response.data.success) {
                setMessage('Profile updated successfully');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" value={user.email} disabled />
                <input type="text" value={user.registrationDate} disabled />
                <button type="submit">Save Changes</button>
                <p className="message">{message}</p>
            </form>
        </div>
    );
};

export default Profile;
