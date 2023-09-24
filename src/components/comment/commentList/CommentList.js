import './commentList.css'
import Comment from '../Comment';
import { useState } from 'react';


export default function CommentList({ comments}) {
    
    const [ showAllComments, setShowAllComments ] = useState(false);


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
    
    const treeList = recursiveComments(comments, null)
    
    const list = showAllComments ? treeList : treeList?.slice(0, 1);
    const commentList =  list?.map((comment) => (
        <Comment
            key={comment.id}
            comment = {comment}
            
        />
    ));
  
    
   

    return (
        <div className='comment-list'> 
    
         <p className='show-more' onClick= {()=> setShowAllComments(prev=> !prev)}>Show  {showAllComments ? "less" : "more"} comments...</p>
            {commentList}
        </div>
    )
}