import MenuItemList from "../components/MenuItemList";

export default {
  title: "App/MenuItemList  ",
  component: MenuItemList,
  argTypes: { onClick: { action: "clicked" } },
};

const Template = (args) => <MenuItemList {...args} />;

export const Default = Template.bind({});
