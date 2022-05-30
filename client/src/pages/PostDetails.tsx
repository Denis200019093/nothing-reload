import React, { useEffect, useState, Suspense } from 'react'
import { useParams } from 'react-router-dom';

import { Box, Typography, Avatar, TextareaAutosize, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import SortIcon from '@mui/icons-material/Sort';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';

import { CardActionsItem, Arrows } from '../components/PostItem'
import CommentItem from '../components/CommentItem';
import { IComment } from '../models/IPost';
import { likeAsync, dislikeAsync, getPostDetails, createCommentAsync } from '../redux/actions/postsAction'
import Spinner from '../components/Spinner';
const Comments = React.lazy(() => import('../components/Comments'));


const CommentsBlock = styled(Box)(({ theme }) => ({
	display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '10px',
    background: 'rgb(50,50,50)',
    borderRadius: '7.5px',
    padding: '15px',
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
    const { postDetails, isLoading } = useTypedSelector(state => state.posts)
    const { id } = useParams()

    const [ active, setActive ] = useState<boolean>(false)
    const [ text, setText ] = useState<string>('')

    useEffect(() => {
        dispatch(getPostDetails(id))
    }, [dispatch, id])
    
    return (
        <Grid item md={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center', color: 'rgba(255,255,255,0.8)' }}>
            <Box sx={{ minWidth: '65%' }}>
                <Box sx={{ background: 'rgb(50,50,50)', width: '100%', p: '15px', borderRadius: '7.5px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Typography sx={{ ml: 1 }}>Nothing</Typography>
                    </Box>
                    <Typography sx={{ p: '15px 0' }} variant='h4'>{postDetails?.title}</Typography>
                    <Typography variant='body2'>{postDetails?.content}</Typography>
                    <FlexBlocks sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex' }}>
                            <CardActionsItem sx={{ pl :0 }}>
                                <ChatBubbleOutlineIcon/>
                                <Typography variant="body2">{postDetails?.comments?.length}</Typography>
                            </CardActionsItem>
                            <CardActionsItem>
                                <BookmarkBorderIcon/>
                            </CardActionsItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Arrows onClick={() => dispatch(likeAsync(postDetails.id))}>
                                <KeyboardArrowUpIcon/>
                            </Arrows>
                            <Typography sx={{ pl: 1, pr: 1 }}>{postDetails?.rate?.rating}</Typography>
                            <Arrows onClick={() => dispatch(dislikeAsync(postDetails.id))}>
                                <KeyboardArrowDownIcon/>
                            </Arrows>
                        </Box>
                    </FlexBlocks>
                </Box>
                <CommentsBlock>
                    <Box sx={{ width: '85%' }}>
                        <FlexBlocks>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h5'>{postDetails?.comments?.length}</Typography>
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
                                        onClick={() => {
                                            dispatch(createCommentAsync({text, id}))
                                            setText('')
                                        }} 
                                        disabled={!text}
                                        sx={{ mt: 1, color: '#fff' }} 
                                        variant='contained'>
                                        Create
                                    </Button>
                                </Box>
                                :
                                <ActiveBlock onClick={() => setActive(true)}>Comment text...</ActiveBlock>
                            }
                        </Box>
                        <Box sx={{ mt: 3, mb: 1 }}>{isLoading ? <Spinner/> : null}</Box>
                        <Suspense fallback={<Spinner/>}>
                            <Comments comments={postDetails?.comments}/>
                        </Suspense>
                    </Box>
                </CommentsBlock>
            </Box>
        </Grid>
    )
}

export default PostDetails