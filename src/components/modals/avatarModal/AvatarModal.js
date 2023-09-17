import './avatarModal.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import UploadImage from '../../uploadImage/UploadImage'
import ImageGallery from '../../profile/imageGallery/ImageGallery'
import { useQuery } from 'react-query'
import { useState } from 'react'
export default function AvatarModal({ show, handleClose, myUserId }) {

  const [selectedImage, setSelectedImage] = useState(null);
  const { data } = useQuery('myUserAvatars', async () => {
      if(!myUserId) return console.log('No user id')
      try{
          const res = await fetch(`http://localhost:8030/picture/user/${myUserId}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          })
          if(!res.ok){
              throw new Error('Avatar fetch failed')
          }
          const data = await res.json()
          return data
      } catch(error){
          console.error(error)
      }
    })



  return (
    <div className='avatar-modal'>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4 className='modal-title'>
            Update profile picture
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UploadImage handleClose={handleClose} type='avatar' selectedImage={selectedImage}
         setSelectedImage={setSelectedImage}/>
      </Modal.Body>
    </Modal>
    </div>
  )
}