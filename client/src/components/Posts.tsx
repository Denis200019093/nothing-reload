import React, { useEffect, Suspense } from 'react'
import { Box, Skeleton  } from '@mui/material'

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
                <Suspense fallback={<Skeleton animation="wave" variant="circular" width={40} height={40} />}>
                    <PostItem
                        key={index}
                        item={item}
                    />

                </Suspense>
            ))}
        </Box>
    )
}

export default Posts