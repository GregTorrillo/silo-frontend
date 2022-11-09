import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { laptop } from "../responsive";
import { mobile } from "../responsive";

export default function UserListedMovies() {
  const movies = useSelector((state) => state.silo.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    padding: 3rem 5rem;
    margin-top: 8rem;
    gap: 3rem;
    ${laptop({ marginTop: "4rem", gap: "2rem", paddingTop: "2rem" })}
    ${mobile({ gap: "1rem", paddingTop: "1rem" })}
    h1 {
      font-size: 2.5rem;
      ${laptop({ fontSize: "2rem" })}
      ${mobile({ fontSize: "1.5rem" })}
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
