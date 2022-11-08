import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { laptop } from "../responsive";
import { tablet } from "../responsive";
import { mobile } from "../responsive";

function ShortsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.silo.movies);
  const genres = useSelector((state) => state.silo.genres);
  const genresLoaded = useSelector((state) => state.silo.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genresLoaded]);

  const [user, setUser] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  background: radial-gradient(ellipse at center, #475963 0%, #0B0F12 100%);
  .data {
    margin-top: 8rem;
    padding-top: 3rem;
    ${laptop({ marginTop: "4rem", paddingTop: "2rem"})}
    ${tablet({ paddingTop: "2rem"})}
    ${mobile({ paddingTop: "1.5rem"})}
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
export default ShortsPage;
