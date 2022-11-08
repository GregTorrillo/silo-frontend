import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { laptop } from "../responsive";
import { tablet } from "../responsive";
import { mobile } from "../responsive";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Stream the best short films and series</h1>
            <h3>Artists telling stories</h3>
            <h5>REGISTER FOR FREE</h5>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignIn}>Log In</button>}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 7.65vh 85vh;
    ${laptop({ gridTemplateRows: "13.9vh" })}
    ${tablet({ gridTemplateRows: "10vh" })}
    .body {
      gap: 1rem;
      ${tablet({ paddingBottom: "7rem"})}
      ${mobile({ gap: ".35rem", paddingBottom: "12rem"})}
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        ${laptop({ fontSize: "1.25rem" })}
        ${tablet({ fontSize: "1.1rem" })}
        ${mobile({ fontSize: ".75rem", paddingLeft: "1rem", paddingRight: "1rem"})}
        h3 {
          color: #B08B5B;
        }
      }
      .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          width: 40%;
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          border-radius: 2rem;
          margin: .5rem;
          &:focus {
            outline: none;
          }
          ${laptop({ width: "60%", padding: "1rem", fontSize: "1rem" })}
          ${tablet({ width: "60%", padding: "1rem", fontSize: "1rem" })}
          ${mobile({ width: "100%", padding: ".75rem", fontSize: ".75rem" })}
        }
        button {
          width: 40%;
          padding: 1.5rem;
          background-color: #475963;
          border: 1px solid #475963;
          border-radius: 2rem;
          cursor: pointer;
          color: white;
          font-weight: 600;
          font-size: 1.5rem;
          margin: .5rem;
          &:hover {
            background-color: transparent;
            border: 1px solid white;
          }
          ${laptop({ width: "60%", padding: "1rem", fontSize: "1.25rem" })}
          ${tablet({ width: "60%", padding: "1rem", fontSize: "1rem" })}
          ${mobile({ width: "100%", padding: ".75rem", fontSize: ".75rem" })}
        }
      }
      button {
        width: 10%;
        padding: 1.5rem;
        background-color: #475963;
        border: 1px solid #475963;
        border-radius: 2rem;
        cursor: pointer;
        color: white;
        font-weight: 600;
        font-size: 1.5rem;
        &:hover {
          background-color: transparent;
          border: 1px solid white;
        }
        ${laptop({ width: "20%", padding: "1rem", fontSize: "1.25rem" })}
        ${tablet({ width: "20%", padding: "1rem", fontSize: "1.25rem" })}
        ${mobile({ width: "30%", padding: ".75rem", fontSize: ".75rem" })}
      }
      }
    }
  }
`;

export default Signup;
