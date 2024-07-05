import React from "react"
import styled from "styled-components";
import spotifyLogo from "../assets/Spotify-logo.png";
export default function Login(){
    const handleClick=() =>{
      const clientId = "320d864a976a459d82cac46e6145b4ca";
      const redirectUrl = "http://localhost:3000/";
      const apiUrl = "https://accounts.spotify.com/authorize";
    };
    return (
    <Container>
        <img src={spotifyLogo} alt=""/>
        <button onClick={handleClick}>Connect Spotify</button>
    </Container>
 );
}

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
height:100vh;
width:100vh;
background-color:#1db954;
gap:5rem;
img {
  height:20vh;
}
button {
  padding:1rem 5rem;
  border-radius: 5rem;
  border:none;
  background-color:black;
  color:#49f585;
  font-size: 1.4rem;
  cursor:pointer
  }
`;