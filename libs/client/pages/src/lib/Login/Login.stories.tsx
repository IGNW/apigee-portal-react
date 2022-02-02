import { Story, Meta } from '@storybook/react';
import { Login, LoginProps } from './Login';

export default {
  component: Login,
  title: 'Login',
} as Meta;

const Template: Story<LoginProps> = (args) => <Login {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
