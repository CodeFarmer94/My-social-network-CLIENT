import './friendList.css'
import { useQuery } from  'react-query'
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMyUser } from '../../features/myUserSlice';
export default function FriendList({ user, myUser }) {
   
    const userId = user.id
    const myUserId = useSelector(selectMyUser).id

    const { data: friends, isLoading, isError } = useQuery('userFriends', async () => {
        try{
            const res = await fetch(`http://localhost:8030/friendship/user/${userId}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                console.log('Error getting friends');
            }
            const data = await res.json();
            console.log(data)
            return data
        } catch (error) {
            console.log(error.message);
        }
    }, { enabled: !!userId}) // Enable the query when the userId is available

    if(isLoading) return <div>Loading...</div>
    
    const friendList = friends?.map( (friend, index) => { 

        // Check if the user is the sender or receiver
        const bool = friend.senderId === userId ? 'receiver' : 'sender'
        // Get the user details of the friend
        const { firstName, lastName, avatarPublicId, id : friendId } = friend[bool]?.UserDetail
        const fullName = `${firstName} ${lastName}`
       
        
        return (
            <Link to={myUserId ===  friendId ? '/profile/me' : `/profile/user/${friendId}`} className='friend-box' key={index}>
            <div className='friend-box' key={index}>
                <Image cloudName="dnq3ef4tj" publicId={avatarPublicId} id='friendlist-pic'/>
                <h6>{fullName}</h6>
            </div>
            </Link>
        )
    })

    return (
        <div className='friends-box'>
            <h2>Friends</h2>
            <p>You have {friends?.length} friends</p>
            <div className = 'friendlist-box'>
                {friendList}
            </div>
            

        </div>
    )
}