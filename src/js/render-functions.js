import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

export const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function clearGallery() {
    gallery.innerHTML = '';
}

export function createGallery(images) {
const markup = images
    .map(img => `
        <li class="gallery-item">
            <a href="${img.largeImageURL}">
                <img src="${img.webformatURL}" alt="${img.tags}" />
            </a>
            <ul class="info">
                <li><span>Likes:</span> ${img.likes}</li>
                <li><span>Views:</span> ${img.views}</li>
                <li><span>Comments:</span> ${img.comments}</li>
                <li><span>Downloads:</span> ${img.downloads}</li>
            </ul>
        </li>`
    ).join('');

gallery.insertAdjacentHTML('beforeend', markup);
lightbox.refresh();
}

export function showLoader() {
loader.classList.add('is-visible');
}

export function hideLoader() {
loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
loadMoreBtn.classList.add('visible');
}

export function hideLoadMoreButton() {
loadMoreBtn.classList.remove('visible');
}