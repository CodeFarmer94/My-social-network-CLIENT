import './commentList.css'
import Comment from '../Comment';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { setPostComments } from '../../../features/myUserSlice';
import { useDispatch } from 'react-redux';


export default function CommentList({  postId }) {
    
    const [ showAllComments, setShowAllComments ] = useState(false);
    const dispatch = useDispatch();
    const getComments = async () => {
        try{
            const res = await fetch( `http://localhost:8030/comment/post/${postId}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                throw new Error('Could not fetch comments');
            }
         
            const data = await res.json();
            console.log(data)
            return data; 

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // Refetch if postId changes
    const { data, isLoading, isError, error } = useQuery(['postComments', postId], getComments);

    function recursiveComments(comments, parentId) {
        const tree = [];
        if(!comments) return tree;
        comments.forEach(comment => {
            if (comment.parentId === parentId) {
                const children = recursiveComments(comments, comment.id);
                if (children.length > 0) {
                    comment.children = children;
                }
                tree.push(comment);
            }
        });
        return tree;
    }
    
    const treeList = recursiveComments(data, null)
    
    const list = showAllComments ? treeList : treeList?.slice(0, 1);
    const commentList =  list?.map((comment) => (
        <Comment
            key={comment.id}
            comment = {comment}
            
        />
    ));
  
    
    if (isLoading) return ( <div>Loading</div>)

    return (
        <div className='comment-list'> 
         <p className='show-more' onClick= {()=> setShowAllComments(prev=> !prev)}>Show  {showAllComments ? "less" : "more"} comments...</p>
            {commentList}
        </div>
    )
}