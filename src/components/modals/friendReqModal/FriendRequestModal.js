import './friendReqModal.css'
import { Modal, Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'
import { useQuery} from 'react-query'
import { useQueryClient } from 'react-query'
import { useMutation } from 'react-query'
import FriendRequest from './FriendRequest'

export default function FriendRequestModal({ show, handleClose }) {
   

    const { data, isLoading } = useQuery('pendingFriendReqUsers', async () => {
        try {
            const res = await fetch('http://localhost:8030/friendship/me/pending', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }, {
        enabled: show, // Enable the query when the modal is shown
    });

    if(isLoading) return <div>Loading...</div>

    const profilesList = data?.map((user) => {
        const { firstName, lastName, avatarPublicId, id: senderId } = user.sender.UserDetail;
        return (
            <FriendRequest key={senderId} firstName={firstName} lastName={lastName} avatarPublicId={avatarPublicId} senderId={senderId} />
        )
    })
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
            <h4 className='modal-title'>Friend Requests</h4>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='friend-req-modal'>
            {profilesList}
        </Modal.Body>
        <Modal.Footer>
            <Button
            variant='secondary'
            onClick={handleClose}
            >
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    );
    }