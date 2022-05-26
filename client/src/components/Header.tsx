import React, { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { Box, AppBar, TextField, Button, InputBase, Avatar, Grid, Typography } from '@mui/material';

import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';

import logo from '../assets/third.png'
import { Link } from 'react-router-dom';
import { getUserInfoAsync, logOut, openModal } from '../redux/reducers/auth';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.35),
    transition: '0.3s',
    color: '#000',
    '&:hover': {
        backgroundColor: '#F1F1F1',
        boxShadow: '0 0 5px #000'
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: '15px',
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
		    width: '20ch',
		},
	},
}));

const HeaderBlock = styled(Grid)(() => ({
    
    minHeight: '60px',
    padding: '5px 15px',
}));

const HeaderSide = styled(Grid)(() => ({
    flexBasis: '25%',
    display: 'flex',
    alignItems: 'center'
}));

const HeaderCenter = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // flexBasis: '50%',
}));

const Logo = styled('img')(() => ({
    height: '50px', width: '150px',
    background: 'transparent'
}));

const Header = () => {

    const dispatch = useAppDispatch()
    const { authUser, isAuth } = useTypedSelector(state => state.auth)

    useEffect(() => {
        dispatch(getUserInfoAsync())
    }, [dispatch])
    
    return (
        <AppBar sx={{ mb: 1 }} position="static">
            <HeaderBlock container>
                <HeaderSide item md={2.5}>
                    <Link to='/'>
                        <Logo src={logo} alt='logo'/>
                    </Link>
                </HeaderSide>
                <HeaderCenter item md={6.5}>
                    <Search>
						<StyledInputBase
							sx={{ width: '325px' }}
							placeholder="Search"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            fontWeight: 500,
                            background: '#F1F1F1',
                            color: '#000',
                            "&:hover": {
                                background: '#fff'
                            }
                        }}
                    >Create</Button>
                </HeaderCenter>
                <HeaderSide sx={{ justifyContent: 'end' }} item md={3}>
                    <Typography 
                        variant='h4' 
                        sx={{ p: '0 10px' }}>
                            {(authUser.username?.slice(0,1).toUpperCase()) || 
                            <Typography>User is gone</Typography>
                        }</Typography>
                        <>
                            {isAuth ?
                                <Button onClick={() => dispatch(logOut())} variant='contained'>Log out</Button>
                                : 
                                <Button variant='contained' onClick={() => dispatch(openModal())}>Open modal</Button>
                            }
                        </>
                </HeaderSide>
                
            </HeaderBlock>
        </AppBar>
    )
}

export default Header