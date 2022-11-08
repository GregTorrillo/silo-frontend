import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";

export default function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <Container>
      <CardSlider data={getMoviesFromRange(0, 10)} title="New Releases" />
      <CardSlider data={getMoviesFromRange(10, 20)} title="Popular on Silo" />
      <CardSlider data={getMoviesFromRange(20, 30)} title="Oscar and BAFTA Awards" />
      <CardSlider data={getMoviesFromRange(30, 40)} title="Film Festival Winners" />
      <CardSlider data={getMoviesFromRange(40, 50)} title="Films under 5 mins" />
      <CardSlider data={getMoviesFromRange(50, 60)} title="Films 5 - 10 mins" />
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 3rem;
`;
