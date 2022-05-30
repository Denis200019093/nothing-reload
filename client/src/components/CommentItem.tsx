import React, { FC } from 'react'
import { Box, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Arrows } from './PostItem'
import { IComment } from '../models/IPost';

export const FlexBlocks = styled(Box)(({ theme }) => ({
	display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}));

interface IProps {
    comment: IComment
}

const CommentItem: FC<IProps> = ({ comment }) => {
    return (
        <Box sx={{ backgroundColor: 'rgb(40,40,40)', p: 1, borderRadius: '7.5px', mb: 2, mt: 3 }}>
            <FlexBlocks sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography sx={{ ml: 1 }}>Nothing</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Arrows>
                        <KeyboardArrowUpIcon/>
                    </Arrows>
                    <Typography sx={{ pl: 1, pr: 1 }}>0</Typography>
                    <Arrows>
                        <KeyboardArrowDownIcon/>
                    </Arrows>
                </Box>
            </FlexBlocks>
            <Typography>{comment.text}</Typography>
        </Box>
    )
}

export default CommentItem