import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useDarkMode } from 'storybook-dark-mode';
import { addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import { themeDark, themeLight } from '@cdw/theme';

addDecorator(
  (Story) => (
    <ThemeProvider theme={createTheme(useDarkMode() ? themeDark : themeLight)}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
)

export const parameters = {
  layout: 'fullscreen',
  theme: themes.dark,
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  darkMode: {
    current: 'dark',
  },
};