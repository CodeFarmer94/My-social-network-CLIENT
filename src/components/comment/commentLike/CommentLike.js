import { useMutation } from "react-query"
import './commentLike.css'
import { FaHeart } from 'react-icons/fa'
import { useQueryClient } from "react-query"

export default function CommentLike ({ commentId, isLiked }) {
    const queryClient = useQueryClient();
    const addLikeComment = async () => {
        try{
            const res = await fetch( `http://localhost:8030/comment/like/${commentId}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                throw new Error('Could not like comment');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    const removeLikeComment = async () => { 
        try{
            const res = await fetch( `http://localhost:8030/comment/like/${commentId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) {
                throw new Error('Could not remove like from comment');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


    const { mutate: mutateAddLike, isLoading, isError, error } = useMutation({mutationFn: addLikeComment, onSuccess: () => {
        queryClient.invalidateQueries('userPosts')}
    });
    const { mutate: mutateRemoveLike } = useMutation({mutationFn: removeLikeComment, onSuccess: () => {
        queryClient.invalidateQueries('userPosts')}
    });
    const toogleLike = () => {
        isLiked ? mutateRemoveLike() : mutateAddLike();
    }

    return(
        <div>
            { isLiked ?
                <p className="footer-btn liked" onClick={toogleLike}><span><FaHeart/></span>Like</p>
                : 
                <p className="footer-btn" onClick={toogleLike}>Like</p>
            }
                
        </div>
    )
}