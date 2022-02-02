import { Story, Meta } from '@storybook/react';
import { LoginForm, LoginFormProps } from './LoginForm';

export default {
  component: LoginForm,
  title: 'LoginForm',
} as Meta;

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
