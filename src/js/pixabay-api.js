import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '8510354-a536a728c4badadcbc80336ea';

export async function getImagesByQuery(query, page) {
const response = await axios.get(BASE_URL, {
    params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
    },
});

return response.data;
}