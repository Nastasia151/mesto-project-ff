export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyUp);
};

export const closeModal = (modal) => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKeyUp);
};
  
export const handleEscKeyUp = (event) => {
    if(event.key === "Escape") {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    };
};

export const handleOverlayClick = (event) => {
    const popup = document.querySelector('.popup_is-opened');
    if (event.target.classList.contains('popup')) {
        closeModal (popup);
    };
};