import { signOut } from '@cdw/client/database';
import { Box, Button } from '@mui/material';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        p: 1,
        m: 1,
        justifyContent: 'flex-end',
      }}
    >
      <Button onClick={() => signOut()}>Sign Out</Button>
    </Box>
  );
}

export default Header;
