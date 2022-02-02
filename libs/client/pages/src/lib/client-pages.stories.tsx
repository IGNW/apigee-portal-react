import { Story, Meta } from '@storybook/react';
import { ClientPages, ClientPagesProps } from './client-pages';

export default {
  component: ClientPages,
  title: 'ClientPages',
} as Meta;

const Template: Story<ClientPagesProps> = (args) => <ClientPages {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
