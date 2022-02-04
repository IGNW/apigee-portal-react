import { Story, Meta } from '@storybook/react';
import { MicrosoftLogo } from './MicrosoftLogo';

export default {
  component: MicrosoftLogo,
  title: 'MicrosoftLogo',
} as Meta;

const Template: Story = (args) => <MicrosoftLogo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
