import React, { useState } from "react";
import { Link, Route } from 'react-router-dom';

function Header({ isLoggedIn, isProfileEmail, onLogout }) {

  const [isClickBurgerMenu, setIsClickBurgerMenu] = useState(false);


  function handleClickBurgerMenu() {
    setIsClickBurgerMenu(!isClickBurgerMenu)
  }


  return (
    <header className={`${isLoggedIn ? 'header header_mobile' : 'header'}`}>
      <a href="#" aria-label="Логотип Mesto Russia" className="header__logo fade-opacity"></a>
      <Route path="/sign-in">
        <Link to='sign-up' className="header__link fade-opacity">Регистрация</Link>
      </Route>
      <Route path="/sign-up">
        <Link to='sign-in' className="header__link fade-opacity">Войти</Link>
      </Route>
      <Route exact path="/">
        <button className="hamburger fade-opacity" onClick={handleClickBurgerMenu}>
          <span className={`${isClickBurgerMenu ? 'hamburger__line hamburger__line_active' : 'hamburger__line'}`}></span>
          <span className={`${isClickBurgerMenu ? 'hamburger__line hamburger__line_active' : 'hamburger__line'}`}></span>
          <span className={`${isClickBurgerMenu ? 'hamburger__line hamburger__line_active' : 'hamburger__line'}`}></span>
        </button>
        <div className={`${isClickBurgerMenu ? 'profile-menu' : 'profile-menu profile-menu_inactive'}`}>
          <p className="profile-menu__email">{isProfileEmail}</p>
          <Link to='sign-in'
            onClick={() => {
              setIsClickBurgerMenu(!isClickBurgerMenu);
              onLogout();
            }}
            className="profile-menu__link fade-opacity">Выйти</Link>
        </div>
      </Route>
    </header>
  );
}


export default Header;
