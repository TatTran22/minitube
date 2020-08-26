import axios from 'axios';
const KEY = 'AIzaSyBwFQ-sefzkTNyzeaRFmjiAg8pfGDIod3g';
export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: KEY,
  },
});
