import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';

import { Route, Link, Routes } from 'react-router-dom';
import { Dashboard, Login } from '@cdw/pages';
import { Stack } from '@mui/material';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
