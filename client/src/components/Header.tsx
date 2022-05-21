import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { Box, AppBar, TextField, Button, InputBase, Avatar } from '@mui/material';

import AppleIcon from '@mui/icons-material/Apple';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

// import logo from '../assets/third.png'

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

const HeaderBlock = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '50px',
    padding: '5px 15px',
}));

const HeaderSide = styled(Box)(() => ({
    flexBasis: '25%',
    display: 'flex',
    alignItems: 'center'
}));

const HeaderCenter = styled(Box)(() => ({
    flexBasis: '50%',
    display: 'flex',
    justifyContent: 'space-around'
}));

const Logo = styled('img')(() => ({
    height: '50px', width: '150px',
    background: 'transparent'
}));

const Header = () => {

    const [  activeInput, setActive ] = useState<boolean>(false)

    return (
        <AppBar sx={{ mb: 1 }} position="static">
            <HeaderBlock>
                <HeaderSide>
                    {/* <Logo src={logo} alt='logo'/> */}
                </HeaderSide>
                <HeaderCenter>
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
                <HeaderSide sx={{ justifyContent: 'end' }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </HeaderSide>
            </HeaderBlock>
        </AppBar>
    )
}

export default Header