import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface LoginFormProps {}

const StyledLoginForm = styled.div`
  color: pink;
`;

export function LoginForm(props: LoginFormProps) {
  return (
    <StyledLoginForm>
      <h1>Welcome to LoginForm!</h1>
    </StyledLoginForm>
  );
}

export default LoginForm;
