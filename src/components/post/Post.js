import React from 'react';
import './post.css';
import { AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';
import { Image } from 'cloudinary-react';
import CommentList from '../comment/commentList/CommentList';
import CreateComment from '../comment/createComment/CreateComment';
import { useState } from 'react';
import PostLike from './postLike/PostLike';
import { PiSmileyWinkDuotone } from 'react-icons/pi';
import {BiSolidCommentDetail} from 'react-icons/bi';
export default function Post({ post}) { 

    const { id: postId, content, createdAt, updatedAt, author, PostLikes: postLikes, Comments: comments } = post;
    const { firstName, lastName, avatarPublicId } = author.UserDetail;

    const [showCreateComment, setShowCreateComment] = useState(false);

const date = new Date(createdAt || updatedAt);
// Define options for formatting the date
const options = { year: 'numeric', month: 'long', day: 'numeric' };
// Format the date using toLocaleDateString
const formattedDate = date.toLocaleDateString(undefined, options);
// Use formattedDate in your output
const dateStr = createdAt === updatedAt ? `Posted on ${formattedDate}` : `Updated on ${formattedDate}`;

const handleCommentButtonClick = () => {
    setShowCreateComment((prev) => !prev);

  };
   
    return(
        <div className="post">
            <div className="flex-column">
                <div className="post-header">
                    <Image cloudName='dnq3ef4tj' publicId={avatarPublicId} id='sl-profile-pic' />
                    <div className="post-header-info flex-column wid-100" >
                        <h4 className="post-header-name ">{firstName} {lastName}</h4>
                        <p className="post-header-date  f-size-08">{ dateStr}</p>
                    </div>
                </div>
                <div className='post-body'>
                    <p className="post-text">
                        {content}
                    </p>
                </div>
                <div className='post-stats'>
                    {postLikes.length ? <p className="post-stats-box">
                        <PiSmileyWinkDuotone className='stats-icon'/> 
                            {postLikes.length}
                     </p> : ""}
                    <p className="post-stats-box second">
                        <BiSolidCommentDetail className='stats-icon'/>
                        {comments.length} 
                    </p>
                </div>
                <div className="post-footer">
                    <div className="post-footer-btns flex-row gap-1">
                        <PostLike postId={postId} postLikes = {postLikes}/>
                        <button className="comment-btn" onClick = {handleCommentButtonClick}>
                            <AiOutlineComment className="post-icon" />
                            Comment
                        </button>
                        <button className="share-btn">
                            <AiOutlineShareAlt className="post-icon" />
                            Share
                        </button>
                    </div>
                    <div className="post-footer-comments">
                        {showCreateComment &&  <CreateComment postId={postId} parentId= {null} />}
                        <CommentList postId={postId}  comments= {comments}/>
                    
                    </div>
                </div>
                
            </div>
        </div>
    )
}