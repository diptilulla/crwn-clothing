import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

//WithSpinner hoc takes some component (here wrappedComponet) as argument, returns a new functional component(Spinner), component gets an isLoading property and every other prop the wrappen component needs
const WithSpinner = (WrappedComponent) => {
  //wrappedComponent gets passed into new component that wraps around it
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner; //we are getting a functional spinner compoenent back from hoc withSpinner, spinner componenet is similar to the object being wrappen component except isLoading props
};

export default WithSpinner;
