import axios from 'axios';

export const fetchGallery = async (query, page, perpage) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '32920278-ac1f185981fb853c8559f3f77',
      q: query,
      page: page,
      orientation: 'horizontal',
      image_type: 'photo',
      per_page: perpage,
    },
  });
  console.log(data.hits);
  return data.hits;
};

// import axios from 'axios';

// const API_KEY = '32920278-ac1f185981fb853c8559f3f77';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

// axios.defaults.params = {
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
// };

// export async function fetchGallery(name, page, perpage) {
//   const { data } = await axios.get(
//     `?q=${name}&page=${page}&per_page=${perpage}`
//   );
//   console.log(data.hits);
//   return data.hits;
// }
