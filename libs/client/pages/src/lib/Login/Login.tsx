import styled from '@emotion/styled';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { ReactComponent as Glass } from './glass.svg';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth, signInWithGoogle } from '@cdw/client/database';
import { useNavigate } from 'react-router-dom';
import React from 'react';

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  --border: solid #fff2;
  background-color: #ffffff50;
  font-size: 4em;
  backdrop-filter: url('#glass');
  padding: 1em 1.5em;
  box-shadow: -0.1em -0.1em 0.1em #0002, 0.1em 0.2em 0.2em #0006,
    0.2em 0.4em 0.4em #0006;
  text-shadow: 0.06em 0.1em 0.1em #0004, 0.1em 0.14em 0.18em #0004;
  border-radius: 0.1em;
  letter-spacing: 0.4ch;
  font-weight: normal;
  border-top: 0.03em var(--border);
  border-left: 0.02em var(--border);
`;

export function Login(props: LoginProps) {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(firebaseAuth);

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = () => {
    signInWithGoogle().then((user) => {
      if (user) {
        console.log('Signed in', user);
        navigate('/');
      }
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'url("https://picsum.photos/id/1041/2000") no-repeat center center fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', hight: '100%' }}
      >
        <Box>
          <Glass />
          <StyledLogin>
            {loading ? (
              <Box>
                <CircularProgress />
              </Box>
            ) : (
              <Stack spacing={1} sx={{ p: 1 }}>
                <Typography variant="h2" component="h1">
                  Login
                </Typography>
                <Button variant="contained" onClick={() => handleLogin()}>
                  Google
                </Button>
              </Stack>
            )}
          </StyledLogin>
        </Box>
      </Stack>
    </Box>
  );
}

export default Login;
