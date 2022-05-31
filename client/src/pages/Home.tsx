import React, { FC, useState } from 'react'
import { 
    Button, Box, TextField, Grid
} from '@mui/material';

import { useAppDispatch } from '../hooks/useTypedSelector';
import Posts from '../components/Posts';
import { createPostAsync } from '../redux/actions/postsAction';

const Home: FC = () => {

    const dispatch = useAppDispatch()

    const [ title, setTitle ] = useState<string>('')
    const [ content, setContent ] = useState<string>('')

    return (
        <Grid item md={12} sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
             
             <TextField
                name='title'
                placeholder='title'
                variant='outlined'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                name='content'
                placeholder='content'
                variant='outlined'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={() => dispatch(createPostAsync({ title, content }))}>Create post</Button> 
            
            <Posts/>
        </Grid>
        
    )
}

export default Home