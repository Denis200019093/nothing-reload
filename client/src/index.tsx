import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material';

import App from './App';
import { setupStore } from './redux/store';

import './index.css';

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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);

