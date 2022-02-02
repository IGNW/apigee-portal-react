import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  color: pink;
`;

export function Login(props: LoginProps) {
  return (
    <StyledLogin>
      <h1>Welcome to Login!</h1>
    </StyledLogin>
  );
}

export default Login;
