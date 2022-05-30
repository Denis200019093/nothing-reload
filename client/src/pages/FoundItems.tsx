import React from 'react'
import { Box, Typography, Avatar, TextareaAutosize, Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';

const FoundItems = () => {

    const dispatch = useAppDispatch()
    const { foundItems } = useTypedSelector(state => state.posts)
    console.log(foundItems);
    
    return (
        <Box>
            <Box>
                Search name
            </Box>
        </Box>
    )
}

export default FoundItems