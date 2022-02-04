import { Catalog, Dashboard, Login, StateHeader } from '@cdw/pages';
import { Stack } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Stack sx={{ height: '100vh' }}>
      <StateHeader />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="explorer" element={<Catalog />} />
      </Routes>
    </Stack>
  );
}

export default App;
