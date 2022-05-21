import React, { FC, useState, MouseEvent, useEffect } from 'react'
import { 
    Card, CardActions, CardContent,
    CardMedia, Button, Typography,
    Avatar, Menu, MenuItem, Box,
    TextField
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// import { getPosts } from '../redux/actions/postActions'
import { useDispatch } from 'react-redux';
import { useGetPostsQuery, useCreatePostMutation } from '../redux/actions/posts.api';
import { IPost } from './../models/IPost';

const CardActionsItem = styled(Box)(({ theme }) => ({
    display: 'flex', 
    alignItems: 'center',
    padding: '10px',
    transition: '0.2s',
    cursor: 'pointer',
    '&:hover': {
        color: theme.palette.primary.main
    },
    'p': {
        padding: '0 0 0 5px'
    }
}));

const Arrows = styled(Box)(({ theme }) => ({
    cursor: 'pointer', 
    borderRadius: '50%', 
    'svg': {
        fontSize: '35px'     
    },
    '&:hover': {
        color: theme.palette.primary.main,
        "&:last-child": {
            color: 'red'
        }
    },
}));

const Home: FC = () => {

    const { data, isLoading, error } = useGetPostsQuery(5)
    const [ createPost, {} ] = useCreatePostMutation()

    const [ title, setTitle ] = useState<string>('')
    const [ description, setDescription ] = useState<string>('')

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleCreatePost = async () => {
        await createPost({ title, description } as IPost)
    }
    

    return (
        <Box sx={{ mt: 3 }}>
            <Box>
                <TextField
                    name='title'
                    variant='outlined'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    name='description'
                    variant='outlined'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleCreatePost}>Login</Button>
            </Box>
            <Box>
                {data?.map(item => (
                    <Typography>{item.title}</Typography>
                ))}
            </Box>

            <Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Typography sx={{ ml: 1 }} variant="h5" component="div">Username</Typography>
                    </Box>
                    
                    <Box>
                        <Button
                            onClick={handleClick}
                        >
                            <MoreHorizIcon/>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                        </Menu>
                    </Box>
                </Box>

                <CardContent sx={{ p: 2 }}>
                    <Typography sx={{ fontWeight: 700, mb: 0.5 }} gutterBottom variant="h4" component="div">
                        Lizard
                    </Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: '17px' }} variant="body2">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image="https://moya-planeta.ru/upload/images/xl/8a/f9/8af9f511d3063499b29bd543b0ac5ea3.jpg"
                    alt="green iguana"
                />
                <CardActions sx={{ p: 2 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex' }}>
                            <CardActionsItem>
                                <ChatBubbleOutlineIcon/>
                                <Typography variant="body2">244</Typography>
                            </CardActionsItem>
                            <CardActionsItem>
                                <BookmarkBorderIcon/>
                            </CardActionsItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Arrows>
                                <KeyboardArrowUpIcon/>
                            </Arrows>
                            <Typography sx={{ pl: 1, pr: 1 }}>0</Typography>
                            <Arrows>
                                <KeyboardArrowDownIcon/>
                            </Arrows>
                        </Box>
                    </Box>
                </CardActions>
            </Card>
        </Box>
        
    )
}

export default Home