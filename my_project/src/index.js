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
const claerBasketRef = document.querySelector('.clear-basket');
let currentLikes = 0;
let localStorageValue = localStorage.getItem('numberOfLikes');
currentLikesRef.innerHTML = localStorageValue;
let arrOfImgUrl = {
  urls: [],
};

fetch(`${BASE_URL}`)
  .then(response => {
    return response.json();
  })
  .then(answer => {
    const newArr = answer.data.memes;
    const arr = newArr.slice(4, 50);

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
  saveStorageUrls();
  createBasketContent();
};

const closeBasket = event => {
  if (event) {
    basketModal.classList.remove('is-open');
  }
};

const saveStorageUrls = () => {
  if (localStorage.getItem('arrOfUrls')) {
    const getItem = localStorage.getItem('arrOfUrls');
    const parsedGetItem = JSON.parse(getItem);
    arrOfImgUrl.urls = parsedGetItem;
  }
};

const addToBasketFunc = event => {
  const targetImg = event.path[2].children[0].src;
  saveStorageUrls();
  arrOfImgUrl.urls.push(targetImg);
  localStorage.setItem('arrOfUrls', JSON.stringify(arrOfImgUrl.urls));
  // createBasketContent();
};

const createBasketContent = () => {
  console.log(arrOfImgUrl.urls);
  basketModalContent.innerHTML = ' ';
  arrOfImgUrl.urls.forEach(element => {
    basketModalContent.insertAdjacentHTML(
      'afterbegin',
      `<img class="basket-img " src="${element}">`,
    );
  });
};

const addLike = event => {
  if (event) {
    currentLikes += 1;
    currentLikesRef.innerHTML = currentLikes;
    localStorage.setItem('numberOfLikes', `${currentLikes}`);
    event.target.disabled = true;
  }
};

const deleteLike = event => {
  if (currentLikes !== 0) {
    currentLikes -= 1;
    currentLikesRef.innerHTML = currentLikes;
    localStorage.setItem('numberOfLikes', `${currentLikes}`);
    event.target.disabled = true;
  }
};

const savedQuantity = () => {
  if (localStorageValue) {
    currentLikes = parseInt(localStorageValue);
  }
};

savedQuantity();

const clearBasket = () => {
  basketModalContent.innerHTML = ' ';
  localStorage.setItem('imgsUrls', []);
  arrOfImgUrl.urls = [];
};

basketRef.addEventListener('click', openBasket);
closeModal.addEventListener('click', closeBasket);
claerBasketRef.addEventListener('click', clearBasket);
