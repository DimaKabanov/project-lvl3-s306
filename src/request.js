import axios from 'axios';

const getFeedData = (proxy, url) => (
  axios.get(`${proxy}${url}`)
    .then((response) => {
      const { data } = response;
      return data;
    })
);

export default getFeedData;
