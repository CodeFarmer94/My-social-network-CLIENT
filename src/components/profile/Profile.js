
import ProfileInfo from './profileInfo/ProfileInfo';
import ProfileHeader from './profileHeader/ProfileHeader';
import FriendList from '../friendList/FriendList';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import './profile.css';
import { selectUser, setUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import PostList from '../post/postList/PostList';
import IsLoading from '../isLoading/IsLoading';

export default function Profile(){

 // Variables
 const navigate = useNavigate()
 const dispatch = useDispatch()

 // Redux State
 const user = useSelector(selectUser)
 const authorId = user.id
 const fullName = `${user.firstName} ${user.lastName}`

 // Params 
 const {userId} = useParams()

  // Fetch user data
 const {data, refetch, isLoading } = useQuery('user', async () => {
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
  }, { enabled: false})

  
  // Use a useEffect to refetch the query when userId changes
 useEffect(() => {
    refetch(); // Call refetch to fetch the data when userId changes
  }, [userId]);

  if(isLoading) {
    return(
      <IsLoading />
    )
  }

  return (
    <div className="profile">
      <>
       <ProfileHeader user={user}/>
      </>
      <main>
        <div className='main-left'>
          <ProfileInfo user={user}/>
          <FriendList user={user}/>
        </div>
        <div className='main-right'>
          <PostList authorId={authorId} authorName={fullName}/>
        </div>
      </main>
    </div>
  );
};


