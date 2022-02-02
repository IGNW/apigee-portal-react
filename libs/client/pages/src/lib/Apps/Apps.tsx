import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface AppsProps {}

const StyledApps = styled.div`
  color: pink;
`;

export function Apps(props: AppsProps) {
  return (
    <StyledApps>
      <h1>Welcome to Apps!</h1>
    </StyledApps>
  );
}

export default Apps;
