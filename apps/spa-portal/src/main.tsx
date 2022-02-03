import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { themeDark, themeLight } from '@cdw/theme';

import App from './app/App';
import { createTheme, ThemeProvider } from '@mui/material';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={createTheme(themeLight)}></ThemeProvider>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
