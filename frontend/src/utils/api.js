// Класс для общения с сервером
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }


  // Обработка ответа сервера
  _handlingResponse(result) {
    if (result.ok) {
      return result.json();
    } else {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }


  // Запрос данных профиля
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      credentials: 'include',
    })
      .then(res => this._handlingResponse(res));
  }


  // Запрос начальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      credentials: 'include',
    })
      .then(res => this._handlingResponse(res));
  }


  // Отправка данных профиля
  addUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._handlingResponse(res));
  }


  // Отправка добавленной карточки
  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: data.link,
        name: data.name
      })
    })
      .then(res => this._handlingResponse(res));
  }


  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
    })
      .then(res => this._handlingResponse(res));
  }


  // Постановка и снятие лайка карточке
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      credentials: 'include',
    })
      .then((res) => this._handlingResponse(res));
  }


  // Обновление аватара пользователя
  updateAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._handlingResponse(res));
  }

}

const api = new Api({
  baseUrl: 'https://api.mesto-project.nomoredomains.xyz/',
});

export default api;
