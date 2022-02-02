import React from 'react';
import {
  RapiDocElement,
  RapiDocProps,
  RapiDocReact,
} from '@cdw/rapi-doc-react';

/* eslint-disable-next-line */
export interface ExampleProps {}

export function Example(props: ExampleProps) {
  return (
    <RapiDocReact
      specLoaded={(spec) => {
        console.log(spec);
      }}
      api-key-name="api_key"
      api-key-location="header"
      api-key-value="a-key-set-in-the-props"
      show-header={false}
      allow-server-selection={false}
      spec-url="https://petstore.swagger.io/v2/swagger.json"
      render-style="read"
      theme="dark"
      style={{ height: '100vh', width: '100%' }}
    />
  );
}

export default Example;
