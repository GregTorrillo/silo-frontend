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
import { laptop } from "../responsive";
import { tablet } from "../responsive";
import { mobile } from "../responsive";

function Series() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.silo.movies);
  const genres = useSelector((state) => state.silo.genres);
  const genresLoaded = useSelector((state) => state.silo.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
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
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            No shorts avaialble for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  background: radial-gradient(ellipse at center, #475963 0%, #0B0F12 100%);
  .data {
    margin-top: 8rem;
    padding-top: 3rem;
    ${laptop({ marginTop: "4rem"})}
    ${tablet({ paddingTop: "2rem"})}
    ${mobile({ paddingTop: "1.5rem"})}
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
export default Series;
