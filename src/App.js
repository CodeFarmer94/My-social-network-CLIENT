import React from 'react';
import './App.css';
import "./utilities.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import AccessPage from './components/access/AccessPage';
import MyProfile from './components/profile/MyProfile';
import Messanger from './components/messenger/Messenger';
import SocketConnection from './components/messenger/SocketConnection';
import IsLoading from './components/isLoading/IsLoading';
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

 const {data, isLoading} = useQuery('myUser', async () => {
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
  
  if(isLoading) {
    return(
      <IsLoading />
    )
  }
   

  return (
    <div className="App">
      <SocketConnection user={myUser} />
      <Messanger />
      <Routes>
        <Route
          path="/profile/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/user/:userId" element={<Profile />} />
                <Route path="/me" element={<MyProfile />} />
              </Routes>
            </>
          }
        />
        <Route path="/access/*" element={<AccessPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
export default App;
