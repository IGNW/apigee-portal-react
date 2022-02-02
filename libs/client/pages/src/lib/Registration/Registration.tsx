import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface RegistrationProps {}

const StyledRegistration = styled.div`
  color: pink;
`;

export function Registration(props: RegistrationProps) {
  return (
    <StyledRegistration>
      <h1>Welcome to Registration!</h1>
    </StyledRegistration>
  );
}

export default Registration;
