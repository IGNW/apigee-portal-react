import { firebaseAuth, signInWithGoogle } from '@cdw/client/database';
import { Button, CircularProgress, Stack } from '@mui/material';
import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function Index() {
  const [user, loading, error] = useAuthState(firebaseAuth);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#96CECE',
      }}
    >
      {!user && !loading && (
        <Button
          variant="contained"
          onClick={() => signInWithGoogle()}
          sx={{ backgroundColor: '#1DA2A2' }}
        >
          Sign In With Google
        </Button>
      )}
      {!user && loading && (
        <div>
          <CircularProgress /> Loading...
        </div>
      )}
      {error && <div>{error}</div>}
    </Stack>
  );
}

export default Index;
