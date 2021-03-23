// сделать чтобы лайк и дизлайк нельзя было нажать дважды один и тот же

import './styles.css';
import template from './hbs_files/headTemplate.hbs';

const BASE_URL = 'https://api.imgflip.com/get_memes';
const containerRef = document.querySelector('.container');
const mainRef = document.querySelector('.main');
const mainImgCardRef = document.querySelector('.main-img-cards');
const basketRef = document.querySelector('.header-nav-button-basket');
const basketModal = document.querySelector('.basket-modal');
const closeModal = document.querySelector('.modal-close');
const currentLikesRef = document.querySelector('.current-number');
const basketModalContent = document.querySelector('.basket-modal-content');
let currentLikes = 0;
const arrOfImgUrl = {
  imgs: [],
};

let localStorageValue = localStorage.getItem('numberOfLikes');
currentLikesRef.innerHTML = localStorageValue;

fetch(`${BASE_URL}`)
  .then(response => {
    return response.json();
  })
  .then(answer => {
    const arr = answer.data.memes;

    // const templatedAnswer = template(arr[5]);
    // mainImgCardRef.insertAdjacentHTML('afterbegin', templatedAnswer);

    // const likeRef = document.querySelector('.like');
    // const dislikeRef = document.querySelector('.dislike');
    // const addToBasket = document.querySelector('.add-to-basket');

    // likeRef.addEventListener('click', addLike);
    // dislikeRef.addEventListener('click', deleteLike);
    // addToBasket.addEventListener('click', addToBasketFunc);

    arr.forEach(element => {
      const templatedAnswer = template(element);
      mainImgCardRef.insertAdjacentHTML('afterbegin', templatedAnswer);

      const likeRef = document.querySelector('.like');
      const dislikeRef = document.querySelector('.dislike');
      const addToBasket = document.querySelector('.add-to-basket');

      likeRef.addEventListener('click', addLike);
      dislikeRef.addEventListener('click', deleteLike);
      addToBasket.addEventListener('click', addToBasketFunc);
    });
  });

const openBasket = event => {
  basketModal.classList.add('is-open');
};

const closeBasket = event => {
  if (event) {
    basketModal.classList.remove('is-open');
  }
};

const addLike = event => {
  if (event) {
    currentLikes += 1;
    currentLikesRef.innerHTML = currentLikes;
    localStorage.setItem('numberOfLikes', `${currentLikes}`);
  }
};

const deleteLike = event => {
  if (currentLikes !== 0) {
    currentLikes -= 1;
    currentLikesRef.innerHTML = currentLikes;
    localStorage.setItem('numberOfLikes', `${currentLikes}`);
  }
};

const addToBasketFunc = event => {
  const settings = {
    targetImg: `${event.path[2].children[0].src}`,
  };

  // basketModalContent.insertAdjacentHTML(
  //   'afterbegin',
  //   `<img class="basket-img" src=${settings.targetImg} alt="">`,
  // );

  arrOfImgUrl.imgs.push(settings.targetImg);
  localStorage.setItem('imgsUrls', JSON.stringify(arrOfImgUrl));
  event.target.disabled = true;

  // const urls = localStorage.getItem('imgsUrls');
  // const parsedUrls = JSON.parse(urls);
  // const lastArrOfUrls = parsedUrls.imgs;
  // lastArrOfUrls.forEach(element =>
  //   basketModalContent.insertAdjacentHTML(
  //     'afterbegin',
  //     `<img class="basket-img" src=${element} alt="">`,
  //   ),
  // );
};

const savedQuantity = () => {
  if (localStorageValue) {
    currentLikes = parseInt(localStorageValue);
  }
};
savedQuantity();

const createBasketContent = () => {
  const urls = localStorage.getItem('imgsUrls');
  const parsedUrls = JSON.parse(urls);
  const lastArrOfUrls = parsedUrls.imgs;
  lastArrOfUrls.forEach(element =>
    basketModalContent.insertAdjacentHTML(
      'afterbegin',
      `<img class="basket-img" src=${element} alt="">`,
    ),
  );
};
createBasketContent();

basketRef.addEventListener('click', openBasket);
closeModal.addEventListener('click', closeBasket);
