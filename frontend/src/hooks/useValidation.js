import React, { useState } from 'react';

const useValidation = (value = '', validations, variableName) => {

  const [isTextError, setIsTextError] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);
  const [isInputTouched, setIsInputTouched] = useState(false);
  const minLength = validations.minLength;
  // eslint-disable-next-line no-useless-escape
  const regExpUrl = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          if (value) {
            setIsInputTouched(true);
            setIsInputValid(true);
            setIsTextError('');
          } else {
            setIsInputValid(false);
            setIsTextError('Поле должно быть заполнено');
          }
          break;
        case 'minLength':
          if (value.length >= validations[validation]) {
            setIsInputValid(true);
            setIsTextError('');
          } else {
            if (value) {
              setIsInputValid(false);
              setIsTextError(`Минимальная длинна ${validations[validation]} символов`);
            }
          }
          break;
        case 'maxLength':
          if (value.length <= validations[validation] && value.length > minLength) {
            setIsInputValid(true);
            setIsTextError('');
          } else {
            if (value.length > validations[validation]) {
              setIsInputValid(false);
              setIsTextError(`Максимальная длинна ${validations[validation]} символов`);
            }
          }
          break;
        case 'isLink':
          if (regExpUrl.test(value)) {
            setIsInputValid(true);
            setIsTextError('');
          } else {
            if (value) {
              setIsInputValid(false);
              setIsTextError(`Введите корректный адрес ссылки`);
            }
          }
          break;
        case 'isEmail':
          if (regExpEmail.test(value)) {
            setIsInputValid(true);
            setIsTextError('');
          } else {
            if (value) {
              setIsInputValid(false);
              setIsTextError(`Введите корректный Email`);
            }
          }
          break;
      }

    }
    if (isInputValid) setIsInputTouched(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    ['input' + variableName + 'Valid']: isInputValid,
    ['input' + variableName + 'Error']: isTextError,
    ['input' + variableName + 'Touched']: isInputTouched
  }

}

export default useValidation;
