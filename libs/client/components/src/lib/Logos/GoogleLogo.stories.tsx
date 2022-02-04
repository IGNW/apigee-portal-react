import { Story, Meta } from '@storybook/react';
import { GoogleLogo } from './GoogleLogo';

export default {
  component: GoogleLogo,
  title: 'GoogleLogo',
} as Meta;

const Template: Story = (args) => <GoogleLogo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
