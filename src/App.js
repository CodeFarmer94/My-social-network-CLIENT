import React from 'react';
import './App.css';
import "./utilities.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import AccessPage from './components/access/AccessPage';
import MyProfile from './components/profile/MyProfile';
import Messanger from './components/messenger/Messanger';
import SocketConnection from './components/messenger/SocketConnection';
import { Route, Routes} from 'react-router-dom';
import { useQuery } from 'react-query';
import { selectMyUser } from './features/myUserSlice';
import { useSelector } from 'react-redux';
import { setMyUser } from './features/myUserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
function App() {
  
  const dispatch = useDispatch();
  const myUser = useSelector(selectMyUser);
  const navigate = useNavigate()

 const {data} = useQuery('myUser', async () => {
    try{
      const res = await fetch(`http://localhost:8030/user/me` , {
        method: 'GET',
        credentials: 'include'
      })
      if(res.status=== 401 ) { // if user is not logged in, redirect to login page
        navigate('/access/login')
      }
      const data = await res.json()
      dispatch(setMyUser(data))
      console.log('User data fetched')
      return data
    } catch(error){
      console.log(error)
    }
  })
  
   // Render SocketConnection component only if the user is authenticated
   const renderSocketConnection = myUser ? <SocketConnection /> : null;
  return (
    <div className="App">
      {renderSocketConnection}
      <Routes>  
        <Route path="/messanger" element={<Messanger />} />
        <Route path="/profile/user/:userId" element={<Profile />} />
        <Route path="/profile/me" element={<MyProfile />} />

        <Route path="/access/*" element={<AccessPage />} />
        <Route path="/" element={<Home />} />
        <Route path = '/messanger' element = {<Messanger/>} />
      </Routes>
    </div>
  );
}

export default App;
