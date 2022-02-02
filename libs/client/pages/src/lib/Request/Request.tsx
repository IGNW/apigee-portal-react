import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface RequestProps {}

const StyledRequest = styled.div`
  color: pink;
`;

export function Request(props: RequestProps) {
  return (
    <StyledRequest>
      <h1>Welcome to Request!</h1>
    </StyledRequest>
  );
}

export default Request;
