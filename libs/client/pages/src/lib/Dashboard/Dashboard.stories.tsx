import { Story, Meta } from '@storybook/react';
import { Dashboard, DashboardProps } from './Dashboard';

export default {
  component: Dashboard,
  title: 'Dashboard',
} as Meta;

const Template: Story<DashboardProps> = (args) => <Dashboard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
