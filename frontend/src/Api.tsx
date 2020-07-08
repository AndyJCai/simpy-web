import axios from "axios";

export const apiUrl = process.env.NODE_ENV == 'production' ? 'placeholder' : 'http://localhost:8888';

// GET function to get user's top artists
export const getUserTopArtists = function() {
  axios.get(apiUrl + "/top/artists").then(res => {
    const data = res.data;
    console.log(data);
  });
};

// GET function to get user's top tracks
export const getUserTopTracks = function() {
  axios.get(apiUrl + "/top/tracks").then(res => {
    const data = res.data;
    console.log(data);
  });
};
