const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
    headers: {
      authorization: '66818ef8-3ce7-409c-a99e-8deece7cee2c',
      'Content-Type': 'application/json'
    }
};

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// загрузить карточки с сервера
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards `, {
      headers: config.headers
    })
    .then(getResponseData);
};

// загрузить данные пользователя
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(getResponseData);
};

// обновление данных пользователя (имя, описание)
export const patchUser = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  })
  .then(getResponseData);
}

// добавить пост
export const postCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      alt: cardName,
      link: cardLink
    })
  })
  .then(getResponseData);
}

// удалить пост
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

// лайкнуть пост
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(getResponseData);
}

// убрать лайк с поста
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponseData);
}

// обновить аватар
export function patchAvatar (avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  })
  .then(getResponseData);
}