import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaSearch } from "react-icons/fa";
import { laptop } from "../responsive";
import { tablet } from "../responsive";
import { mobile } from "../responsive";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "Series", link: "/series" },
    { name: "Shorts", link: "/shorts" },
    { name: "My List", link: "/mylist" },
  ];

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img className="logo" src={logo} alt="Logo" />
          </div>
        </div>
        <div className="center">
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
          </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button className="buttonSignOut" onClick={() => signOut(firebaseAuth)}>
            Sign Out
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    background: linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 100%);
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem 0 3rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    ${laptop({ paddingLeft: "1rem", paddingRight: "3rem", height: "4rem" })}
    ${tablet({ paddingLeft: "1rem", paddingRight: "2rem", height: "4rem" })}
    ${mobile({ paddingLeft: "0", paddingRight: "1rem", height: "4rem" })}
    .left {
      .brand {
        img {
          height: 4rem;
          ${mobile({ height: "2.5rem" })}
        }
      } 
    }
    .center {
      .links {
        font-size: 1.5rem;
        text-shadow: 1px 1px 3px #000000;
        list-style-type: none;
        gap: 4rem;
        ${laptop({ gap: "2rem", fontSize: "1.25rem" })}
        ${tablet({ gap: "2rem", fontSize: "1.25rem" })}
        ${mobile({ gap: ".65rem", fontSize: ".75rem"})}
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      ${mobile({ gap: "0"})}
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        ${mobile({ padding: "0"})}
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
            ${tablet({ visibility: "hidden" })}
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        padding: 0.5rem 1.5rem;
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 2rem;
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
      .buttonSignOut {
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
        ${mobile({ paddingTop: ".5rem", paddingBottom: ".5rem", paddingLeft: ".5rem", paddingRight: ".5rem", fontSize: ".65rem", borderRadius: ".5rem"})}
      }
    }
  }
`;

