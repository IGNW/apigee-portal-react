import { SidebarNav } from '@cdw/components';
import { RapiDocReact } from '@cdw/rapi-doc-react';
import {
  Alert,
  Box,
  Stack,
  Typography,
  useTheme,
  styled,
  css,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@cdw/client/database';
import { Api } from '@cdw/types';
import 'swagger-ui-react/swagger-ui.css';
import { StateHeader } from '../state-header';

/* eslint-disable-next-line */
export interface CatalogProps {}

export function Catalog(props: CatalogProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const theme = useTheme();
  console.log(`theme`, theme);

  const [value, setValue] = useState<Api>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const prefix = params.get('api') ? '' : `explorer?api=${search}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const apiId = params.get('api') || '';
        const docRef = doc(firestore, 'apis', apiId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setError('');
          setValue(docSnap.data() as Api);
        } else {
          setError('API not found');
        }
      } catch (err: any) {
        // setError(err.message);
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
    <Stack>
      {error && (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      )}
      {!loading && !value && (
        <Alert variant="filled" severity="error">
          Api not found
        </Alert>
      )}
      {typeof window !== 'undefined' && (
        <Stack display="flex" sx={{ maxHeight: 'calc(100vh - 54px)' }}>
          <RapiDocReact
            ref={ref}
            specLoaded={(spec) => {
              console.log(spec);
            }}
            update-route={false}
            show-header={false}
            show-info={false}
            allow-authentication={false}
            allow-server-selection={false}
            allow-api-list-style-selection={false}
            allow-spec-url-load={false}
            allow-spec-file-load={false}
            theme={theme.palette.mode}
            layout="column"
            font-size="large"
            style={{ height: '100vh', width: '100%' }}
            bg-color={theme.palette.grey[200]}
            text-color={theme.palette.getContrastText(theme.palette.grey[200])}
            primary-color={theme.palette.primary.main}
            header-color={theme.palette.grey[200]}
          ></RapiDocReact>
        </Stack>
      )}
    </Stack>
  );
}

export default Catalog;

/*
      {typeof window !== 'undefined' && (
        <Stack display="flex" sx={{ maxHeight: 'calc(100vh - 54px)' }}>
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
            font-size="large"
            style={{ height: '100vh', width: '100%' }}
            bg-color={theme.palette.grey[200]}
            text-color={theme.palette.getContrastText(theme.palette.grey[200])}
            primary-color={theme.palette.primary.main}
            header-color={theme.palette.secondary.main}
          ></RapiDocReact>
        </Stack>
      )}
*/
