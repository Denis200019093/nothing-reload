import React, { useEffect, Suspense } from 'react'
import { Box } from '@mui/material'

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { getPosts } from '../redux/reducers/posts';
import { IPost } from '../models/IPost';
import SkeletonLoading from './Skeleton';
const PostItem = React.lazy(() => import('./PostItem'));

const Posts = () => {

    const dispatch = useAppDispatch()
    const { posts } = useTypedSelector(state => state.posts)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])    
    
    return (
        <Box>            
            {posts && posts.map((item: IPost, index: number) => (
                <Suspense key={index} fallback={<SkeletonLoading/>}>
                    <PostItem
                        item={item}
                    />
                </Suspense>
            ))}
        </Box>
    )
}

export default Posts