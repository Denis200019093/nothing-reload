import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { Box, Typography } from '@mui/material';
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { searching } from '../redux/actions/postsAction';
import PostItem from '../components/PostItem';

const HeaderFoundItems = styled(Box)(() => ({
    padding: '15px',
    borderRadius: '0 0 7.5px 7.5px',
    backgroundColor: '#fff'
}));

const FoundItems = () => {

    let { search } = useLocation();
    const dispatch = useAppDispatch()
    const { foundItems } = useTypedSelector(state => state.posts)

    const sliceSearch = search.slice(7)
    useEffect(() => {
        dispatch(searching(sliceSearch))
    }, [dispatch, sliceSearch])    
    
    return (
        <Box>
            <HeaderFoundItems>
                <Typography variant='h4'>{sliceSearch}</Typography>
                <Typography variant='body2'>Найдено {foundItems.length} результатов</Typography>
            </HeaderFoundItems>
            <Box>
                {foundItems && foundItems.map((item, index) => (
                    <PostItem
                        key={index}
                        item={item}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default FoundItems