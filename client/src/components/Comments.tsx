import { Box } from '@mui/material'
import React, { FC } from 'react'
import { IComment } from '../models/IPost'
import CommentItem from './CommentItem'

interface IProps {
    comments: IComment[]
}

const Comments: FC<IProps> = ({ comments }) => {
    return (
        <Box>
            {comments?.map((item: IComment, index: number) => (
                <CommentItem
                    key={index}
                    comment={item}
                />
            )).reverse()}
        </Box>
    )
}

export default Comments