import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constant";

// CurrentTrack component fetches and displays the currently playing track
export default function CurrentTrack() {
  // Use the state provider to access global state and dispatch actions
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        // Fetch the currently playing track details from Spotify API
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data !== "") {
          // Extract track information from the API response
          const { item } = response.data;
          const currentlyPlaying = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist) => artist.name),
            image: item.album.images[2].url,
          };
          // Dispatch action to update the currently playing track in the state
          dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        }
      } catch (error) {
        // Handle any errors that occur during the fetch request
        console.error(
          "Error fetching current track:",
          error.response ? error.response.data : error.message
        );
      }
    };

    // Fetch the current track on component mount and when token or dispatch changes
    getCurrentTrack();
  }, [token, dispatch, currentlyPlaying]);

  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currently playing" />
          </div>
          <div className="track__info">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
}

// Styled component for displaying the currently playing track
const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;
