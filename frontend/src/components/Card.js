import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";


function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  // Получение данных текущего пользователя
  const currentUser = React.useContext(CurrentUserContext);


  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;


  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__delete-btn ${isOwn ? 'card__delete-btn_visible' : 'card__delete-btn_hidden'}`
  );


  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);


  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`;


  // Обработчик удаления карточки
  function handleDeleteClick() {
    onCardDelete(card);
  }


  // Обработчик лайка
  function handleLikeClick() {
    onCardLike(card);
  }


  // Обработчик открытия попапа изображения
  function handleClick() {
    onCardClick(card);
  }


  return (
    <div className="card">
      <button
        type="button"
        aria-label="Иконка мусорного бака"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}>
      </button>
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="card__picture"
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            aria-label="Иконка сердечка"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}>
          </button>
          <span className="card__like-qty">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}


export default Card;
