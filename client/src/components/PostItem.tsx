import React, { useState, MouseEvent, FC } from 'react'
import { Link } from 'react-router-dom'
import { 
    Card, CardActions, CardContent,
    CardMedia, Button, Typography,
    Avatar, Menu, MenuItem, Box,
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { IPost } from './../models/IPost';
import { IUser } from '../models/IUser';
import { styled, alpha } from '@mui/material/styles';
import { likeAsync, dislikeAsync } from '../redux/actions/postsAction';
import { useAppDispatch, useTypedSelector, } from '../hooks/useTypedSelector';


export const CardItem = styled(Card)(({ theme }) => ({
    margin: '16px 0 30px 0',
    background: 'linear-gradient(to right, #516395, #614385)', 
    boxShadow: '0px 0px 7px 0.1px #000000',
    color: 'rgba(255,255,255,0.85)',
    'a': {
        color: 'rgba(255,255,255,0.85)',
        '&:hover': {
            color: theme.palette.primary.main,
        }
    }
}));

export const CardActionsItem = styled(Box)(({ theme }) => ({
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

export const Arrows = styled(Box)(({ theme }) => ({
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

interface IProps {
    item: IPost
}

const PostItem: FC<IProps> = ({ item }) => {
    
    const dispatch = useAppDispatch()
    const { authUser } = useTypedSelector(state => state.auth)
    const [ anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <CardItem>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Link to={`/user/${item.author.id}`}>
                        <Typography sx={{ ml: 1 }} variant="h5" component="div">{item.author.username}</Typography>
                    </Link>
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
                <Link to={`/posts/${item.id}`}>
                    <Typography sx={{ fontWeight: 700, mb: 0.5 }} gutterBottom variant="h4" component="div">
                        {item.title}
                    </Typography>
                </Link>
                
                <Typography sx={{ fontWeight: 500, fontSize: '17px' }} variant="body2">
                    {item.content}
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
                            <Link to={`/posts/${item.id}`}>
                                <CardActionsItem>
                                    <ChatBubbleOutlineIcon/>
                                    <Typography variant="body2">{item.comments?.length}</Typography>
                                </CardActionsItem>
                            </Link>
                        <CardActionsItem>
                            <BookmarkBorderIcon/>
                        </CardActionsItem>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Arrows 
                            sx={{ color: item.rate.userLiked ? '#00C9A7' : '' }} 
                            onClick={() => {
                                dispatch(likeAsync(item.id))
                            }}>
                            <KeyboardArrowUpIcon />
                        </Arrows>
                    
                        <Typography sx={{ pl: 1, pr: 1 }}>{item.rate.rating}</Typography>

                        <Arrows 
                            sx={{ color: item.rate.userDisliked ? 'red' : '' }}  
                            onClick={() => dispatch(dislikeAsync(item.id))}>
                            <KeyboardArrowDownIcon/>
                        </Arrows>
                    </Box>
                </Box>
            </CardActions>
        </CardItem>
    )
}

export default PostItem