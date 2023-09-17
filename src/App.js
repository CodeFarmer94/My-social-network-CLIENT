import React from 'react';
import './App.css';
import "./utilities.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Profile from './components/profile/Profile';
import { Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';
import AccessPage from './components/access/AccessPage';
import MyProfile from './components/profile/MyProfile';


function App() {
  
  return (
    <div className="App">
      <QueryClientProvider client={new QueryClient()}>
      <Routes>  
        <Route path="/profile/user/:userId" element={<Profile />} />
        <Route path="/profile/me" element={<MyProfile />} />
        <Route path="/access/*" element={<AccessPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
