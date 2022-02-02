import { Story, Meta } from '@storybook/react';
import { Registration, RegistrationProps } from './Registration';

export default {
  component: Registration,
  title: 'Registration',
} as Meta;

const Template: Story<RegistrationProps> = (args) => <Registration {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
