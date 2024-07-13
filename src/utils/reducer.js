import { reducerCases } from "./Constant";

// Initial state with properties for token, playlists, userInfo, selectedPlayListId, and selectedPlayList
export const initialSate = {
  token: null,
  playlists: [], // Array to store playlists
  userInfo: null, // Object to store user information
  selectedPlayListId: "6VoB9eBTXefcST5sV6KtdH", // Default selected playlist ID
  selectedPlayList: null, // Object to store selected playlist details
};

// Reducer function to handle state transitions based on action types
const reducer = (state, action) => {
  switch (action.type) {
    // Case to set the token in the state
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    // Case to set playlists in the state
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    // Case to set user information in the state
    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    // Case to set the selected playlist in the state
    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlayList: action.selectedPlayList,
      };
    }
    // Default case returns the current state if no matching action type is found
    default:
      return state;
  }
};

export default reducer;
