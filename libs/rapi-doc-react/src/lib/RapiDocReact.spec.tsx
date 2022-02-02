import { render } from '@testing-library/react';

import RapiDocReact from './RapiDocReact';

describe('RapiDocReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RapiDocReact />);
    expect(baseElement).toBeTruthy();
  });
});
