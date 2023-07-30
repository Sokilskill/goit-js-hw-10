import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectInput = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

hideElement(errorEl);
hideElement(selectInput);

function optionCreate(breed) {
  const option = document.createElement('option');
  option.value = breed.id;
  option.textContent = breed.name;
  return option;
}

fetchBreeds()
  .then(breeds => {
    const options = breeds.map(optionCreate);
    selectInput.append(...options);

    new SlimSelect({
      select: selectInput,
    });
    hideElement(loaderEl);

    showElement(selectInput);
  })
  .catch(error => {
    console.log(error);

    hideElement(loaderEl);
    //   showElement(errorEl);
    Notify.failure(errorEl.textContent);
  });

selectInput.addEventListener('change', handlerSelect);

function handlerSelect() {
  const selectBreedId = selectInput.value;
  catInfo.innerHTML = '';
  showElement(loaderEl);
  fetchCatByBreed(selectBreedId)
    .then(catData => {
      createMarkup(catData);
    })
    .catch(error => {
      console.log(error);
      hideElement(loaderEl);

      Notify.failure(errorEl.textContent);
    });
}

function createMarkup(arr) {
  console.dir(arr);
  const imgUrl = arr[0].url;
  const arrBreeds = arr[0].breeds[0];
  const title = arrBreeds.name;
  const description = arrBreeds.description;
  const temperament = arrBreeds.temperament;

  hideElement(loaderEl);
  const catDesc = arr

    .map(
      elem =>
        `<div class="img-wrap"><img class="cat-info_img" src="${imgUrl}" alt="cat ${title}"  width="500"/> </div>
        <div class="cat-info-desc">
        <h3 class="title" >${title}</h3>
        <p class="text">${description}</p>
        <p class="sub-text" > ${temperament}</p></div>`
    )
    .join('');
  catInfo.insertAdjacentHTML('beforeend', catDesc);
}

function showElement(element) {
  element.classList.remove('is-hidden');
}

function hideElement(element) {
  element.classList.add('is-hidden');
}

// function showError() {
//   errorEl.classList.remove('is-hidden');
// }
// function hideError() {
//   errorEl.classList.add('is-hidden');
// }
