import { Story, Meta } from '@storybook/react';
import { Catalog, CatalogProps } from './Catalog';

export default {
  component: Catalog,
  title: 'Catalog',
} as Meta;

const Template: Story<CatalogProps> = (args) => <Catalog {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
