import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constant";
import { AiFillClockCircle } from "react-icons/ai";

// Body component fetches the selected playlist details from Spotify API
// and renders the playlist information including image, name, description,
// and a list of tracks with their details.
export default function Body({ headerBackground }) {
  // Use the state provider to access global state and dispatch actions
  const [{ token, selectedPlayListId, selectedPlayList }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlayList = async () => {
      // Fetch playlist details using Spotify API and token for authorization
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlayListId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      // Create a selectedPlayList object with necessary playlist details
      const selectedPlayList = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? "" // Handle cases where description might be HTML
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };

      // Dispatch action to set the fetched playlist in the state
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlayList });
    };

    // Call the function to fetch playlist details
    getInitialPlayList();
  }, [token, dispatch, selectedPlayListId]);

  // Function to convert milliseconds to minutes and seconds
  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  // Function to play a track on Spotify
  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    try {
      // Send request to start playback of a track
      const response = await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          context_uri,
          offset: {
            position: track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        // Dispatch actions to update the currently playing track and player state
        const currentlyPlaying = {
          id,
          name,
          artists,
          image,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      } else {
        console.log("Playback did not start. Status code:", response.status);
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
      }
    } catch (error) {
      // Handle any errors that occur during playback
      console.error(
        "Error playing track:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Render the playlist details if available
  return (
    <Container headerBackground={headerBackground}>
      {selectedPlayList && (
        <>
          <div className="playList">
            <div className="image">
              <img src={selectedPlayList.image} alt="selectedplaylist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlayList.name}</h1>
              <p className="description">{selectedPlayList.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlayList.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>{" "}
                        {/* Formatting track duration */}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

// Styled component for container and other nested elements
const Container = styled.div`
  .playList {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"}; // Dynamic header background
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`; // Add the styled div syntax
