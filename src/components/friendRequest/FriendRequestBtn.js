import { useSelector } from "react-redux"
import { selectMyUser } from "../../features/myUserSlice"
import { useMutation } from "react-query"
import { useQueryClient } from "react-query"
import { useState } from "react"
import './friendRequest.css'
import { useEffect } from "react"


export default function FriendRequestBtn({ receiverId }) {

    const myUser = useSelector(selectMyUser)
    const user = myUser.user
    const senderId = myUser.id
    const queryClient = useQueryClient()
    const [ requestStatus, setRequestStatus ] = useState('')

    useEffect(() => {
        if(!user) return
        const findSent = user.sentFriendRequests.find(request => request.receiverId === receiverId)
        const findReceived = user.receivedFriendRequests.find(request => request.senderId === receiverId)
        if (findSent) {
           if(findSent.status === 'pending') {
               setRequestStatus('sent')
           } else if (findSent.status === 'accepted') {
                setRequestStatus('accepted')
              } else if (findSent.status === 'declined') {
                setRequestStatus('declined')
              }
        } else if (findReceived) {
            if(findReceived.status === 'pending') {
                setRequestStatus('received')
            } else if (findReceived.status === 'accepted') {
                setRequestStatus('accepted')
              } else if (findReceived.status === 'declined') {
                setRequestStatus('declined')
              }
        } else {
            setRequestStatus('none')
        }
    }, [myUser, receiverId])
    
    const sendFriendRequest = async (body) => {
        try {
            const res = await fetch('http://localhost:8030/friendship', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                console.log('Error creating friendship');
            }
            const data = await res.json();
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const { mutate } = useMutation({ mutationFn: sendFriendRequest, onSuccess: () => {
        queryClient.invalidateQueries('myUser')
    }});

    const handleSendRequest = () => {
        if(requestStatus === 'accepted' || requestStatus === 'declined') return
        mutate({ senderId, receiverId });
    }

    return(
        <button className='btn friend-btn blue-button' onClick={handleSendRequest}>
            { requestStatus === 'none' && 'Add friend' }
            { requestStatus === 'sent' && 'Friend request sent' }
            { requestStatus === 'received' && 'Accept friend request' }
            { requestStatus === 'accepted' && 'Friends' }
            { requestStatus === 'declined' && 'Friend request declined' }
             </button>
    )

}