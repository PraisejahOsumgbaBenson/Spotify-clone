import React from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";

// Footer component renders the footer section of the application
export default function Footer() {
  return (
    <Container>
      {/* Render the current track information */}
      <CurrentTrack />
      {/* Render player controls (play, pause, next, previous, etc.) */}
      <PlayerControls />
      {/* Render volume control */}
      <Volume />
    </Container>
  );
}

// Styled component for the footer container
const Container = styled.div`
  background-color: #181818; 
  height: 100%; 
  width: 100%; 
  border-top: 1px solid #282828; 
  display: grid; 
  grid-template-columns: 1fr 2fr 1fr; 
  align-items: center; 
  justify-content: center; 
  padding: 0 1rem; 
`;
