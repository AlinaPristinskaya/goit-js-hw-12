import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const listGalleryCard = document.querySelector('.gallery');
const buttonLoadEl = document.querySelector('.button-load');
const loaderStyle = document.querySelector('.loader');

let query = '';
let page = 1;

const lightboxModalWindow = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearch);
buttonLoadEl.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  loaderStyle.style.display = 'block';
  listGalleryCard.innerHTML = '';
  page = 1;
  query = event.target.elements.query.value.trim();

  await searchImg();
}

async function onLoadMore() {
  page += 1;
  loaderStyle.style.display = 'block';
  await searchImg();
}

async function searchImg() {
  try {
    if (!query) {
      iziToast.warning({
        title: 'Warning',
        message: 'The search field is empty!',
        position: 'topRight',
      });
      loaderStyle.style.display = 'none';
      return;
    }

    const { data } = await fetchPhotosByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images match your search query. Please try again!',
        position: 'topRight',
      });
      loaderStyle.style.display = 'none';
      return;
    }

    listGalleryCard.insertAdjacentHTML(
      'beforeend',
      createGalleryCardTemplate(data.hits)
    );
    lightboxModalWindow.refresh();

    // Плавна прокрутка
    if (page > 1) {
      const galleryItems = document.querySelectorAll('.gallery-item');
      const lastCard = galleryItems[galleryItems.length - 1];
      if (lastCard) {
        const cardHeight = lastCard.getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }

    // Перевірка на кінець
    if (page * 15 >= data.totalHits) {
      iziToast.info({
        title: 'Info',
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
      buttonLoadEl.classList.add('is-hidden');
    } else {
      buttonLoadEl.classList.remove('is-hidden');
    }
  } catch (error) {
    console.error('❌ Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loaderStyle.style.display = 'none';
  }
}
