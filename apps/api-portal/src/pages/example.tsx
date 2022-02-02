import React from 'react';
import { RapiDocReact } from '@cdw/rapi-doc-react';

/* eslint-disable-next-line */
export interface ExampleProps {}

export function Example(props: ExampleProps) {
  return (
    <RapiDocReact
      specLoaded={(spec) => {
        console.log(spec);
      }}
      show-header={false}
      spec-url="https://petstore.swagger.io/v2/swagger.json"
      render-style="read"
      theme="dark"
      style={{ height: '100vh', width: '100%' }}
    />
  );
}

export default Example;
