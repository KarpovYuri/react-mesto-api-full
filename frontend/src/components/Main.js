// Импорт компонентов
import React from "react";
import Card from './Card';
import CurrentUserContext from "../contexts/CurrentUserContext";


function Main(
  {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards
  }
) {

  // Получение данных текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main>

      <section className="profile">
        <div className="profile__avatar-edit">
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
          <button
            type="button"
            aria-label="Кнопка редактирования Аватара"
            className="profile__avatar-button"
            onClick={onEditAvatar}>
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            aria-label="Кнопка редактирования профиля"
            className="profile__edit-button fade-opacity"
            onClick={onEditProfile}>
          </button>
        </div>
        <p className="profile__about">{currentUser.about}</p>
        <button
          type="button"
          aria-label="Кнопка добавления карточки"
          className="profile__add-button fade-opacity"
          onClick={onAddPlace}>
        </button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          < Card
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            key={card._id}
          />
        ))}
      </section>

    </main>
  );
}


export default Main;
