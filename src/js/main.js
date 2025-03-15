import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '49342840-003e2c292237fbf09de0074d9';
const BASE_URL = 'https://pixabay.com/api/';

const formSearch = document.querySelector('.form');
const listImages = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';
formSearch.addEventListener('submit', onSearch);

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function onSearch(event) {
  event.preventDefault();
  listImages.innerHTML = '';
  showLoader();

  const inputValue = event.target.elements['search-text'].value.trim();
  if (!inputValue) {
    iziToast.error({
      title: 'Error',
      message: 'Input cannot be empty!',
      color: '#ff0000',
    });
    hideLoader();
    return;
  }

  getPictures(inputValue)
    .then(data => {
      hideLoader();

      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      listImages.innerHTML = createMarkup(data.hits);

      const lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
      lightbox.refresh();

      formSearch.reset();
    })
    .catch(error => {
      hideLoader();
      iziToast.error({ title: 'Error', message: error.message });
    });
}

async function getPictures(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch images');
  }
}

function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" />
        </a>
        <div class="thumb-block">
          <div class="block"><h2 class="title">Likes</h2><p class="amount">${likes}</p></div>
          <div class="block"><h2 class="title">Views</h2><p class="amount">${views}</p></div>
          <div class="block"><h2 class="title">Comments</h2><p class="amount">${comments}</p></div>
          <div class="block"><h2 class="title">Downloads</h2><p class="amount">${downloads}</p></div>
        </div>
      </li>`
    )
    .join('');
}
