import styled from "styled-components";
import { Link } from "react-router-dom";

// const OptionContainerStyles = css`
//   padding: 10px 15px;
//   cursor: pointer;
// `;
//we want these styles for both link ele ad div ele so to reuse this style for 2 styled-components we use css from styled-components which allows us to write a block of css that we can pass in render as css in any styled-component

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;
// space-between so that logo and options are pushed apart

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;
//this is a link component(custom component) so we want to call styled like a function & pass it the component we want to wrap

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  ${"" /* ${OptionContainerStyles} */}
  padding: 10px 15px;
  cursor: pointer;
`;

// export const OptionDiv = styled.div`
//   ${OptionContainerStyles}
// `;
