import { Box, Button, useTheme, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CdwLogo from '../Logos/CDWlogo';

/* eslint-disable-next-line */
export interface HeaderProps {
  onSignOut?: () => void;
}

export function Header({ onSignOut }: HeaderProps) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Stack
        sx={{ paddingLeft: 1, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <CdwLogo sx={{ color: 'black', width: '50px', height: '50px' }} />
      </Stack>
      <Button
        sx={{ m: 1 }}
        variant="outlined"
        color="inherit"
        onClick={() => onSignOut && onSignOut()}
      >
        Sign Out
      </Button>
    </Box>
  );
}

export default Header;
