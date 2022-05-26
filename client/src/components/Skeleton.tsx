import React, { FC } from 'react';

import { Skeleton, Stack } from '@mui/material';

const SkeletonLoading: FC = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" width={'100%'} height={'300px'} />
            <Skeleton variant="rectangular" width={'100%'} height={'500px'} />
        </Stack>
    );
}

export default SkeletonLoading