import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ImagePopup from '../components/ImagePopup';
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import authApi from "../utils/authApi";


function App() {

  // Создание стейтов открытия попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);


  // Создание стейта сохранения/загрузки данных
  const [isRenderLoading, setIsRenderLoading] = useState(false);


  // Стейты текущего пользователя и карточек
  const [isSelectedCard, setIsSelectedCard] = useState({});
  const [isCurrentUser, setIsCurrentUser] = useState({});
  const [isCards, setIsCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileEmail, setIsProfileEmail] = useState('')


  // История посещения страниц
  const history = useHistory();


  // Проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi.checkToken(jwt)
        .then(data => {
          if (data) {
            setIsProfileEmail(data.data.email)
            setIsLoggedIn(true)
            history.push('/');
          }
        })
        .catch(error => { console.log(error); })
    }
  }, [history]);


  // Получение данных текущего пользователя
  useEffect(() => {
    api.getUserInfo()
      .then(result => setIsCurrentUser(result))
      .catch(error => console.log(error));
  }, []);


  // Получение данных начальных карточек
  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setIsCards(initialCards);
      })
      .catch(error => console.log(error));
  }, []);


  function handleCardLike(card) {

    // Проверяем есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === isCurrentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((likeCard) => {
        setIsCards(cardsArray => cardsArray.map(item => item._id === card._id ? likeCard : item));
      })
      .catch(error => console.log(error));
  }


  // Удаление карточки
  function handleCardDelete(card) {
    setIsRenderLoading(true);

    // Отправляем запрос в API и удаляем карточку
    api.deleteCard(card._id)
      .then(() => {
        setIsCards(cardsArray => cardsArray.filter(item => item._id !== card._id));
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setIsRenderLoading(false));
  }


  // Сохранение данных нового пользователя
  function handleUpdateUser(newUserData) {
    setIsRenderLoading(true);
    api.addUserInfo(newUserData)
      .then(result => {
        setIsCurrentUser(result);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setIsRenderLoading(false));
  }


  // Обновление аватара
  function handleUpdateAvatar(newAvatar, clearForm) {
    setIsRenderLoading(true);
    api.updateAvatar(newAvatar)
      .then(result => {
        setIsCurrentUser(result);
        closeAllPopups();
        clearForm();
      })
      .catch(error => console.log(error))
      .finally(() => setIsRenderLoading(false))
  }


  // Добавление карточки
  function handleAddPlaceSubmit(newCard) {
    setIsRenderLoading(true);
    return new Promise((resolve) => {
      api.addCard(newCard)
        .then(result => {
          setIsCards([result, ...isCards]);
          closeAllPopups();
          resolve();
        })
        .catch(error => console.log(error))
        .finally(() => setIsRenderLoading(false))
    })
  }


  // Открытие попапа редактирования Аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }


  // Открытие попапа редактирования данных профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }


  // Открытие попапа добавления карточки места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }


  // Открытие попапа изображения
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setIsSelectedCard(card);
  }

  function handleDeleteButtonClick(card) {
    setIsCardDeletePopupOpen(true);
    setIsSelectedCard(card);
  }


  // Закрытие попапов
  function closeAllPopups() {
    setIsRenderLoading(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }


  // Регистрация пользователя
  function handleRegisterUser(email, password) {
    authApi.registerUser(email, password)
      .then(data => {
        if (data) {
          setIsInfoTooltipSuccess(true);
          history.push('/sign-in');
        }
      })
      .catch(error => {
        setIsInfoTooltipSuccess(false);
        console.log(error);
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  }


  // Вход в аккаунт
  function handleLoginUser(email, password) {
    authApi.loginUser(email, password)
      .then(data => {
        if (data.token) {
          setIsProfileEmail(email)
          setIsLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          history.push('/');
        }
      })
      .catch(error => {
        setIsInfoTooltipPopupOpen(true);
        setIsInfoTooltipSuccess(false);
        console.log(error)
      })
  }


  // Выход из аккаунта
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsProfileEmail('')
    setIsLoggedIn(false);
    history.push('/sign-in');
  }


  return (
    <div className="page">

      <CurrentUserContext.Provider value={isCurrentUser}>

        <Header
          isLoggedIn={isLoggedIn}
          isProfileEmail={isProfileEmail}
          onLogout={handleLogout}
        />

        <Switch>

          <ProtectedRoute
            exact path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteButtonClick}
            cards={isCards}
          />

          <Route path="/sign-up">
            <Register onRegister={handleRegisterUser} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLoginUser} />
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isRenderLoading={isRenderLoading}
        />

        <ImagePopup
          isCard={isSelectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRenderLoading={isRenderLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isRenderLoading={isRenderLoading}
        />

        <ConfirmDeletePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          isCard={isSelectedCard}
          onDeleteCard={handleCardDelete}
          isRenderLoading={isRenderLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isInfoTooltipSuccess}
        />

      </CurrentUserContext.Provider>

    </div>


  );
}

export default App;
