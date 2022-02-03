import { Box, Button } from '@mui/material';

/* eslint-disable-next-line */
export interface HeaderProps {
  onSignOut?: () => void;
}

export function Header({ onSignOut }: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        p: 1,
        justifyContent: 'flex-end',
      }}
    >
      <Button variant="outlined" onClick={() => onSignOut && onSignOut()}>
        Sign Out
      </Button>
    </Box>
  );
}

export default Header;
