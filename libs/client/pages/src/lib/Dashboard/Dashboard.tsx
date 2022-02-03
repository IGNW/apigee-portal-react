/* eslint-disable @typescript-eslint/no-explicit-any */
import { firestore } from '@cdw/client/database';
import { ApiCard } from '@cdw/components';
import { CircularProgress, Grid, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { collection } from 'firebase/firestore';
import { navigate } from 'gatsby';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { Api } from '@cdw/types';
/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [values, loading, error, snapshot] = useCollectionDataOnce(
    collection(firestore, 'apis')
  );

  return (
    <Stack
      justifyContent="center"
      alignItems="space-between"
      spacing={2}
      flexGrow={1}
      style={{ minHeight: '100vh' }}
    >
      <div style={{ display: 'flex', flexGrow: 1, maxHeight: 415 }}>
        <Stack direction="row" pl={5}>
          <div
            style={{
              backgroundColor: '#1D5AA2',
              height: '8rem',
              marginRight: '2rem',
              marginLeft: '1rem',
              width: '1.5rem',
            }}
          ></div>
          <Stack>
            <h1 style={{ fontSize: '2.6rem', color: '#4e4e4e', marginTop: 0 }}>
              Welcome To API Awesome
            </h1>
            <p style={{ maxWidth: '80%' }}>
              Our Knowledge Transfer Ballpark Figure solution offers standpoints
              a suite of innovative offerings. You need to reliably reuse your
              step-changes to increase your diversity velocity. Our business
              transforms market foci to globally and iteratively connect our
              competitive stack. Efficiencies will come from conservatively
              virtualising our enterprises.
            </p>
          </Stack>
        </Stack>
      </div>
      <div style={{ display: 'flex', flexGrow: 1, backgroundColor: '#EBF4FF' }}>
        <Stack p={5} spacing={3}>
          <Typography variant="h4">Featured APIs</Typography>
          <Grid container spacing={2}>
            {snapshot &&
              snapshot.docs.map((doc, idx) => {
                const api = doc.data() as Api;
                return (
                  <Grid item xs={1} md={4} key={doc.id || idx}>
                    <ApiCard
                      apiId={doc.id}
                      name={api.name}
                      description={api.description}
                      onClick={() => navigate(`/explorer?api=${doc.id}`)}
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
  );
}

export default Dashboard;
