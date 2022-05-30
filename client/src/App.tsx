import React, { FC } from 'react';
import { Container, Grid, Snackbar } from '@mui/material';

import { Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import Auth from './components/Auth';

import { publicRoutes } from './routes';
import { useTypedSelector } from './hooks/useTypedSelector';

const App: FC = () => {
  	return (
		<Container maxWidth='xl'>
			<Grid container>
				{/* Not routes */}
				<Header/>
				<Auth/>
				{/* Routes */}
				<Routes>
					{publicRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} element={<Component/>}/>
					))}
				</Routes>
			</Grid>
		</Container>
  	);
}

export default App;
