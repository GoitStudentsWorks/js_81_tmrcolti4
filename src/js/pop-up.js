import { Loader } from './loader'
import { markUpRating } from './ratings';

let refs = {
  closeVideo: document.querySelector('.tiezer-close-btn'),
  tiezer: document.querySelector('.tiezer'),
  trailerBox: document.querySelector('.trailer-box'),
  btnOpenYouTube: document.querySelector('.js-btn-openYouTube'),
  preview: document.querySelector('.recipes'),
  video: document.querySelector('iframe'),
  title: document.querySelector('.js-title'),
  time: document.querySelector('.js-minute'),
  modalRecipe: document.querySelector('.js-modal-recipe'),
  backdropRecipe: document.querySelector('.js-backdrop-recipe'),
  ratingBox: document.querySelector('.js-rating-recipe-wraper'),
  IngredientBox: document.querySelector('.recipes-list'),
  hashtagsBox: document.querySelector('.hashtags-list'),
  textContentBox: document.querySelector('.cooking-recipes'),
};



const modalRecipe = document.querySelector('.js-modal-recipe');
// /** Відкриття та закриття модального вікна */
$(document).ready(function () {
  $(".modal-close-btn").each(function () {

    $(this).click(function () {
      $(".modal").css("display", "none");
      $(".backdrop").css("visibility", "hidden");
    });
  });
  $(".cards__btn").each(function () {
    $(this).click(function () {
      $(".modal").css("display", "block");
      $(".backdrop").css("visibility", "visible");
    });
  });
});

function RenderCardInfoRecipe(id) {
  // Loader.Start();

  fetchRecipeById(id);
  setTimeout(() => {
    refs.backdropRecipe.classList.add('active');
    refs.modalRecipe.classList.add('active');
  }, 100)

}

setTimeout(() => {
  RenderCardInfoRecipe('6462a8f74c3d0ddd28897fc1');
}, 1000)


function getRefs() {
  return {
    closeVideo: document.querySelector('.tiezer-close-btn'),
    tiezer: document.querySelector('.tiezer'),
    trailerBox: document.querySelector('.trailer-box'),

  }
}
async function fetchRecipeById(id) {
  const resp = await fetch(`https://tasty-treats-backend.p.goit.global/api/recipes/${id}`);
  const data = await resp.json();


  renderIMG(data);
  renderVIDEO(data)
  renderTitle(data);
  renderRanting(data);
  markUpRating();

  renderIngridient(data);
  renderHashtags(data);
  renderText(data);

}



const stopVideos = () => {
  refs.trailerBox.classList.remove('active');

  document.querySelectorAll('iframe').forEach(video => {
    video.src = video.src;
  });
  document.querySelectorAll('video').forEach(video => {
    video.pause();
  });

};

refs.closeVideo.addEventListener('click', stopVideos);


// YouTUBE module
refs.btnOpenYouTube.addEventListener('click', openPlayer);

function openPlayer() {
  refs.trailerBox.classList.add('active');
}

function renderIMG(data) {
  refs.preview.src = data.preview;
}
function renderVIDEO(data) {

  const markUp = `
   <iframe
                width="100%"
                height="100%"
                src="http://www.youtube.com/embed/${getKeyYouTybe(data.youtube)};

title = "YouTube video player"
frameborder = "0"
allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen
  ></iframe >
`;
  refs.tiezer.insertAdjacentHTML('beforeend', markUp);
}

function getKeyYouTybe(url) {
  let indexLast = url.split('').length;

  let key = url.split('').splice(32, indexLast).join('');
  return key;
}

function renderTitle(data) {
  refs.title.textContent = data.title;
}

function renderRanting(data) {
  let markupR = `
  <div class="cards__rating rating">
          <div class="rating__value detail">${data.rating}</div>
          <div class="rating__body">
            <div class="rating__active"></div>
            <div class="rating__items">
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="1"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="2"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="3"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="4"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="5"
              />
            </div>
          </div>
        </div>`;
  refs.ratingBox.insertAdjacentHTML('beforeend', markupR);
}

function renderIngridient(data) {
  const markup = data.ingredients.map(({ measure, name }) => {
    return `<li class="recipes-subtitle">
                ${name}
                <p class="recipes-inf" p>${measure}</p>
              </li>`
  }).join('');

  refs.IngredientBox.insertAdjacentHTML('beforeend', markup);
}

function renderHashtags(data) {
  if (data.tags.length === 0) {
    return;
  }
  const markup = data.tags.map((tag) => {
    return ` <li class="hashtags">#${tag}</li>`
  }).join('');

  refs.hashtagsBox.insertAdjacentHTML('beforeend', markup);
}

function renderText(data) {
  refs.textContentBox.textContent = data.instructions;
  refs.time.textContent = data.time + " min";
}


