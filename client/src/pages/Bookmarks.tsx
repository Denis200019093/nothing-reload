import { Grid, Typography } from '@mui/material'
import React from 'react'

const Bookmarks = () => {
    return (
        <Grid item md={12}>
            <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', mt: 10 }} variant='h1'>Bookmarks is empty</Typography>
        </Grid>
    )
}

export default Bookmarks