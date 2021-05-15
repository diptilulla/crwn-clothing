import React from "react";

import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({  children, ...props  }) => (
  <CustomButtonContainer {...props}>
    {children}
  </CustomButtonContainer> //both button and input type submit can trigger form submit action
);

export default CustomButton;
