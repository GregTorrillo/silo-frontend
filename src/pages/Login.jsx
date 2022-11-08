import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { laptop } from "../responsive";
import { tablet } from "../responsive";
import { mobile } from "../responsive";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.code);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <h1>Stream the best short films and series</h1>
            <h3>Artists telling stories</h3>
            <h2>LOGIN</h2>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={handleLogin}>Login to your account</button>
            </div>
          </div>
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
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    // grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 1rem;
      height: 85vh;
      ${laptop({ height: "80vh" })}
      ${mobile({ height: "70vh" })}
      .form {
        gap: 1rem;
        color: white;
        text-align: center;
        h1 {
          font-size: 4rem;
          text-shadow: 1px 1px 5px #000000;
          ${laptop({ fontSize: "2.5rem" })}
          ${tablet({ fontSize: "2.25rem" })}
          ${mobile({ fontSize: "1.5rem", paddingLeft: "1rem", paddingRight: "1rem" })}
        }
        h3 {
          font-size: 2.25rem;
          color: #B08B5B;
          ${laptop({ fontSize: "1.45rem" })}
          ${mobile({ fontSize: ".85rem" })}
        }
        h2 {
          font-size: 3rem;
          ${laptop({ fontSize: "2rem" })}
          ${mobile({ fontSize: "1.5rem" })}
        }
        .container {
          gap: 1.5rem;
          ${laptop({ gap: "1rem" })}
          ${mobile({ gap: ".75rem" })}
          input {
            padding: 1rem 1.25rem;
            width: 25rem;
            font-size: 1.25rem;
            border-radius: 2rem;
            &:focus {
              outline: none;
            }
            ${laptop({ width: "20rem", fontSize: "1rem", paddingTop: ".75rem", paddingBottom: ".75rem" })}
            ${mobile({ width: "18rem", fontSize: ".75rem", paddingTop: ".75rem", paddingBottom: ".75rem" })}
          }
          button {
            padding: 1rem 1.25rem;
            background-color: #475963;
            border: 1px solid #475963;
            cursor: pointer;
            color: white;
            border-radius: 2rem;
            font-weight: 500;
            font-size: 1.25rem;
            &:hover {
              background-color: transparent;
              border: 1px solid white;
            }
            ${laptop({width: "20rem", fontSize: "1rem", paddingTop: ".75rem", paddingBottom: ".75rem"})}
            ${mobile({ width: "18rem", fontSize: ".75rem", paddingTop: ".75rem", paddingBottom: ".75rem" })}
          }
        }
      }
    }
  }
`;

export default Login;
