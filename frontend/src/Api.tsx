import axios from "axios";

const stagingUrl = "https://localhost:8888";

// GET function to get user's top artists
export const getUserTopArtists = function() {
  axios.get(stagingUrl + "/top/artists").then(res => {
    const data = res.data;
    console.log(data);
  });
};

// GET function to get user's top tracks
export const getUserTopTracks = function() {
  axios.get(stagingUrl + "/top/tracks").then(res => {
    const data = res.data;
    console.log(data);
  });
};
