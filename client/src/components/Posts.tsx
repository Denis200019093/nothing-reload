import React, { useEffect } from 'react'
import { Box } from '@mui/material'

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { getPosts } from '../redux/reducers/posts';
import PostItem from './PostItem';
import { IPost } from '../models/IPost';

const Posts = () => {

    const dispatch = useAppDispatch()
    const { posts } = useTypedSelector(state => state.posts)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])    

    return (
        <Box>            
            {posts && posts.map((item: IPost, index: number) => (
                <PostItem
                    key={index}
                    item={item}
                />
            ))}
        </Box>
    )
}

export default Posts