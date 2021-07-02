import Wallet from "../components/Wallet";

export default {
  title: "App/Wallet  ",
  component: Wallet,
};

const Template = (args) => <Wallet {...args} />;

export const Default = Template.bind({});
