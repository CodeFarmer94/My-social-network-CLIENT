import { useState, useEffect } from "react";
import CreateComment from "../createComment/CreateComment";
import CommentLike from "../commentLike/CommentLike";
import './commentFooter.css';
import { useSelector } from "react-redux";
import { selectMyUser } from "../../../features/myUserSlice";
export default function CommentFooter({postId, parentId, commentId, commentLikes}){

    const myUser = useSelector(selectMyUser);
    const [ isLiked, setIsLiked ] = useState(false);
  
    useEffect(() => {
        const bool =  commentLikes?.some(like => like.userId === myUser.id);
        setIsLiked(bool);
    }, 
    [commentLikes]);
    

    console.log(isLiked)


    const [ showCreateComment, setShowCreateComment ] = useState(false);
    const toggleCreateComment = () => {
        setShowCreateComment(!showCreateComment);
    }


    return(
        <div className="comment-footer">
            <div className="comment-footer-btns">
                <p onClick={toggleCreateComment} className='footer-btn'>Reply</p>
                <CommentLike  commentId={commentId} isLiked={isLiked}/>
            </div>
           
            {showCreateComment && <CreateComment postId={postId} parentId={parentId} />}
        </div>
    )

}