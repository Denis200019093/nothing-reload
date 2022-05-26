import React, { FC } from 'react';
import { Routes, Route, BrowserRouter as Router  } from 'react-router-dom'
import { Container, ThemeProvider, createTheme, Grid, Box } from '@mui/material';

import Header from './components/Header';
import LeftBar from './components/LeftBar';
import Comments from './components/Comments';
import { publicRoutes } from './routes';
import { Provider } from 'react-redux';

import { setupStore } from './redux/store'
import ErrorMessage from './components/ErrorMessage';
import Auth from './components/Auth';

const store = setupStore()

export const theme = createTheme( {
	palette: {
		primary: {
			main: "#00C9A7"
		},
		secondary: {
			main: "#357a38"
		}
	},
});

const App: FC = () => {
  return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Router>
					<Container maxWidth='xl'>
						<Header/>
						<Grid container>
							<Grid item md={2.5}>
								<LeftBar/>
							</Grid>
							<Grid item md={6.5}>
								<Routes>
									{publicRoutes.map(({ path, Component }) => (
										<Route key={path} path={path} element={<Component/>}/>
									))}
								</Routes>
							</Grid>
							<Grid item md={3}>
								<Box>Box</Box>
								{/* <Comments/> */}
							</Grid>
						</Grid>
						<ErrorMessage/>
						<Auth/>
					</Container>
				</Router>
			</ThemeProvider>
		</Provider>
  );
}

export default App;
