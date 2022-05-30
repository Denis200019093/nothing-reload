import React, { useState } from 'react'
import { 
    Button, Box, TextField,
    Dialog, DialogTitle,
    DialogContent, DialogActions,
    Switch, Typography
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { styled } from '@mui/material/styles';

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { closeModal, loginAsync, registrationAsync } from '../redux/reducers/auth';

import logo from '../assets/third.png'

const Image = styled('img')(() => ({
    maxWidth: '300px',
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
    name: string;
}

const Auth = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { openModal } = useTypedSelector(state => state.auth)

    const [ logimForm, setLoginForm ] = useState<boolean>(true);

    const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IValues>({
		mode: 'onChange',
	})

    const submit: SubmitHandler<IValues> = data => {
        const { username, email, password, passwordConfirm } = data
        
        if ( logimForm ) {
            dispatch(loginAsync({ username, password }))
        } else {
            dispatch(registrationAsync({ username, email, password, passwordConfirm }))
        }
        dispatch(closeModal())
        reset()

        return navigate('/')
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
                                    onChange={() => {
                                        setLoginForm(prev => prev = !logimForm)
                                        reset()
                                    }}
                                />
                            </DialogHeader>
                        </DialogTitle>
                        
                        <ModalContent>
                            <form onSubmit={handleSubmit(submit)}>
                                <TextField
                                    {...register('username', {
                                        required: 'Username is required'
                                    })}
                                    placeholder='Username'
                                    variant="outlined"				
                                />
                                {errors?.username && (
                                    <div style={{ color: 'red' }}>{errors?.username?.message}</div>
                                )}
                                {!logimForm ? 
                                    <Box>
                                        <TextField
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value:
                                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: 'Please enter valid email!',
                                                },
                                            })}
                                            placeholder='Email'
                                            type='email'
                                            variant="outlined"				
                                        />
                                        {errors?.email && (
                                            <div style={{ color: 'red' }}>{errors?.email?.message}</div>
                                        )} 
                                    </Box>
                                : null} 
                                

                                <TextField
                                    {...register('password', {
                                        required: 'Password is required'
                                    })}
                                    placeholder='Password'
                                    type='password'
                                    variant="outlined"				
                                />
                                {errors?.password && (
                                    <div style={{ color: 'red' }}>{errors?.password?.message}</div>
                                )}

                                {!logimForm ? 
                                    <Box>
                                        <TextField
                                            {...register('passwordConfirm', {
                                                required: 'Confirm is required'
                                            })}
                                            placeholder='Password Confirm'
                                            type='password'
                                            variant="outlined"				
                                        />
                                        {errors?.passwordConfirm && (
                                            <div style={{ color: 'red' }}>{errors?.passwordConfirm?.message}</div>
                                        )} 
                                    </Box>    
                                : null}                              
                                
                                <Button variant='contained' type='submit'>Submit</Button>
                            </form>
                        </ModalContent>
                    </ModalAuthBlock>
                </Box>
            </Dialog>
        </Box>
    )
}

export default Auth