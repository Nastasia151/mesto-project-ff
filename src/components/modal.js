export const openModal = (modal) => {  // открыть попап
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyUp);
    document.addEventListener('mousedown', handleOverlayClick);
};

export const closeModal = (modal) => {  // закрыть попап
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKeyUp);
    document.removeEventListener('mousedown', handleOverlayClick);
};
  
export const handleEscKeyUp = (event) => {   // функция если нажали на esc
    if(event.key === "Escape") {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    };
};

export const handleOverlayClick = (event) => {  // функция если нажали на оверлей
    const popup = document.querySelector('.popup_is-opened');
    if (event.target.classList.contains('popup')) {
        closeModal (popup);
    };
};
