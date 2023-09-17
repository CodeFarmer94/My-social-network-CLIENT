import './login.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import { useLocation } from 'react-router';
import { Routes, Route } from 'react-router-dom';

export default function AccessPage() {
  const [displayText, setDisplayText] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [delay, setDelay] = useState(5);
  const location = useLocation();

  useEffect(() => {
    setDelay(displayText ? 4000 : 1000);
    setTimeout(() => {
      setDisplayText(!displayText);
    }, delay);
  }, [displayText]);

  useEffect(() => {
    if (!displayText) {
      setTextIndex((prevTextIndex) => (prevTextIndex + 1) % textArr.length);
    }
  }, [displayText]);

  const textArr = [
    'Unlock the Power of Community: Circle is Here!',
    'News Feed: Stay updated on friends activities',
    'Create Communities: Build or join interest-based groups for lively discussions and networking.',
    'Share: Post photos, videos, and more to your feed.',
    'Chat: Send messages to friends and groups.',
    'Events: Plan events and invite friends.',
    'Explore Interests: Discover new hobbies and passions.',
    'Find Friends: Search for friends and connect with them.',
    'Profile: Customize your profile and make it your own.',
    'Privacy: Control who can see your posts and profile.',
    'Settings: Manage your account and preferences.',
  ];

  return (
    <div className= "accessPageBackground">
      <div className= "accessPageContainer">
        <img src={logo} alt= "logo" id="logo" />
        <div className="flex-column wid-500px">
          <div className={`text-slide-box ${displayText ? 'fade-out mar-05' : 'mar-05'}`}>
            <p>{textArr[textIndex]}</p>
          </div>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
