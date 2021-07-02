import React from "react";

import { NavBar } from "./NavBar";

export default {
  title: "Example/NavBar  ",
  component: NavBar,
};

const Template = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
