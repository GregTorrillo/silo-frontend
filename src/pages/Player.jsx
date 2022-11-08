import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";
import { tablet } from "../responsive";
import { mobile } from "../responsive";

export default function Player() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoPlay loop controls muted />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    ${tablet({ height: "100%" })}
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      ${tablet({ padding: "1rem" })}
      ${mobile({ padding: ".5rem" })}
      svg {
        font-size: 3rem;
        cursor: pointer;
        ${tablet({ fontSize: "2rem" })}
        ${mobile({ fontSize: "1.5rem" })}
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
