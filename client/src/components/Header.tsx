import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
    Box, AppBar, Button, Grid, 
    TextField, Typography 
} from '@mui/material';
// Icons
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../assets/third.png'
// My
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { getUserInfoAsync, logOut, openModal } from '../redux/reducers/auth';
import { useOutside } from '../hooks/useOutside';


const SearchArea = styled(TextField)(({ theme }) => ({
    'input': {
        backgroundColor: '#fff',
        fontWeight: 700,
        fontSize: '18px',
    }
}));

const HeaderBlock = styled(Grid)(() => ({
    minHeight: '60px',
    padding: '5px 15px',
}));

const HeaderSide = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center'
}));

const HeaderCenter = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
}));

const Logo = styled('img')(() => ({
    height: '50px',
    width: '150px',
    background: 'transparent'
}));

const Header = () => {

    const dispatch = useAppDispatch()
    const { isAuth, authUser, isLoading } = useTypedSelector(state => state.auth)
    const { posts } = useTypedSelector(state => state.posts)
    const { ref, isShow, setIsShow } = useOutside(false)

    const [ searchValue, setSearchValue ] = useState<string>('');

    const filtered = posts.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))

    useEffect(() => {
        if ( isAuth ) {
            dispatch(getUserInfoAsync())
        }
    }, [dispatch, isAuth])    
    console.log(authUser);
    
    return (
        <AppBar position="static" sx={{ height: '65px' }}>
            <HeaderBlock container>
                <HeaderSide item md={2.5}>
                    <Link to='/'>
                        <Logo src={logo} alt='logo'/>
                    </Link>
                </HeaderSide>
                <HeaderCenter item md={6.5} sx={{ position: 'relative'}}>
                    
                    <>
                        {isShow ?
                        <Box ref={ref} sx={{ boxShadow: '0 0 5px #000', position: 'absolute', top: 0, left: 0, width: '100%', background: "#fff", display: 'flex', flexDirection: 'column', zIndex: 1  }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ArrowBackIcon onClick={() => setIsShow(false)} sx={{ width: '50px', cursor: 'pointer' }}/>
                                <SearchArea
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                    hiddenLabel
                                    id="filled-hidden-label-normal"
                                    placeholder='Search'
                                    variant="filled"
                                    fullWidth
                                />
                                <CloseIcon onClick={() => setSearchValue('')} sx={{ width: '50px', cursor: 'pointer' }}/>
                            </Box>
                            <>
                                {searchValue && filtered.length ? 
                                    <Box sx={{ pt: 1, pb: 1 }}>
                                        {filtered.map(item => (
                                            <Typography sx={{ p: '10px', '&:hover': { backgroundColor: 'lightgray' } }} variant='h5'>{item.title}</Typography>
                                        )).slice(0, 5)}
                                    </Box>
                                    : null
                                }
                            </>
                        </Box>
                        :
                        
                        <Box onClick={() => setIsShow(true)}>
                            <Box>Search</Box>
                        </Box> 
                        }
                    </>
                    
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
                    <Box>
                        {isAuth ?
                            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <Box>{authUser.username}</Box>
                                <LogoutIcon sx={{ cursor: 'pointer' }} onClick={() => dispatch(logOut())}/>
                            </Box>
                            : 
                            <LoginIcon sx={{ cursor: 'pointer' }} onClick={() => dispatch(openModal())}/>
                        }
                    </Box>
                    
                </HeaderSide>
                
            </HeaderBlock>
            
        </AppBar>
    )
}

export default Header