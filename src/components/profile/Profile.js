import React, { useState } from 'react';
import ProfileInfo from './profileInfo/ProfileInfo';
import ProfileHeader from './profileHeader/ProfileHeader';
import CreatePost from '../post/createPost/CreatePost';
import { useQuery } from 'react-query';
import './profile.css';
import { selectUser, setUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import PostList from '../post/postList/PostList';

export default function Profile(){

 const navigate = useNavigate()
 const user = useSelector(selectUser)
 const authorId = user.id
 const fullName = `${user.firstName} ${user.lastName}`
 const {userId} = useParams()
 const dispatch = useDispatch()
 const {data} = useQuery('myUser', async () => {
    try{
      const res = await fetch(`http://localhost:8030/user/id/${userId}` , {
        method: 'GET',
        credentials: 'include'
      })
      if(res.status=== 401 ) { // if user is not logged in, redirect to login page
        navigate('/access/login')
      }
      const data = await res.json()
      dispatch(setUser(data))
      console.log('User data fetched')
      return data
    } catch(error){
      console.log(error)
    }
  })



  return (
    <div className="profile">
      <>
       <ProfileHeader myUser={user}/>
      </>
      <main>
        <div className='main-left'>
          <ProfileInfo />
        </div>
        <div className='main-right'>
          <PostList authorId={authorId} authorName={fullName}/>
        </div>
      </main>
    </div>
  );
};


