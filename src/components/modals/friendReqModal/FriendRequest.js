import { useQueryClient } from 'react-query'
import { useMutation } from 'react-query'

import { Image } from 'cloudinary-react'
import { Button } from 'react-bootstrap'
import './friendReqModal.css'

export default function FriendRequest({ firstName, lastName, avatarPublicId, senderId}){

   
    const queryClient = useQueryClient();
    const updateFriendship = async (body) => {
        try {
            const res = await fetch('http://localhost:8030/friendship', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                    });
                    const data = await res.json();
                    return data;
                } catch (error) {
                    console.log(error);
                }   
        }

        const { mutate } = useMutation({ mutationFn: updateFriendship, onSuccess: (data) => {
            queryClient.invalidateQueries('pendingFriendReqUsers')
            queryClient.invalidateQueries('userFriends')
           
        }
         })
        const handleUpdateFriendship = (senderId, status) => {
            mutate({ senderId, status })
        }
    
  

    return (
        <div className='user-profile' >
        <div className='user-profile-info'>
            <Image cloudName='dnq3ef4tj' publicId={avatarPublicId} id='md-profile-pic'/>
            <h4>{firstName} {lastName}</h4> 
             <div className='btns'>
                <Button variant='success' onClick = {()=> handleUpdateFriendship(senderId,  'accepted')}>Accept</Button>
                <Button variant='danger' onClick = {()=> handleUpdateFriendship(senderId, 'declined')}>Decline</Button> 
            </div>   
        </div>
        </div>
    )
}