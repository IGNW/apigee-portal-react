/* eslint-disable @typescript-eslint/no-unused-vars */
import { firestore } from '@cdw/client/database';
import { Header } from '@cdw/components';
import { RapiDocReact } from '@cdw/rapi-doc-react';
import { Box, Button } from '@mui/material';
import { doc } from 'firebase/firestore';
import { navigate } from 'gatsby';
import React from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

/* eslint-disable-next-line */
export interface ExplorerProps {}

export function Explorer(props: ExplorerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(null);
  const search = window?.location.search || '';
  const params = new URLSearchParams(search);
  const apiId = params.get('api');

  const [value, loading, error, snapshot, reload] = useDocumentDataOnce(
    doc(firestore, 'apis', apiId)
  );

  if (value && ref?.current) {
    ref.current.loadSpec(JSON.parse(value.oas));
  }

  return (
    <>
      <Header />
      {error && <div>{error}</div>}
      {!loading && !value && <div>API {apiId} not found</div>}
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
    </>
  );
}

export default Explorer;
