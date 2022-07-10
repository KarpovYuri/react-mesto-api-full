import React, { useState } from "react";
import PopupWhithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isRenderLoading }) {


  // Стейты для валидации и очистки формы
  const [isAvatarLink, setIsAvatarLink] = useState('');


  // Запуск валидации
  const {
    inputLinkValid,
    inputLinkError,
    inputLinkTouched
  } = useValidation(isAvatarLink, { isEmpty: true, isLink: true }, 'Link');


  // Установка ссылки на аватар
  function handleChangeAvatarLink(event) {
    setIsAvatarLink(event.target.value);
  }


  // Обновление аватара
  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(
      { avatar: isAvatarLink },
      () => setIsAvatarLink(''))
  }


  return (
    <PopupWhithForm
      name="avatar"
      title="Обновить аватар"
      labelText="сохранения аватара"
      buttonText={isRenderLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formValid={inputLinkValid}
    >
      <input
        value={isAvatarLink || ''}
        type="url"
        placeholder="Ссылка на аватар"
        className={`popup__field ${!inputLinkValid && inputLinkTouched && 'popup__field_type_error'}`}
        id="avatarInput"
        name="avatar"
        onChange={handleChangeAvatarLink}
        autoComplete="off"
      />
      <span className={`popup__input-error ${!inputLinkValid && inputLinkTouched && 'popup__input-error_active'}`}>
        {inputLinkError}
      </span>
    </PopupWhithForm >
  )

}


export default EditAvatarPopup;
