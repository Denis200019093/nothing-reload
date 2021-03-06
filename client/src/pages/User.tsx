import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { Box, Typography, Button, Grid } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { getProfileUser, subscribe, unsubscribe } from '../redux/reducers/auth';

const WrapperInfoBlock = styled(Box)(({ theme }) => ({
	display: 'flex',
    flexDirection: 'column',
    minWidth: '65%'
}));

const UserInfoBlock = styled(Box)(() => ({
	display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexBasis: '175px',
    position: 'relative',
    padding: '25px 15px 0 15px',
    backgroundColor: '#fff',
    borderRadius: '0 0 7.5px 7.5px'
}));

const Background = styled(Box)(() => ({
    position: 'relative',
    borderRadius: '7.5px 7.5px 0 0',
    marginTop: '15px',
	minHeight: '250px',
    width: '100%',
    background: "rgb(55,55,55)",
}));

const BtnFollow = styled(Button)(() => ({
	position: 'absolute',
    top: '15px',
    right: '15px',
    color: "#fff",
    fontWeight: 700
}));

const UserAvatar = styled('img')(() => ({
	position: 'absolute',
    bottom: '10px',
    left: '15px',
    width: '100px',
    height: '100px',
    borderRadius: '7.5px',
    // boxShadow: '0 0 4px #000',
    border: '5px solid #fff'
}));

const Actions = styled(Box)(() => ({
    padding: '5px 10px 10px 10px',
    borderRadius: '25px',
    margin: '0 10px 0 0',
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
        background: 'rgb(70, 70, 70)',
    }
}));

const User = () => {

    const dispatch = useAppDispatch()
    const { userProfile } = useTypedSelector(state => state.auth)
    const { id } = useParams()

    
    useEffect(() => {
        dispatch(getProfileUser(id))
    }, [dispatch, id])
    
    console.log(userProfile);
    return (
        <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', color: 'rgba(255,255,255,0.8)' }}>
            <WrapperInfoBlock>
                <Background>

                    <UserAvatar src='https://i.pinimg.com/originals/be/6a/dc/be6adc8f98a4650049d6ee94f9c1a621.jpg' alt='alt'/>
                </Background>
                <UserInfoBlock sx={{ background: "rgb(40,40,40)" }}>
                    <Typography sx={{ fontWeight: 700 }} variant='h4'>{userProfile.username}</Typography>
                    <Typography variant='body2'>???????????? ??????????????????, ?????????????? ???? ????????????????, ???????????????????? ?? ???????????????? ???????????????? ?? ???????????????????? ??????????.</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 1 }} variant='body2'>{userProfile.subscribers?.length || 0}</Typography>
                        <Typography variant='body2'>??????????????????????</Typography>
                    </Box>
                    <Box>
                        <Button variant="text">????????????</Button>
                        <Button variant="text">??????????????????????</Button>
                        <Button variant="text">??????????????????</Button>
                    </Box>
                    <Box>
                        {userProfile.currentUserSubscribed ?
                            <BtnFollow onClick={() => dispatch(unsubscribe(id))} variant='contained'>????????????????????</BtnFollow>
                            :
                            <BtnFollow onClick={() => dispatch(subscribe(id))} variant='contained'>??????????????????????</BtnFollow>
                        }
                    </Box>
                </UserInfoBlock>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Actions>????????????????????</Actions>
                        <Actions>????????????</Actions>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Actions>#??????????????</Actions>
                        <Actions>#????????</Actions>
                        <Actions>#????????????????</Actions>
                    </Box>
                </Box>
            </WrapperInfoBlock>
        </Grid>
    )
}

export default User