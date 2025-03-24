import '../pages/index.css';

import {initialCards} from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');


// @todo: Функция создания карточки

const createCard = (card) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    
    const cardName = cardElement.querySelector('.card__title');
    cardName.textContent = card.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    const cardImageName = cardElement.querySelector('.card__image');
    cardImageName.alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const openImageButton = cardElement.querySelector('.card__image');
    
    deleteButton.addEventListener('click', () => {
       removeCard(cardElement);
    });

    likeButton.addEventListener('click', likeCard);
    
    openImageButton.addEventListener('click', () => {
      openModal(imagePopup);
      console.log('открыт попап');
    });

    return cardElement;
};

// Функция лайка карточки
const likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
};

// @todo: Функция удаления карточки

const removeCard = (card) => {
    card.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach( function (card) {
    cardsContainer.append(createCard (card, removeCard, likeCard, openModal));
});
    

// РАБОТА ПОПАПОВ

const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// открыть попап

const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  modal.classList.add('popup_is-animated');
  document.addEventListener('keydown', handleEscKeyUp);
};

// функции открытия попапов по кнопкам в разметке

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', () => {
    openModal(newCardPopup);
});

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
    openModal(editProfilePopup);
});



// закрыть попап

const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKeyUp);
};

// функция добавления слушателей для закрытия попапа на

const addListeners = (popupElement) => {

    // на крестик 
    const popupClose = popupElement.querySelector('.popup__close');
    popupClose.addEventListener('click', () => {
        closeModal (popupElement);
        console.log('закрылся');
    });

    // на оверлей
    popupElement.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup')) {
        closeModal (popupElement);
        console.log('закрылся');
      };  
    });

    const popupSaveCard = newCardPopup.querySelector('.popup__button');
    popupSaveCard.addEventListener('click', () => {
        closeModal (popupElement);
        console.log('закрылся');
    });

    const popupSaveProfile = editProfilePopup.querySelector('.popup__button');
    popupSaveProfile.addEventListener('click', () => {
        closeModal (popupElement);
        console.log('закрылся');
    });
   
};

// вызов функции добавления слушателей для закрытия попапа

addListeners(newCardPopup);
addListeners(editProfilePopup);
addListeners(imagePopup);

//закрыть попап по клавише esc

const handleEscKeyUp = (event) => {
    if(event.key === "Escape") {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
      console.log('закрылся');
    }
};

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

// Находим форму в DOM
const formElementProfile = document.querySelector('.edit-profile__form'); // Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
const nameInput = formElementProfile.querySelector('.popup__input_type_name');  // Воспользуйтесь инструментом .querySelector()
const jobInput = formElementProfile.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
      // Получите значение полей jobInput и nameInput из свойства value
      // Выберите элементы, куда должны быть вставлены значения полей
      const profileTitle = document.querySelector('.profile__title');
      const profileDescription = document.querySelector('.profile__description');
      // Вставьте новые значения с помощью textContent
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
  }
  
  // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  formElementProfile.addEventListener('submit', handleFormProfileSubmit);
  
  // ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК

  const formElementCard = document.querySelector('.new-place__form');
  console.log(formElementCard);
  
  const cardNameInput = formElementCard.querySelector('.popup__input_type_card-name');
  console.log (cardNameInput);
  
  const cardLinkInput = formElementCard.querySelector('.popup__input_type_url');
  console.log (cardLinkInput);
  
//   const addCard = (cardName, cardImage) => {
//     const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
      
//     cardElement.querySelector('.card__title').textContent = cardName;
//     cardElement.querySelector('.card__image').src = cardImage;
//       // Вставьте новые значения с помощью textContent
//     cardsContainer.prepend(cardElement);
      
//   }
  
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function handleCardFormSubmit(evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
        // Получите значение полей jobInput и nameInput из свойства value
        // Выберите элементы, куда должны быть вставлены значения полей
        const cardData = {
            name: cardNameInput.value,
            link: cardLinkInput.value
        }

        const newCard = createCard(cardData, removeCard, likeCard, openModal);
        cardsContainer.prepend(newCard);

    //   addCard (cardNameInput.value, cardLinkInput.value);
    cardNameInput.value = '';
    cardLinkInput.value = '';   
  };
    // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  formElementCard.addEventListener('submit', handleCardFormSubmit);
  
  // ЛАЙКИ 
  

  

