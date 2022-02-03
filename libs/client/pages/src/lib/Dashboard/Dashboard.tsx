import { firestore } from '@cdw/client/database';
import { ApiCard } from '@cdw/components';
import { Api } from '@cdw/types';
import styled from '@emotion/styled';
import { CircularProgress, Grid, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { collection } from 'firebase/firestore';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: #4e4e4e;
`;

export function Dashboard(props: DashboardProps) {
  const [apis, loading, error] = useCollectionDataOnce<Api>(
    collection(firestore, 'apis')
  );

  return (
    <StyledDashboard>
      <Stack
        justifyContent="center"
        alignItems="space-between"
        spacing={2}
        flexGrow={1}
        style={{ minHeight: '100vh' }}
      >
        <div style={{ display: 'flex', flexGrow: 1, maxHeight: 415 }}>
          <Stack p={5}>
            <h1 style={{ fontSize: '2.6rem' }}>Welcome To API Awesome</h1>
            <p>Lorem Ipsum dolar sit amet</p>
          </Stack>
        </div>
        <div
          style={{ display: 'flex', flexGrow: 1, backgroundColor: '#EBF4FF' }}
        >
          <Stack p={5} spacing={3}>
            <Typography variant="h4">Featured APIs</Typography>
            <Grid container spacing={2}>
              {apis &&
                apis.map((api, idx) => {
                  return (
                    <Grid item xs={1} md={3} key={api.id || idx}>
                      <ApiCard
                        apiId={api.id}
                        name={api.name}
                        description={api.description}
                      />
                    </Grid>
                  );
                })}
              {loading && (
                <div>
                  <CircularProgress /> Loading...
                </div>
              )}
              {error && <div>{error}</div>}
            </Grid>
          </Stack>
        </div>
      </Stack>
    </StyledDashboard>
  );
}

export default Dashboard;
