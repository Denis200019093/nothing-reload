import React, { } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { styled } from '@mui/material/styles';
import { useLocation } from "react-router-dom"

const LeftBarBlock = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 0 0 0',
}));

const LeftBarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    color: 'rgba(0,0,0, 0.7)',
    margin: '0 0 10px 0',
    padding: '10px',
    flexBasis: '75%',
    transition: '0.2s',
    borderRadius: '7.5px',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
        
    }
}));

const LinkPage = styled(Link)(({ theme }) => ({
    textDecoration: 'none'
}));

const LeftBar = () => {

    const { pathname } = useLocation()
    
    return (
        <LeftBarBlock>
            {['Recent', 'Bookmarks', 'Subscribes'].map(item => (
                <LinkPage key={item} to={`/${item.toLowerCase()}`}>
                    <LeftBarItem 
                    sx={{ 
                        background: item.toLowerCase() === 
                        pathname.slice(1) ? '#00C9A7' : '' ,
                        "&:hover": {
                            backgroundColor: item.toLowerCase() === 
                            pathname.slice(1) ? '' : '#F1F1F1'
                        }
                    }}> 
                        <AccessTimeFilledIcon/> 
                        <Typography sx={{ ml: 1 }}>{item}</Typography>
                    </LeftBarItem>
                </LinkPage>
            ))}
        </LeftBarBlock>
    )
}

export default LeftBar