import { useState } from "react";
import useValidation from "../hooks/useValidation";

export default function Login({ onLogin }) {
  // Созданиее стейт переменных для валидации
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const { inputEmailValid, inputEmailError, inputEmailTouched } = useValidation(
    isEmail,
    { isEmpty: true, isEmail: true },
    "Email"
  );
  const { inputPasswordValid, inputPasswordError, inputPasswordTouched } =
    useValidation(isPassword, { isEmpty: true, minLength: 8 }, "Password");

  // Устанавливаем Email пользователя
  function handleChangeEmail(event) {
    setIsEmail(event.target.value);
  }

  // Устанавливаем пароль пользователя
  function handleChangePassword(event) {
    setIsPassword(event.target.value);
  }

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    onLogin(isEmail, isPassword);
  }

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
      name="signInForm"
      noValidate
    >
      <h2 className="auth-form__title">Вход</h2>
      <input
        value={isEmail || ""}
        onChange={handleChangeEmail}
        className={`auth-form__field ${
          !inputEmailValid && inputEmailTouched && "auth-form__field_type_error"
        }`}
        placeholder="Email"
        type="email"
        name="email"
        id="emailInput"
        autoComplete="off"
      />
      <span
        className={`auth-form__input-error ${
          !inputEmailValid &&
          inputEmailTouched &&
          "auth-form__input-error_active"
        }`}
      >
        {inputEmailError}
      </span>
      <input
        value={isPassword || ""}
        onChange={handleChangePassword}
        className={`auth-form__field ${
          !inputPasswordValid &&
          inputPasswordTouched &&
          "auth-form__field_type_error"
        }`}
        placeholder="Пароль"
        type="password"
        name="password"
        id="passwordInput"
        autoComplete="off"
      />
      <span
        className={`auth-form__input-error ${
          !inputPasswordValid &&
          inputPasswordTouched &&
          "auth-form__input-error_active"
        }`}
      >
        {inputPasswordError}
      </span>

      <button
        className={`auth-form__btn ${
          (!inputEmailValid || !inputPasswordValid) && "auth-form__btn_inactive"
        }`}
        disabled={!inputEmailValid || !inputPasswordValid}
        type="submit"
        aria-label="Кнопка входа"
      >
        Войти
      </button>
      <button
        className="auth-form__btn auth-form__btn_demo"
        type="button"
        aria-label="Кнопка входа"
        onClick={() => onLogin("test@test.ru", "qwerty123")}
      >
        Войти без пароля и регистрации
      </button>
    </form>
  );
}
