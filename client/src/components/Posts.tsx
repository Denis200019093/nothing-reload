import React, { useEffect, Suspense, useState, useCallback, FC } from 'react'
import { Box } from '@mui/material'

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { getPosts } from '../redux/actions/postsAction';
import { IPost } from '../models/IPost';
import SkeletonLoading from './Skeleton';
import Spinner from './Spinner';
const PostItem = React.lazy(() => import('./PostItem'));

const Posts: FC = () => {

    const dispatch = useAppDispatch()
    const { posts, isCreateModal } = useTypedSelector(state => state.posts)

    const [ fetching, setFetching ] = useState(true)
    const [ page, setLimit ] = useState(0)
    
    useEffect(() => {
        setFetching(false)
        if ( posts.length % 10 !== 0 ) return

        if ( fetching ) {
            dispatch(getPosts(page))
        }
        setFetching(false)
	}, [page, fetching, dispatch, posts.length])

    useEffect(() => {
        const scrollHadler = (e: any) => {

            if ( e.target.documentElement.scrollHeight - 
                ( e.target.documentElement.scrollTop + window.innerHeight ) < 1) {
                setLimit(prev => prev + 1)
                setFetching(true)
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
            <>
                {fetching ?
                    <Spinner/>
                    : null    
                }
            </>
        </Box>
    )
}

export default Posts