import React, { useState, ChangeEvent } from 'react'
import { 
    Button, Box, TextField,
    Dialog, DialogTitle,
    DialogContent, DialogActions,
    Switch 
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { closeModal, loginAsync, registrationAsync } from '../redux/reducers/auth';

import logo from '../assets/third.png'

const Image = styled('img')(() => ({
    maxWidth: '400px',
    objectFit: 'cover'
}));

const Logo = styled('img')(() => ({
    maxWidth: '125px'
}));

const ModalContent = styled(DialogContent)(() => ({
    display: 'flex', 
    flexDirection: 'column',
    paddingTop: '10px'
}));

const DialogHeader = styled(Box)(() => ({
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    background: '#00C9A7', 
    padding: '15px',
}));

const ModalAuthBlock = styled(Box)(() => ({
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between',
    width: '100%',
    'div': {
        margin: '0 0 10px 0'
    },
    'button': {
        width: '50%',
        color: "#fff"
    }
}));

interface IValues {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
}

const Auth = () => {

    const dispatch = useAppDispatch()
    const { openModal } = useTypedSelector(state => state.auth)

    const [ logimForm, setLoginForm ] = useState<boolean>(true);
    const [ values, setValues ] = useState<IValues>(initialValues);
    const { username, password } = values

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };
    
    return (
        <Box>
            <Dialog
                open={openModal}
                onClose={() => dispatch(closeModal())}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='md'
                fullWidth
            >
                <Box sx={{ display: 'flex', minHeight: '550px' }}>
                    <Image src='https://zoodrug.ru/images/users/2/2-1483860247.jpg' alt='alt'/>
                    <ModalAuthBlock>
                        <DialogTitle sx={{ p: 0, mb: 3 }} id="alert-dialog-title">
                            <DialogHeader>
                                <Logo src={logo} alt='Logo'/>
                                <Switch 
                                    color="default"
                                    value={logimForm}
                                    onChange={() => setLoginForm(prev => prev = !logimForm)}
                                />
                            </DialogHeader>
                        </DialogTitle>
                        
                        <ModalContent>
                            <TextField
                                name='username'
                                label='Username'
                                placeholder='Username'
                                variant='outlined'
                                fullWidth
                                value={values.username}
                                onChange={handleInputChange}
                            />
                            {logimForm ? null :
                                <TextField
                                    name='email'
                                    label='Email'
                                    placeholder='Email'
                                    variant='outlined'
                                    fullWidth
                                    value={values.email}
                                    onChange={handleInputChange}
                                />
                            }
                            
                            <TextField
                                name='password'
                                label='Password'
                                placeholder='password'
                                type='Password'
                                variant='outlined'
                                fullWidth
                                value={values.password}
                                onChange={handleInputChange}
                            />
                            {logimForm ? null :
                                <TextField
                                    name='passwordconfirm'
                                    label='Password Confirm'
                                    placeholder='Password Confirm'
                                    type='password'
                                    variant='outlined'
                                    fullWidth
                                    value={values.passwordConfirm}
                                    onChange={handleInputChange}
                                />
                            }
                        </ModalContent>
                        <DialogActions>
                            {logimForm ?
                                <Button 
                                    variant='contained' 
                                    onClick={() => dispatch(loginAsync({ username, password }))}>Log in</Button
                                >
                            :
                                <Button 
                                    variant='contained' 
                                    onClick={() => dispatch(registrationAsync(values))}>Sign up</Button
                                >
                            }
                        </DialogActions>

                    </ModalAuthBlock>
                </Box>
            </Dialog>
        </Box>
    )
}

export default Auth