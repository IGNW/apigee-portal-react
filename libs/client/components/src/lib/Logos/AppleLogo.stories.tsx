import { Story, Meta } from '@storybook/react';
import { AppleLogo } from './AppleLogo';

export default {
  component: AppleLogo,
  title: 'AppleLogo',
} as Meta;

const Template: Story = (args) => <AppleLogo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
