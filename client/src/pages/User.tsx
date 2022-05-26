import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';

const WrapperInfoBlock = styled(Box)(({ theme }) => ({
	display: 'flex',
    flexDirection: 'column',
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
    
	minHeight: '250px',
    width: '100%',
    background: "pink",
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
    bottom: '-15px',
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
        background: '#fff',

    }
}));

const User = () => {
    return (
        <Box>
            <WrapperInfoBlock>
                <Background>

                <UserAvatar src='https://i.pinimg.com/originals/be/6a/dc/be6adc8f98a4650049d6ee94f9c1a621.jpg' alt='alt'/>
                </Background>
                <UserInfoBlock>
                    <Typography sx={{ fontWeight: 700 }} variant='h4'>Интернет</Typography>
                    <Typography variant='body2'>Тренды интернета, истории из соцсетей, погружение в цифровую культуру и объяснения мемов.</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='body2'>323</Typography>
                        <Typography variant='body2'>Подписчиков</Typography>
                    </Box>
                    <Box>
                        <Button variant="text">Статьи</Button>
                        <Button variant="text">Комментарии</Button>
                        <Button variant="text">Подробнее</Button>
                    </Box>
                    <BtnFollow variant='contained'>Подписаться</BtnFollow>
                </UserInfoBlock>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Actions>Популярное</Actions>
                        <Actions>Свежее</Actions>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Actions>#соцсети</Actions>
                        <Actions>#мемы</Actions>
                        <Actions>#животные</Actions>
                    </Box>
                </Box>
            </WrapperInfoBlock>
        </Box>
    )
}

export default User