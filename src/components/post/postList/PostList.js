import { useQuery } from "react-query";
import { useEffect } from "react";
import Post from "./../Post";
import { useDispatch} from 'react-redux';
import { setMyUserPosts } from "../../../features/myUserSlice";

export default function PostList({ authorId }) {

    const dispatch = useDispatch();
   
    const getUserPosts = async () => {
        if (!authorId) return console.log('No authorId');
        try {
            const res = await fetch(`http://localhost:8030/post/user/${authorId}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) {
                throw new Error('Could not fetch user posts');
            }
            const data = await res.json();
            return data; // Return the fetched data
        } catch (error) {
            console.log(error.message);
            throw error; // Re-throw the error to trigger isError
        }
    }

    const { data, isLoading, isError, error, refetch } = useQuery(['userPosts', authorId], getUserPosts);
    const postList = data?.posts?.map((post) => (
        <Post
            post= {post}
            key={post.id}
        />
    ));

    return (
        <>  
            {postList}
        </>
    )
}

