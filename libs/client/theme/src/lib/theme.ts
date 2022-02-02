import merge from 'ts-deepmerge';
import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material';
import { blueGrey, lightBlue, blue, indigo, amber } from '@mui/material/colors';

const typography: Pick<ThemeOptions, 'typography'> = {
  typography: {
    htmlFontSize: 10,
    poster: {
      fontSize: '8rem',
      fontWeight: 300,
      color: `#cc0000`,
      lineHeight: 1, //300,400,500,700
    },

    h1: {
      fontSize: '3.7rem',
    },
    h2: {
      fontSize: '3.2rem',
    },
    h3: {
      fontSize: '2.6rem',
      lineHeight: 1,
    },
  },
};

const components: Pick<ThemeOptions, 'components'> = {
  components: {
    MuiScopedCssBaseline: {
      styleOverrides: {
        root: {
          html: {
            fontSize: '62.5%',
          },
        },
      },
    },
  },
};

const lightPalette: ThemeOptions = {
  name: 'light',
  palette: {
    mode: 'light',
    // primary: {
    //   main: blue['500'],
    // },
    // secondary: {
    //   main: blue['800'],
    // },

    backdrops: {
      main: '#DCDCDC',
      dark: '#C0C0C0',
      light: '#F5F5F5',
    },
    text: {
      primary: 'rgba(20, 20, 20)',
      secondary: 'rgba(20, 20, 20, 0.7)',
      disabled: 'rgba(20, 20, 20, 0.5)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          borderColor: 'rgba(20, 20, 20, 0.5)',
        },
      },
    },
  },
};

const darkPalette: ThemeOptions = {
  name: 'dark',
  palette: {
    mode: 'dark',
    // primary: {
    //   main: blue['500'],
    // },
    // secondary: {
    //   main: blue['800'],
    // },

    backdrops: {
      main: '#303030',
      dark: '#505050',
      light: '#101010',
    },
    text: {
      primary: 'rgba(235, 235, 235)',
      secondary: 'rgba(235, 235, 235, 0.7)',
      disabled: 'rgba(235, 235, 235, 0.5)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          borderColor: 'rgba(235, 235, 235, 0.5)',
        },
      },
    },
  },
};

export const themeLight: ThemeOptions = merge(
  typography,
  lightPalette,
  components
);
export const themeDark: ThemeOptions = merge(
  typography,
  darkPalette,
  components
);

export const getMuiTheme = (mode?: 'light' | 'dark') =>
  createTheme(mode === 'light' ? themeLight : themeDark);
// responsiveFontSizes(createTheme(mode === 'dark' ? themeDark : themeLight));

// MODULE DECLARATION
declare module '@mui/material' {
  interface Theme {
    name: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    name?: string;
  }
  export interface Palette {
    backdrops: Palette['primary'];
  }
  export interface PaletteOptions {
    backdrops?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
  }
}
