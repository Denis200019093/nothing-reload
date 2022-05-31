import React, { useEffect, Suspense, useState } from 'react'
import { Box } from '@mui/material'

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { getPosts } from '../redux/actions/postsAction';
import { IPost } from '../models/IPost';
import SkeletonLoading from './Skeleton';
const PostItem = React.lazy(() => import('./PostItem'));

const Posts = () => {

    const dispatch = useAppDispatch()
    const { posts, isLoading } = useTypedSelector(state => state.posts)

    const [ page, setPage ] = useState<number>(0)   
    const [ fetching, setFetching ] = useState(true)

    useEffect(() => {
        if ( fetching ) {
            dispatch(getPosts(page))
        }
        setFetching(false)
	}, [fetching, dispatch, page])
   

    useEffect(() => { 
        const scrollHadler = (e: any) => {

            if ( e.target.documentElement.scrollHeight - 
                ( e.target.documentElement.scrollTop + window.innerHeight ) < 1) {
                setFetching(true)
                setPage(prev => prev + 1)
            }
        }

        document.addEventListener('scroll', scrollHadler)
        
        return function() {   
            document.removeEventListener('scroll', scrollHadler)
        }
    }, [])
    
    
    return (
        <Box sx={{ width: '60%' }}>            
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