/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from '@cdw/client/database';
import { ApiCard } from '@cdw/components';
import { CircularProgress, Grid, Typography, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { collection } from 'firebase/firestore';
// import { navigate } from 'gatsby';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { Api } from '@cdw/types';
import { useNavigate } from 'react-router-dom';
/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [values, loading, error, snapshot] = useCollectionDataOnce(
    collection(firestore, 'apis')
  );

  return (
    <Stack alignItems="space-between" spacing={2} flexGrow={1}>
      <div style={{ display: 'flex', flexGrow: 1, maxHeight: 415 }}>
        <Stack p={5}>
          <Grid container spacing={2}></Grid>
          <h1 style={{ fontSize: '2.6rem', color: '#4e4e4e' }}>
            Welcome To API Awesome
          </h1>
          <p>Lorem Ipsum dolar sit amet</p>
        </Stack>
      </div>
      <div style={{ display: 'flex', flexGrow: 1, backgroundColor: '#EBF4FF' }}>
        <Stack p={5} spacing={3}>
          <Typography variant="h4">Featured APIs</Typography>
          <Grid container spacing={3}>
            {snapshot &&
              snapshot.docs.map((doc, idx) => {
                const api = doc.data() as Api;
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={doc.id || idx}>
                    <Box sx={{ height: '100%' }}>
                      <ApiCard
                        apiId={doc.id}
                        name={api.name}
                        description={api.description}
                        onClick={() => navigate(`/explorer?api=${doc.id}`)}
                      />
                    </Box>
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
  );
}

export default Dashboard;
