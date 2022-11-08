import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundVideo from "../assets/home.mp4";
import MovieLogo from "../assets/homeTitle.png";
import Slider from "../components/Slider";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { laptop } from "../responsive";
import { tablet } from "../responsive";
import { mobile } from "../responsive";

function Silo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.silo.movies);
  const genres = useSelector((state) => state.silo.genres);
  const genresLoaded = useSelector((state) => state.silo.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
    // eslint-disable-next-line
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <video
          src={backgroundVideo}
          height="100%"
          width="100%"
          autoPlay
          loop
          muted
        ></video>
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
   background: radial-gradient(ellipse at center, #475963 0%, #0B0F12 100%);
  .hero {
    position: relative;
    height: 100vh;
    width: 100vw;
    margin-bottom: 2rem;
    ${tablet({ height: "100%" })}
    ${mobile({ marginBottom: "1rem" })}
    video {
      object-fit: cover;
      object-position: center;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      ${laptop({ bottom: "2rem" })}
      ${mobile({ bottom: "0" })}
      .logo {
        width: 65%;
        ${laptop({ width: "50%" })}
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
          ${laptop({ marginLeft: "2rem" })}
          ${mobile({ marginLeft: "1rem", marginBottom: "-.5rem" })}
        }
      }
      .buttons {
        margin-left: 5rem;
        margin-top: 3rem;
        gap: 2rem;
        ${laptop({ gap: "1rem", marginLeft: "2rem", marginTop: "1rem" })}
        ${mobile({ gap: ".5rem", marginBottom: "1rem", marginLeft: "1rem", marginTop: "1rem" })}
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: 1px solid white;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          ${laptop({ fontSize: "1rem", paddingLeft: "1rem", paddingRight: "1.25rem"})}
          ${mobile({ fontSize: ".5rem", paddingLeft: ".5rem", paddingRight: ".75rem", paddingTop: ".5rem", paddingBottom: ".5rem", gap: ".35rem"})}
          &:hover {
            background-color: transparent;
            border: 1px solid white;
            color: white;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            border: 1px solid rgba(109, 109, 110, 0.7);
            color: white;
            &:hover {
              background-color: transparent;
              border: 1px solid white;
              color: white;
            }
            svg {
              font-size: 1.8rem;
              ${mobile({ fontSize: ".5rem" })}
            }
          }
        }
      }
    }
  }
`;
export default Silo;
