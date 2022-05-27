import React, { FC } from 'react';
import { CircularProgress, Box } from '@mui/material';

const Spinner: FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
}

export default Spinner