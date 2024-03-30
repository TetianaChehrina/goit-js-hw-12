import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import { galleryElement } from './js/render-functions';
import { showEndOfCollectionMessage } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const inputElement = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');
const scrollToTopBtn = document.querySelector('.scroll-to-top');

function showLoader() {
  loader.classList.remove('.is-hidden');
}

function hideLoader() {
  loader.classList.add('.is-hidden');
}

hideLoader();

let searchTerm = '';
let pageCounter = 1;
const perPage = 15;

searchForm.addEventListener('submit', submitHandle);

async function submitHandle(event) {
  event.preventDefault();
  searchTerm = inputElement.value.trim();
  pageCounter = 1;

  galleryElement.innerHTML = '';

  if (searchTerm === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please complete the field.',
      position: 'topCenter',
    });
    hideLoadMoreBtn();
    return;
  }

  hideEndOfCollectionMessage();

  showLoader();
  try {
    const images = await fetchImages(searchTerm, pageCounter, perPage);
    const totalHits = images.totalHits;

    if (images.hits.length === 0) {
      galleryElement.innerHTML = '';
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadMoreBtn();
      return;
    } else {
      renderGallery(images.hits);
      inputElement.value = '';
      showLoadMoreBtn();
    }
    if (perPage * pageCounter >= totalHits) {
      hideLoadMoreBtn();
      showEndOfCollectionMessage();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topCenter',
    });
  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', async () => {
  try {
    if (loadMoreBtn) {
      pageCounter += 1;
    }
    const images = await fetchImages(searchTerm, pageCounter, perPage);
    const totalHits = images.totalHits;

    renderGallery(images.hits);
    showLoader();
    if (perPage * pageCounter >= totalHits) {
      hideLoadMoreBtn();
      showEndOfCollectionMessage();
    }

    const galleryCardHeight =
      galleryElement.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({ top: galleryCardHeight * 3, behavior: 'smooth' });
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({
      title: 'Error',
      message: `Error fetching more images: ${error}`,
    });
  } finally {
    hideLoader();
  }
});

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function hideEndOfCollectionMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.remove();
  }
}

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    scrollToTopBtn.style.display = 'flex';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

scrollToTopBtn.addEventListener('click', scrollToTop);
