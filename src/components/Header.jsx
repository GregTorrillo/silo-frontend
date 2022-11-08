import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { laptop } from "../responsive";
import { tablet } from "../responsive";
import { mobile } from "../responsive";

export default function Header(props) {
  const navigate = useNavigate();
  
  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </StyledHeader>
  );
}
const StyledHeader = styled.header`
  padding: 0 4rem 0 3rem;
  ${laptop({ paddingLeft: "1rem", paddingRight: "3rem"})}
  ${tablet({ paddingLeft: "1rem", paddingRight: "3rem"})}
  ${mobile({ paddingLeft: "0", paddingRight: "2rem"})}
  .logo {
    img {
      height: 5rem;
      ${mobile({height: "4rem"})}
    }
  }
  button {
    padding: 0.65rem 1.5rem;
    background-color: #475963;
    border: 1px solid #475963;
    cursor: pointer;
    color: white;
    border-radius: 2rem;
    font-weight: 500;
    font-size: 1.05rem;
    &:hover {
      background-color: transparent;
      border: 1px solid white;
    }
    ${mobile({fontSize: "1rem", paddingTop: ".5rem", paddingBottom: ".5rem", paddingLeft: "1rem", paddingRight: "1rem"})}
  }
`;
