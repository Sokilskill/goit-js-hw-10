import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectInput = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

hideLoader();
hideError();

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
  })
  .catch(error => {
    console.log(error);
    showError();
  });

selectInput.addEventListener('change', handlerSelect);

function handlerSelect() {
  const selectBreedId = selectInput.value;
  catInfo.innerHTML = '';
  showLoader();
  fetchCatByBreed(selectBreedId)
    .then(catData => {
      createMarkup(catData);
    })
    .catch(error => {
      console.log(error);
      hideLoader();
      showError();
    });
}

function createMarkup(arr) {
  console.dir(arr);
  const imgUrl = arr[0].url;
  const arrBreeds = arr[0].breeds[0];
  const title = arrBreeds.name;
  const description = arrBreeds.description;
  const temperament = arrBreeds.temperament;

  hideLoader();
  const catDesc = arr

    .map(
      elem =>
        `<img class="img-cat" src="${imgUrl}" alt="cat ${title}"  height="500"/>
        <h3 >${title}</h3>
        <p>${description}</p>
        <p>${temperament}</p>`
    )
    .join('');
  catInfo.insertAdjacentHTML('beforeend', catDesc);
}

function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

function hideLoader() {
  loaderEl.classList.add('is-hidden');
}
function showError() {
  errorEl.classList.remove('is-hidden');
}
function hideError() {
  errorEl.classList.add('is-hidden');
}
// fetch(url, {
//   headers: {
//     'x-api-key': API_KEY,
//   },
// })
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     //filter to only include those with an `image` object
//     data = data.filter(img => img.image?.url != null);

//     storedBreeds = data;

//     for (let i = 0; i < storedBreeds.length; i++) {
//       const breed = storedBreeds[i];
//       let option = document.createElement('option');

//       //skip any breeds that don't have an image
//       if (!breed.image) continue;

//       //use the current array index
//       option.value = i;
//       option.innerHTML = `${breed.name}`;
//       document.getElementById('breed_selector').appendChild(option);
//     }
//     //show the first breed by default
//     showBreedImage(0);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// function showBreedImage(index) {
//   document.getElementById('breed_image').src = storedBreeds[index].image.url;

//   document.getElementById('breed_json').textContent =
//     storedBreeds[index].temperament;

//   document.getElementById('wiki_link').href = storedBreeds[index].wikipedia_url;
//   document.getElementById('wiki_link').innerHTML =
//     storedBreeds[index].wikipedia_url;
// }
