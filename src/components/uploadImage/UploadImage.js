

import React, { useState } from 'react';
import './uploadImage.css'
import { useMutation, useQueryClient } from 'react-query';
import Button from 'react-bootstrap/Button'
import { FaCloudUploadAlt } from 'react-icons/fa'


export default function UploadImage({handleClose, type, selectedImage, setSelectedImage}) {

  const [showWarning, setShowWarning] = useState(false);
  const [imgData, setImgData ] = useState(null); 
  const queryClient = useQueryClient();

  const uploadImageToCloud = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('upload_preset', 'aopjytsb');
      
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dnq3ef4tj/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const data = await response.json();
      return data

    } catch (error) {
      console.error(error);
    }
  };

  const uploadImageToServer = async (body) => {
    console.log(body)
    try{
        const res = await fetch('http://localhost:8030/picture', {
            method: 'POST',
            credentials: 'include', // This should be here
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
       
        if(!res.ok){
            throw new Error('Upload failed')
        }
        const data = await res.json()
        setImgData(data)
        return data

    } catch(error){
        console.error(error)
    }
  }

  const cancel = () => {
    setSelectedImage(null)
    handleClose()
  }
 const updateMyUserAvatar = async (body) => {
  console.log(body)
  try{
      const res = await fetch('http://localhost:8030/user/me/avatar', {
          method: 'PUT',
          credentials: 'include', // This should be here
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      })
      if(!res.ok){
        throw new Error('Avatar update failed')
    }
    const data = await res.json()
   
  } catch(error){
    console.error(error)
  }
}
 const {mutate: mutateUploadToCloud, isLoading} = useMutation({mutationFn: uploadImageToCloud, onSuccess: (data) => {
  console.log(data)
  mutatePostImage({publicId: data.public_id, type: type})}})

 const {mutate: mutatePostImage } = useMutation({mutationFn: uploadImageToServer , onSuccess: () => {
    console.log('Image uploaded to server')
    queryClient.invalidateQueries('myUser')
    queryClient.invalidateQueries('myUserAvatars')
    setShowWarning(true)
 }})
  const {mutate: mutateUpdateAvatar} = useMutation({ mutationFn: updateMyUserAvatar, onSuccess: () => {
    queryClient.invalidateQueries('myUser')
    queryClient.invalidateQueries('myUserAvatars')
    queryClient.invalidateQueries('postAuthorData')
    setShowWarning(false)
    setSelectedImage(null)
    handleClose()
  }
  })

  return (
    <div className='upload-image'>
      <input
        onChange={(e) => setSelectedImage(e.target.files[0])}
        type="file"
        name='upload'
      />
      {selectedImage && <img id='selected-image'src={selectedImage ? URL.createObjectURL(selectedImage) : null}  />}
      {showWarning && <div className='flex-column'>
        <span className='upload-warning'>
        <h5>Image Upload Completed</h5> 
        <h4><FaCloudUploadAlt/></h4>
        </span>
        <Button variant='success' 
        className='change-avatar-btn'
        onClick={() => mutateUpdateAvatar(imgData)}
        >

           Set Image as Avatar</Button>
        </div>}
      <div className='upload-image-footer'>
         <Button variant='secondary' onClick={cancel}>
          Close
        </Button>
        <Button variant='primary'  disabled={isLoading} onClick={mutateUploadToCloud}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </Button>
        </div>
    </div>
  );
}

