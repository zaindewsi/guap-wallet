import NavBar from "../components/NavBar";

export default {
  title: "Example/NavBar  ",
  component: NavBar,
  argTypes: { onClick: { action: "clicked" } },
};

const Template = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
