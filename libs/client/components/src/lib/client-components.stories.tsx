import { Story, Meta } from '@storybook/react';
import { ClientComponents, ClientComponentsProps } from './client-components';

export default {
  component: ClientComponents,
  title: 'ClientComponents',
} as Meta;

const Template: Story<ClientComponentsProps> = (args) => (
  <ClientComponents {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
