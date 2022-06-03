import React, { FC, useState } from 'react'
import { 
    Button, TextField, Grid, Box, TextareaAutosize,
    Collapse
} from '@mui/material';

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import Posts from '../components/Posts';
import { createPostAsync } from '../redux/actions/postsAction';

const Home: FC = () => {

    const dispatch = useAppDispatch()
    const { isCreateModal } = useTypedSelector(state => state.posts)

    const [ title, setTitle ] = useState<string>('')
    const [ content, setContent ] = useState<string>('')
    
    return (
        <Grid item md={12} sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <Collapse sx={{ width: '50%' }} in={isCreateModal}>
                <Box 
                    sx={{ 
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        
                    }}>
                        <TextField
                            name='title'
                            placeholder='title'
                            variant='outlined'
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextareaAutosize
                            name='content'
                            placeholder='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Button onClick={() => dispatch(createPostAsync({ title, content }))}>Create post</Button>
                    </Box>
                </Collapse>
            <Posts/>
        </Grid>
        
    )
}

export default Home