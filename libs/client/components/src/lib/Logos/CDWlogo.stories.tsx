import { Story, Meta } from '@storybook/react';
import CDWLogo from './CDWlogo';

export default {
  component: CDWLogo,
  title: 'CDWLogo',
} as Meta;

const Template: Story = (args) => (
  <CDWLogo sx={{ width: '200px', height: '200px' }} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
