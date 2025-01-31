const buttonsContainer = document.querySelector('.category-button-wrap');
const favoriteCards = document.querySelector('.cards__list.card-set');
const noRecipeBox = document.querySelector('.no-recipe-box');

const localStorageDB = [
  {
    _id: '6462a8f74c3d0ddd28897fc1',
    title: 'Chocolate Gateau',
    category: 'Dessert',
    description:
      'A French dessert consisting of layers of chocolate sponge cake and chocolate ganache, typically topped with chocolate glaze and chocolate decorations.',
    preview:
      'https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560403/zyahxajhkglf8sisiqlh.jpg',
    time: '75',
    rating: 3,
  },
  {
    _id: '6462a8f74c3d0ddd28897fbc',
    title: 'Irish stew',
    category: 'Beef',
    description:
      'A traditional Irish dish made with lamb, potatoes, carrots, onions, and herbs, cooked in a broth or gravy.',
    preview:
      ' "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560408/kknfjaqupiqhufj5kspx.jpg',
    time: '160',
    rating: 3,
  },
  {
    _id: '6462a8f74c3d0ddd28897fb9',
    title: 'Lamb tomato and sweet spices',
    category: 'Beef',
    description:
      'A Moroccan-inspired dish made with lamb, tomatoes, onions, and spices (such as cinnamon, ginger, and cumin), typically served with couscous or bread.',
    preview:
      'https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560405/zlxxkd81sadgwzbugyzl.jpg',
    time: '90',
    rating: 89,
  },
  {
    _id: '6462a8f74c3d0ddd28897fc1',
    title: 'Chocolate Gateau',
    category: 'Dessert',
    description:
      'A French dessert consisting of layers of chocolate sponge cake and chocolate ganache, typically topped with chocolate glaze and chocolate decorations.',
    preview:
      'https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560403/zyahxajhkglf8sisiqlh.jpg',
    time: '75',
    rating: 3,
  },
  {
    _id: '6462a8f74c3d0ddd28897fbc',
    title: 'Irish stew',
    category: 'Beef',
    description:
      'A traditional Irish dish made with lamb, potatoes, carrots, onions, and herbs, cooked in a broth or gravy.',
    preview:
      ' "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560408/kknfjaqupiqhufj5kspx.jpg',
    time: '160',
    rating: 3,
  },
  {
    _id: '6462a8f74c3d0ddd28897fb9',
    title: 'Lamb tomato and sweet spices',
    category: 'Beef',
    description:
      'A Moroccan-inspired dish made with lamb, tomatoes, onions, and spices (such as cinnamon, ginger, and cumin), typically served with couscous or bread.',
    preview:
      'https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560405/zlxxkd81sadgwzbugyzl.jpg',
    time: '90',
    rating: 89,
  },
];

const categories = [];

if (localStorageDB.length > 0) {
  markupFavoriteBtn(localStorageDB);
  markupFavoriteCard(localStorageDB);
} else {
  noRecipeBox.classList.remove('visually-hidden');
}

buttonsContainer.addEventListener('click', changeActiveClassMenuButtons);
buttonsContainer.addEventListener('click', onFilter);

function markupFavoriteBtn(data) {
  data.forEach(element => {
    if (!categories.includes(element.category)) {
      categories.push(element.category);
    }
  });
  buttonsContainer.insertAdjacentHTML(
    'afterbegin',
    createMarkupFavotiteBtn('All Categories')
  );
  buttonsContainer.firstElementChild.classList.add('active');
  const murkup = categories
    .map(element => createMarkupFavotiteBtn(element))
    .join('');
  //   return categories;
  buttonsContainer.insertAdjacentHTML('beforeend', murkup);
}

function markupFavoriteCard(data) {
  const markup = data.reduce(
    (markup, currentCard) => markup + createMarkupFavoriteCard(currentCard),
    ''
  );
  favoriteCards.innerHTML = `${markup}`;
}

function createMarkupFavotiteBtn(category) {
  return `
    <button type="button" class="category-button-button btn">${category}</button>
    `;
}

function createMarkupFavoriteCard({
  _id,
  title,
  category,
  description,
  preview,
  time,
  rating,
}) {
  return `<li class="cards__item items-set fav-set">
  <img src="${preview}" alt="" class="cards__img" />
  <svg class="cards__heart" width="19" height="17">
    <use href="./images/sprite.svg#icon-heart"></use>
  </svg>
  <div class="cards__descr">
    <h4 class="cards__title">${title}</h4>
    <p class="cards__text">
      ${description}
    </p>
    <div class="cards__info">
      <div class="cards__rating rating">
        <div class="rating__value">5</div>
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
      </div>
      <button class="btn btn-primary cards__btn">See recipe</button>
    </div>
  </div>
</li>`;
}

function changeActiveClassMenuButtons(e) {
  for (let i = 0; i < e.currentTarget.children.length; i += 1) {
    e.currentTarget.children[i].classList.remove('active');
  }
  e.target.classList.add('active');
}

function onFilter(e) {
  const filterCategory = String(e.target.textContent);

  if (filterCategory === 'All Categories') {
    markupFavoriteCard(localStorageDB);
  } else {
    favoriteCards.innerHTML = '';
    const testBase = [];
    const newDatabase = localStorageDB.filter(
      element => element.category === filterCategory
    );
    markupFavoriteCard(newDatabase);
  }
}
