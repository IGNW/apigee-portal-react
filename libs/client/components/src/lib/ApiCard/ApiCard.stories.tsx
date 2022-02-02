import { Stack } from '@mui/material';
import { Story, Meta } from '@storybook/react';
import { ApiCard, ApiCardProps } from './ApiCard';

export default {
  component: ApiCard,
  title: 'ApiCard',
} as Meta;

const Template: Story<ApiCardProps> = (args) => (
  <Stack sx={{ padding: 2, maxWidth: '500px' }}>
    <ApiCard {...args} />
  </Stack>
);

export const Primary = Template.bind({});
Primary.args = {
  isPublic: true,
  name: 'My API',
  description: 'This is a description of my API',
};
