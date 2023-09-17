import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQueryClient } from "react-query";
import { IoSend } from 'react-icons/io5'
import { useState, useEffect, useRef } from "react";
import './createComment.css'
export default function CreateComment({postId, parentId}){

    const [ showCommentPosted, setShowCommentPosted ] = useState(false);
    const [ showCreateComment, setShowCreateComment ] = useState(false); 
    const queryClient = useQueryClient();
    const schema = yup.object().shape({
        content: yup.string().required(),
    });

   
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });



    const createComment = async (data) => {
        data.postId = postId;
        data.parentId = parentId;
        try {
            const res = await fetch('http://localhost:8030/comment', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error('Could not create comment');
            }
            const comment = await res.json();
            return comment; // Return the fetched data
        } catch (error) {
            console.log(error.message);
        } 
    }
    const { mutate, isLoading, isError, error } = useMutation({mutationFn: createComment, onSuccess: () => {
        queryClient.invalidateQueries('postComments');
        reset();
        setShowCommentPosted(true);
        setTimeout(() => {
            setShowCommentPosted(false);
        }, 3000);
    }});
    const onSubmit = (data) => {
        console.log(data)
        mutate(data);
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
           <div className="comment-form">
                <header>
                    <input
                        name="content"
                        type="text"
                        placeholder={ showCommentPosted ? 'Comment posted!' : 'Write a comment...'}
                        {...register("content")}
                        autoFocus
                        
                    />
                    <button type="submit">{<IoSend/>}</button>
                    {errors.content && <p>{errors.content.message}</p>}
                </header>
                <div className="post-form-footer">
                </div>  
            </div>
        </form>
    )
}