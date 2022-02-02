import { Story, Meta } from '@storybook/react';
import { Apps, AppsProps } from './Apps';

export default {
  component: Apps,
  title: 'Apps',
} as Meta;

const Template: Story<AppsProps> = (args) => <Apps {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
