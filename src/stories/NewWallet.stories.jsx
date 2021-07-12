import NewWallet from "../components/Wallet/NewWallet";

export default {
  title: "App/NewWallet  ",
  component: NewWallet,
};

const Template = (args) => <NewWallet {...args} />;

export const Default = Template.bind({});
