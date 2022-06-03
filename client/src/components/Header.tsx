import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { SubmitHandler, useForm } from 'react-hook-form'
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
import { searching } from '../redux/actions/postsAction';
import { toggleCreateModal } from '../redux/reducers/posts';

const Logo = styled('img')(() => ({
    height: '50px',
    width: '150px',
    background: 'transparent'
}));

const SearchPanel = styled(Box)(() => ({
    boxShadow: '0 0 5px #000', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    background: "rgb(40, 40, 40)", 
    display: 'flex', 
    flexDirection: 'column', 
    zIndex: 1 ,
    'input': {
        background: "rgb(40, 40, 40)", 
        fontWeight: 700,
        fontSize: '18px',
        color: 'rgba(255,255,255,0.8)'
    }
}));

const HeaderSide = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center'
}));

const HeaderCenter = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
}));

const LinkPage = styled(Link)(({ theme }) => ({
    textDecoration: 'none'
}));

const HeaderCenterItems = styled(Typography)(({ theme }) => ({
    padding: '0 15px',
    fontSize: '18px',
    fontWeight: 700,
    color: "rgba(255,255,255,0.5)",
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
        color: theme.palette.primary.main
    },
    'a': {
        color: "rgba(255,255,255,0.5)"
    }
}));

interface IValues {
    searchValue: string
}

const routes = [
    { id: 1, link: '', title: 'Main' },
    { id: 2, link: 'bookmarks', title: 'Bookmarks' },
    { id: 3, link: 'subscribes', title: 'Subscribes' }
]

const Header = () => {

    const dispatch = useAppDispatch()
    const { isAuth, authUser, isLoading } = useTypedSelector(state => state.auth)
    const { posts } = useTypedSelector(state => state.posts)
    const { ref, isShow, setIsShow } = useOutside(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    
    const [ searchValue, setSearchValue ] = useState<string>('');

    const filtered = posts.filter(item => item.content.toLowerCase().includes(searchValue.toLowerCase()))

    useEffect(() => {
        if ( isAuth ) {
            dispatch(getUserInfoAsync())
        }
    }, [dispatch, isAuth])    

    const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IValues>({
		mode: 'onChange',
	})

    const submit: SubmitHandler<IValues> = () => {

        if ( !searchValue ) return

        reset()
        navigate({
            pathname: '/results',
            search: `?query=${searchValue}`
        })
        dispatch(searching(searchValue))
    };
    
    return (
        <AppBar position="static" sx={{ height: '65px', background: 'linear-gradient(to right, #516395, #614385)' }}>
            <Grid container sx={{ minHeight: '60px', padding: '5px 15px' }}>
                <HeaderSide item md={2.5}>
                    <Link to='/'>
                        <Logo src={logo} alt='logo'/>
                    </Link>
                </HeaderSide>
                <HeaderCenter item md={7} sx={{ position: 'relative'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {routes.map(item => (
                            <LinkPage key={item.id} to={`${item.link}`}>
                                <HeaderCenterItems
                                    sx={{ 
                                        color: item.link.toLowerCase() === 
                                        pathname.slice(1) ? '#00C9A7' : '' 
                                    }}> 
                                {item.title}</HeaderCenterItems>
                            </LinkPage>
                        ))}
                    </Box>
                    <Box>
                        {isShow ?
                        <SearchPanel ref={ref}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <ArrowBackIcon onClick={() => setIsShow(false)} sx={{ width: '50px', cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}/>
                                <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
                                    <TextField
                                        {...register('searchValue', {
                                            required: 'Value is required'
                                        })}
                                        value={searchValue}
                                        onChange={e => setSearchValue(e.target.value)}
                                        hiddenLabel
                                        id="filled-hidden-label-normal"
                                        placeholder='Search'
                                        type='text'
                                        fullWidth
                                        variant="filled"
                                    />
                                </form>
                                <CloseIcon onClick={() => setSearchValue('')} sx={{ width: '50px', cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}/>
                            </Box>
                            <Box>
                                {searchValue && filtered.length ? 
                                    <Box onClick={() => setIsShow(false)} sx={{ pt: 1, pb: 1 }}>
                                        {filtered.map(item => (
                                            <Link to={`/posts/${item.id}`}>
                                                <Typography sx={{ p: '10px', '&:hover': { backgroundColor: 'lightgray' } }} variant='h5'>{item.content}</Typography>
                                            </Link>
                                        )).slice(0, 5)}
                                    </Box>
                                    : null
                                }
                            </Box>
                        </SearchPanel>
                        :
                            <HeaderCenterItems onClick={() => setIsShow(true)}>Search</HeaderCenterItems>
                        }
                    </Box>
                    <>
                        {pathname === '/' ?
                            <HeaderCenterItems onClick={() => dispatch(toggleCreateModal())}>Create</HeaderCenterItems>
                        : null
                        }
                    </>
                    
                </HeaderCenter>
                <HeaderSide sx={{ justifyContent: 'end' }} item md={2.5}>
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
                
            </Grid>
            
        </AppBar>
    )
}

export default Header