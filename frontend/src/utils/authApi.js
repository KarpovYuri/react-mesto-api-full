// Класс для общения с сервером
class AuthApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
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

  // Регистрация пользователя
  registerUser(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._handlingResponse(res));
  }

  // Вход пользователя
  loginUser(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._handlingResponse(res));
  }

  // Выход пользователя
  logoutUser(email) {
    return fetch(`${this._baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then((res) => this._handlingResponse(res));
  }

  // Проверка токена
  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => this._handlingResponse(res));
  }
}

const authApi = new AuthApi("http://localhost:3000");

export default authApi;
