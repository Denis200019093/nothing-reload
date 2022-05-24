import React, { FC } from 'react';
import { Snackbar } from '@mui/material';
import { useAppDispatch, useTypedSelector } from '../hooks/useTypedSelector';
import { setError } from '../redux/reducers/posts';

const ErrorMessage: FC = () =>  {

    const { error, errorMessage } = useTypedSelector(state => state.posts)
    const dispatch = useAppDispatch()
    
    return (
        <Snackbar
            open={error}
            onClose={() => dispatch(setError(false))}
            autoHideDuration={2000}
            message={errorMessage}
        />
    );
    
    
}

export default ErrorMessage