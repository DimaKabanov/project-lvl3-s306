import axios from 'axios';

const proxy = 'https://thingproxy.freeboard.io/fetch/';

export default url => (
  axios.get(`${proxy}${url}`)
    .then((response) => {
      const { data } = response;
      return data;
    })
);
