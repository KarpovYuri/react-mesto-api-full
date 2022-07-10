// Класс для общения с сервером
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.token;
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
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handlingResponse(res));
  }


  // Запрос начальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handlingResponse(res));
  }


  // Отправка данных профиля
  addUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
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
      headers: {
        authorization: this._token,
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
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handlingResponse(res));
  }


  // Постановка и снятие лайка карточке
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => this._handlingResponse(res));
  }


  // Обновление аватара пользователя
  updateAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
  token: 'e7a7c3fb-6194-4371-9a2c-b0a475e73e1c'
});

export default api;