import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
createGallery,
clearGallery,
showLoader,
hideLoader,
showLoadMoreButton,
hideLoadMoreButton,
} from './js/render-functions';

import { getImagesByQuery } from './js/pixabay-api';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
event.preventDefault();

query = event.target.elements['search-text'].value.trim();
if (!query) {
iziToast.error({
    message: 'Please enter a search query!',
});
return;
}

page = 1;
clearGallery();
hideLoadMoreButton();
showLoader();

try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
    hideLoader();
    iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
}

createGallery(data.hits);

    if (page * 15 < totalHits) {
        showLoadMoreButton();
    }
    } catch (error) {
        iziToast.error({ message: 'Something went wrong...' });
    } finally {
    hideLoader();
}
}

async function onLoadMore() {
page += 1;
showLoader();

try {
const data = await getImagesByQuery(query, page);

createGallery(data.hits);

const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
    window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
});

if (page * 15 >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
    });
    }
    } catch (error) {
        iziToast.error({ message: 'Something went wrong...' });
    } finally {
    hideLoader();
}
}