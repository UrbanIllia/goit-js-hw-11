import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { createMarkup } from './js/render-functions';
import { getPictures } from './js/pixabay-api';

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
