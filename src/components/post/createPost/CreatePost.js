
import './createPost.css'
import { Image } from 'cloudinary-react';
import { useState } from 'react';
import PostModal from '../../modals/postModal/PostModal';
import { useSelector } from 'react-redux';
import { selectMyUser } from '../../../features/myUserSlice';

export default function CreatePost() {

    const [show, setShow] = useState(false);
    const myUser = useSelector(selectMyUser);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { avatarPublicId } = myUser;
    

    return(
        <form>
            <div className="post-form" onClick={handleShow}>
                <header>
                <Image id='sl-profile-pic' cloudName='dnq3ef4tj' publicId={avatarPublicId}  />
                    <input
                        name="content"
                        type="text"
                        placeholder="What's on your mind?"
                    />
                </header>
                <div className="post-form-footer">
                </div>
            </div>
            <PostModal show={show} handleClose={handleClose} />
        </form>


    )}