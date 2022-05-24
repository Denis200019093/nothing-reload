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
                    placeholder='Username'
                    variant='outlined'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    name='email'
                    placeholder='Email'
                    variant='outlined'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    name='password'
                    placeholder='password'
                    type='Password'
                    variant='outlined'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    name='passwordconfirm'
                    placeholder='Password Confirm'
                    type='password'
                    variant='outlined'
                    value={passwordConfirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />

                <Button onClick={() => dispatch(loginAsync({ username, password }))}>Login</Button>
                <Button onClick={() => dispatch(registrationAsync({ username, email, password, passwordConfirm }))}>Registraation</Button>
            </Box>
            <Posts/>
        </Box>
        
    )
}

export default Home