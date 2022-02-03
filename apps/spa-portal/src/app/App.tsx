import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';

import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import { Dashboard, Login } from '@cdw/pages';
import { Box, Stack } from '@mui/material';
import { Header } from '@cdw/components';
import { firebaseAuth, signInWithGoogle } from '@cdw/client/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Catalog } from '@cdw/pages';

export function App() {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const navigate = useNavigate();
  const handleSignOut = () => {
    firebaseAuth.signOut().then(() => {
      console.log('Signed out');
      navigate('/login');
    });
  };

  return (
    <Stack sx={{ height: '100vh' }}>
      {user ? <Header onSignOut={handleSignOut} /> : null}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="explorer" element={<Catalog />} />
      </Routes>
    </Stack>
  );
}

export default App;
