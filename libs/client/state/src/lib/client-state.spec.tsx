import { render } from '@testing-library/react';

import ClientState from './client-state';

describe('ClientState', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientState />);
    expect(baseElement).toBeTruthy();
  });
});
