import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const formSearchCard = document.querySelector('.form');
const listGalleryCard = document.querySelector('.gallery');
const loaderStyle = document.querySelector('.loader');
const buttonLoadEl = document.querySelector('.button-load');

let page = 1;
let query = '';

loaderStyle.style.display = 'none';
buttonLoadEl.classList.add('is-hidden');

const lightboxModalWindow = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionsPosition: 'bottom',
  captionsDelay: 250,
});

const searchImg = async event => {
  try {
    event.preventDefault();

    query = event.target.query.value.trim();

    listGalleryCard.innerHTML = '';

    if (!query) {
      iziToast.show({
        backgroundColor: '#ef4040',
        message: `Please fill in the field to search for data!`,
        borderBottom: '2px solid #ffbebe',
        borderRadius: '4px',
        padding: '20px',
        width: '432px',
        height: '88px',
        color: '#fafafb',
        position: 'topRight',
      });
      return;
    }

    loaderStyle.style.display = 'inline-block';

    page = 1;

    buttonLoadEl.classList.add('is-hidden');

    const { data } = await fetchPhotosByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.show({
        backgroundColor: '#ef4040',
        borderBottom: '2px solid #ffbebe',
        borderRadius: '4px',
        padding: '20px',
        width: '432px',
        height: '88px',
        color: '#fafafb',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
      return;
    }

    listGalleryCard.insertAdjacentHTML(
      'beforeend',
      createGalleryCardTemplate(data.hits)
    );

    if (data.totalHits > page * 15) {
      buttonLoadEl.classList.remove('is-hidden');
    }
    lightboxModalWindow.refresh();
    
  } catch (error) {
    console.error(error.message);
  } finally {
    loaderStyle.style.display = 'none';
  }
  event.target.reset();
};

formSearchCard.addEventListener('submit', searchImg);

const onButtonLoadClick = async () => {
  try {
    page++;
    const { data } = await fetchPhotosByQuery(query, page);
    listGalleryCard.insertAdjacentHTML(
      'beforeend',
      createGalleryCardTemplate(data.hits)
    );

    if (page * 15 >= data.totalHits || data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        position: 'topRight',
        message: "There are no more images matching your request.",
      });
      
      buttonLoadEl.classList.add('is-hidden');
      return;

    }
    const smoothScroll = document.querySelector('.gallery-item');
    if(smoothScroll) {
     const cardHeight = smoothScroll.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      }); 
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'The image you requested could not be loaded. Please try again later.',
    });
  }
};

      buttonLoadEl.addEventListener('click', onButtonLoadClick);