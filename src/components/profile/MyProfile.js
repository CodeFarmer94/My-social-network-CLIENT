import React, { useState } from 'react';
import ProfileInfo from './profileInfo/ProfileInfo';
import ProfileHeader from './profileHeader/ProfileHeader';
import CreatePost from '../post/createPost/CreatePost';
import { useQuery } from 'react-query';
import './profile.css';
import { selectMyUser, setMyUser } from '../../features/myUserSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import PostList from '../post/postList/PostList';

export default function MyProfile(){

 const navigate = useNavigate()
 const myUser = useSelector(selectMyUser)
 const authorId = myUser.id
 const fullName = `${myUser.firstName} ${myUser.lastName}`
 const {userId} = useParams()
 const dispatch = useDispatch()
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



  return (
    <div className="profile">
      <>
       <ProfileHeader myUser={myUser}/>
      </>
      <main>
        <div className='main-left'>
          <ProfileInfo />
        </div>
        <div className='main-right'>
          <CreatePost/>
          <PostList authorId={authorId} authorName={fullName}/>
        </div>
      </main>
    </div>
  );
};


