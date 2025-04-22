import axios from 'axios';

// const API_KEY = '48187645-2fe8d1ae3615e126e0d343d6c';
// const BASE_URL = 'https://pixabay.com/api/';

// export function fetchPhotosByQuery(query, currentPage) {
//   const axiosOptions = {
//     params: {
//       key: API_KEY,
//       page: currentPage,
//       per_page: 15,
//       q: query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//     },
//   };

//   return axios.get(`${BASE_URL}`, axiosOptions);
// };

// import axios from 'axios';

const API_KEY = '48187645-2fe8d1ae3615e126e0d343d6c';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPhotosByQuery(query, currentPage) {
  const axiosOptions = {
    params: {
      key: API_KEY,
      page: currentPage,
      per_page: 15,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  const response = await axios.get(BASE_URL, axiosOptions);
  return response;
}
