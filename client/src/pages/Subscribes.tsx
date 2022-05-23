import React, { FC } from 'react'
import { 
    Card, CardActions, CardContent,
    CardMedia, Button, Typography,
    Avatar, Menu, MenuItem, Box,
    TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';


import PersonAddIcon from '@mui/icons-material/PersonAdd';

const SubsItem = styled(Box)(({ theme }) => ({
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '15px 0 15px 0',
}));

const ClickToFollow = styled(Box)(({ theme }) => ({
    display: 'flex', 
    border: '1.5px solid lightgray',
    padding: '5px 10px',
    borderRadius: '7.5px',
    cursor: 'pointer',
    transition: '0.2s',
    "&:hover": {
        boxShadow: `0 0 2px ${theme.palette.primary.main}`,

    }
}));

const Subscribes: FC = () => {
    return (
        <Box>
            <SubsItem>
                <Box sx={{ display: 'flex', flexBasis: '70%' }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Box sx={{ ml: 1, overflow: 'hidden' }}>
                        <Typography variant='h5'>Opinion</Typography>
                        <Typography variant='body2'>Обсуждения, дискуссии, точки зрения на события и тренды</Typography>
                    </Box>
                </Box>
                <ClickToFollow>
                    <PersonAddIcon/>
                    <Typography  sx={{ m: '0 10px' }}>Follow</Typography>
                </ClickToFollow>
            </SubsItem>
        </Box>
    )
}

export default Subscribes