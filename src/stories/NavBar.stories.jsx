import NavBar from "../components/NavBar";

export default {
  title: "App/NavBar  ",
  component: NavBar,
  argTypes: { onClick: { action: "clicked" } },
};

const Template = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
