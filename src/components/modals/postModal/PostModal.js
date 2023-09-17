import './postModal.css';
import profilePic from '../../../images/profile-pic.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQueryClient } from 'react-query'; // Import useQueryClient
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function PostModal({ show, handleClose }) {
  const queryClient = useQueryClient(); // Initialize the queryClient

  const schema = yup.object().shape({
    content: yup.string().required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const postPost = async (body) => {
    try {
      const res = await fetch('http://localhost:8030/post', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.log('Error creating post');
        const data = await res.json();
        console.log(data);
      }  
        handleClose(); // Close the modal
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const { mutate } = useMutation({mutationFn: postPost, onSuccess: () => queryClient.invalidateQueries('userPosts')});

  const onSubmit = (data, e) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className='modal-title'>Create Post</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="post-form">
            <header>
              <img src={profilePic} alt="profile-pic" id='sl-profile-pic' />
              <input
                name="content"
                type="text"
                placeholder="What's on your mind?"
                {...register("content")}
              />
            </header>
            <div className="post-form-footer"></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' type='submit' onClick={handleClose}>Send</Button>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
