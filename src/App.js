// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import './App.css';

function App() {
    return (
        <Router>
            <div id="app">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
