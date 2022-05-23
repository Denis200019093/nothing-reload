import React, { FC, useState } from 'react'
import { 
    Button, Box, TextField
} from '@mui/material';

import { loginAsync, registrationAsync } from '../redux/reducers/auth';
import { useAppDispatch } from '../hooks/useTypedSelector';
import Posts from '../components/Posts';
import { createPostAsync } from '../redux/reducers/posts';

const Home: FC = () => {

    const dispatch = useAppDispatch()

    const [ username, setUsername ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ passwordConfirm, setConfirm ] = useState<string>('')


    const [ title, setTitle ] = useState<string>('')
    const [ content, setContent ] = useState<string>('')

    return (
        <Box sx={{ mt: 3 }}>
            {/* <Box> */}
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
            <Box>
                <TextField
                    name='username'
                    placeholder='username'
                    variant='outlined'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    name='password'
                    placeholder='password'
                    variant='outlined'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={() => dispatch(loginAsync({ username, password }))}>Login</Button>
            </Box>
            <Posts/>
        </Box>
        
    )
}

export default Home