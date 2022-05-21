import React from 'react'
import { Box } from '@mui/material'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { styled } from '@mui/material/styles';

const LeftBarBlock = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 0 0 0'
}));

const LeftBarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    color: 'rgba(0,0,0, 0.7)',
    margin: '0 0 10px 0',
    padding: '10px',
    width: '75%',
    transition: '0.2s',
    borderRadius: '7.5px',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#F1F1F1'
    }
}));

const LeftBar = () => {
    return (
        <LeftBarBlock>
            <LeftBarItem> 
                <AccessTimeFilledIcon/> 
                Recent
            </LeftBarItem>
            <LeftBarItem>
                <BookmarksIcon/>
                Bookmarks
            </LeftBarItem>
            <LeftBarItem>
                <SubscriptionsIcon/>
                Subscribes
            </LeftBarItem>
        </LeftBarBlock>
    )
}

export default LeftBar