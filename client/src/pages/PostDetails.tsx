import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, TextareaAutosize, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SortIcon from '@mui/icons-material/Sort';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { getPostDetails, createCommentAsync } from '../redux/reducers/posts';

import { CardActionsItem, Arrows } from '../components/PostItem'

const CommentsBlock = styled(Box)(({ theme }) => ({
	display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '10px',
    background: '#fff',
    borderRadius: '7.5px',
    padding: '10px',
}));

const ActiveBlock = styled(Box)(({ theme }) => ({
	padding: '10px 10px 10px 20px',
    borderRadius: '7.5px',
    flexBasis: '90%',
    backgroundColor: 'lightgray',
    color: 'gray',
    cursor: 'pointer',
    transition: '0.2s',
    margin: '25px 0',
    '&:hover': {
        boxShadow: '0 0 4px #000'
    }
}));

const FlexBlocks = styled(Box)(({ theme }) => ({
	display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
}));

const TextArea = styled(TextareaAutosize)(({ theme }) => ({
    maxWidth: '100%',
    minWidth: '100%',
    minHeight: '150px',
    maxHeight: '350px',
    outline: 'none',
    resize: 'none',
    borderRadius: '7.5px',
    boxShadow: `0px 0px 2.5px 1px ${theme.palette.primary.main}`,
    border: `2px solid ${theme.palette.primary.main}`,
    padding: '7.5px',
    margin: '10px 0 0 0',
    fontWeight: 500,
    fontSize: '16px'
}));

const PostDetails = () => {

    const dispatch = useAppDispatch()
    const { postDetails } = useTypedSelector(state => state.posts)
    const { id } = useParams()

    const [ active, setActive ] = useState<boolean>(false)
    const [ text, setText ] = useState<string>('')

    useEffect(() => {
        dispatch(getPostDetails(id))
    }, [dispatch, id])
    console.log(postDetails);
    
    return (
        <Box sx={{ pl: 3, pr: 3 }}>
            <Box sx={{ background: '#fff', width: '100%', p: '10px', borderRadius: '7.5px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography sx={{ ml: 1 }}>Nothing</Typography>
                </Box>
                <Typography sx={{ p: '15px 0' }} variant='h4'>{postDetails.title}</Typography>
                <Typography variant='body2'>{postDetails.content}</Typography>
                <FlexBlocks sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex' }}>
                        <CardActionsItem sx={{ pl :0 }}>
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
                </FlexBlocks>
            </Box>
            <CommentsBlock>
                <FlexBlocks>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h5'>21</Typography>
                        <Typography sx={{ ml: 1 }} variant='h5'>comments</Typography>
                    </Box>
                    <SortIcon/>
                </FlexBlocks>
                <Box>
                    {active ? 
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <TextArea
                                placeholder='Text...'
                                value={text}
                                onChange={e => setText(e.target.value)}
                            /> 
                            <Button 
                                onClick={() => dispatch(createCommentAsync({text, id}))} 
                                sx={{ mt: 1, color: '#fff' }} 
                                variant='contained'>
                                Create
                            </Button>
                        </Box>
                        :
                        <ActiveBlock onClick={() => setActive(true)}>Comment text...</ActiveBlock>
                    }
                </Box>
                
                <Box sx={{ backgroundColor: '#F1F1F1', p: 1, borderRadius: '7.5px', mb: 2, mt: 3 }}>
                    <FlexBlocks sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Typography sx={{ ml: 1 }}>Nothing</Typography>
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
                    </FlexBlocks>
                    <Typography>До появления Человека-паука в 1960-х подростки в комиксах о супергероях обычно были всего лишь их помощниками. </Typography>
                </Box>
                <Box sx={{ backgroundColor: '#F1F1F1', p: 1, borderRadius: '7.5px' }}>
                    <FlexBlocks sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Typography sx={{ ml: 1 }}>Chill Pavuk</Typography>
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
                    </FlexBlocks>
                    <Typography>Marvel выпустила множество серий комиксов о Человеке-пауке. Самая первая из них — The Amazing Spider-Man (рус. Удивительный Человек-паук), </Typography>
                </Box>
            </CommentsBlock>
        </Box>
    )
}

export default PostDetails