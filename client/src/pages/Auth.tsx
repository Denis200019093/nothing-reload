import { Box, Button, TextField } from '@mui/material'
import React, { FC, useState } from 'react'
// import { useActions } from '../hooks/useActions'

const Auth: FC = () => {

    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    // const { login } = useActions()

    return (
        <Box>
            <TextField
                name='username'
                variant='outlined'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                name='password'
                variant='outlined'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Button onClick={() => login({ username, password })}>Login</Button> */}
        </Box>
    )
}

export default Auth