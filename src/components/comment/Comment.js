import { useQuery } from 'react-query';
import { Image } from 'cloudinary-react';
import './comment.css';
import CommentFooter from './commentFooter/CommentFooter';
import { useState } from 'react';


export default function Comment({ comment}) {

    if (!comment) return <div>Loading</div>;
    
    const { content, children, author, postId, id, CommentLikes: commentLikes } = comment;
    const { firstName, lastName, avatarPublicId } = author.UserDetail;
   
    
    return (
        <div className='comment-ctn'>
            <div className='comment-header'>
                <Image cloudName='dnq3ef4tj' publicId={avatarPublicId} id='sl-profile-pic' className='comment-avatar' />
                <div className="comment-content-ctn">
                    <p className='comment-author'>{firstName} {lastName}</p>
                    <p className='mar-0'>{content}</p>
                </div>
            </div>
            
            <CommentFooter postId={postId} parentId={id} commentId = {id} commentLikes = { commentLikes}/>
            
                {children && children.map(child => (
                <div className='subcomments'>
                    <div key={child.id}>
                        <Comment
                            comment={child}
                        /></div>
                    </div>
                ))}
            
        </div>
    );
}
