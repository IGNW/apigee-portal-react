/* eslint-disable @typescript-eslint/no-unused-vars */
import { firestore } from '@cdw/client/database';
import { Header, SidebarNav } from '@cdw/components';
import { RapiDocReact } from '@cdw/rapi-doc-react';
import { Api } from '@cdw/types';
import { Box, useTheme } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface ExplorerProps {}

export function Explorer(props: ExplorerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(null);
  const theme = useTheme();
  console.warn(`themeData`, theme);

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
    <>
      <Header />
      {error && <div>{error}</div>}
      {!loading && !value && <div>API not found</div>}
      {typeof window !== 'undefined' && (
        <Box display="flex">
          <SidebarNav open={true} />
          <RapiDocReact
            ref={ref}
            specLoaded={(spec) => {
              console.log(spec);
            }}
            show-header={false}
            show-info={false}
            allow-authentication={false}
            allow-server-selection={false}
            allow-api-list-style-selection={false}
            theme="light"
            layout="column"
            regular-font="Open Sans"
            mono-font="Roboto Mono"
            style={{ height: '100vh', width: '100%' }}
            bg-color={theme.palette.grey[300]}
            text-color={theme.palette.text.primary}
            primary-color={theme.palette.primary.main}
            header-color={theme.palette.secondary.main}
          />
        </Box>
      )}
    </>
  );
}

export default Explorer;
