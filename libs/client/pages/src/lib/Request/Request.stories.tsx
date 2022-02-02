import { Story, Meta } from '@storybook/react';
import { Request, RequestProps } from './Request';

export default {
  component: Request,
  title: 'Request',
} as Meta;

const Template: Story<RequestProps> = (args) => <Request {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
