import './postLike.css'
import { AiOutlineLike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { selectMyUser } from '../../../features/myUserSlice';
import { useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';
export default function PostLike({ postLikes, postId }) {
    
    const queryClient = useQueryClient();
    const myUser = useSelector(selectMyUser);
    const myUserId = myUser.id;
    const [isLiked, setIsLiked] = useState(false);
    
    useEffect(() => {
        const bool = postLikes?.some(like => like.userId === myUserId);
        setIsLiked(bool);
    }, [postLikes]);

    const addLikePost = async () => {
        try {
            const res = await fetch(`http://localhost:8030/post/like/${postId}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                throw new Error('Could not like post');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    const removeLikePost = async () => {
        try {
            const res = await fetch(`http://localhost:8030/post/like/${postId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }); 
            if (!res.ok) {
                throw new Error('Could not remove like from post');
            }   
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    const { mutate: mutateAddLike, isLoading, isError, error } = useMutation({ mutationFn: addLikePost, onSuccess: () => {
        queryClient.invalidateQueries('userPosts')
    }
    });
    const { mutate: mutateRemoveLike } = useMutation({ mutationFn: removeLikePost, onSuccess: () => {
        queryClient.invalidateQueries('userPosts')
    }
    });

    const handleLikeButtonClick = () => {
        if (isLiked) {
            mutateRemoveLike();
        } else {
            mutateAddLike();
        }
    }

    
    return (
        <>
           { isLiked ? 
           <button className="like-btn liked" onClick={handleLikeButtonClick}>
                <AiFillLike className='post-icon'/>
                        Like
            </button> : 
             <button className="like-btn" onClick={handleLikeButtonClick}>
                <AiOutlineLike className='post-icon'/>
                        Like
            </button>}
        </>
     )
}