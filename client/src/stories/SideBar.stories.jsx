import SideBar from "../components/SideBar";

export default {
  title: "App/SideBar  ",
  component: SideBar,
  argTypes: { onClick: { action: "clicked" } },
};

const Template = (args) => <SideBar {...args} />;

export const Default = Template.bind({});
