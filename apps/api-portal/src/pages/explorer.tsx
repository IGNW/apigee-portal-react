/* eslint-disable @typescript-eslint/no-unused-vars */
import { firestore } from '@cdw/client/database';
import { Header, SidebarNav } from '@cdw/components';
import { RapiDocReact } from '@cdw/rapi-doc-react';
import { Api } from '@cdw/types';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { navigate } from 'gatsby';

/* eslint-disable-next-line */
export interface ExplorerProps {}

export function Explorer(props: ExplorerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(null);

  const [value, setValue] = useState<Api>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const apiId = params.get('api') || '';
        const docRef = doc(firestore, 'apis', apiId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setValue(docSnap.data() as Api);
        } else {
          setError('API not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (value && ref?.current) {
    ref.current.loadSpec(JSON.parse(value.oas));
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={1} sx={{ backgroundColor: '#1D5AA2', color: 'white' }}>
          <List>
            <ListItem button key="home" onClick={() => navigate('/dashboard')}>
              <ListItemIcon>
                <HomeIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={11}>
          <Stack>
            <Header />
            {error && <div>{error}</div>}
            {!loading && !value && <div>API not found</div>}
            {typeof window !== 'undefined' && (
              <RapiDocReact
                ref={ref}
                specLoaded={(spec) => {
                  console.log(spec);
                }}
                show-header={false}
                allow-server-selection={false}
                render-style="read"
                theme="dark"
                style={{ height: '100vh', width: '100%' }}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Explorer;
