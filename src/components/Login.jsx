import React from "react";
import styled from "styled-components";
import spotifyLogo from "../assets/Spotify-logo.png";

// Login component handles user authentication with Spotify
export default function Login() {
  const handleClick = () => {
    // Define necessary parameters for Spotify authorization
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUrl = "http://localhost:3000/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-read-recently-played",
      "user-top-read",
    ];

    // Redirect the user to Spotify's authorization page
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <Container>
      {/* Display the Spotify logo */}
      <img src={spotifyLogo} alt="Spotify Logo" />
      {/* Button to connect with Spotify */}
      <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  );
}

// Styled component for the login page container
const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center; 
  height: 100vh; 
  background-color: #1db954; 
  gap: 5rem;

  img {
    height: 20vh; 
  }

  button {
    padding: 1rem 5rem; 
    border-radius: 5rem; 
    border: none; 
    background-color: black; 
    color: #49f585; 
    font-size: 1.4rem;
    cursor: pointer; 
  }
`;
