window.addEventListener('load', function () {
  const passwordInput = document.querySelector('.input');
  passwordInput.addEventListener('input', function (e) {
    const value = e.target.value;
    const checkLengthClass = e.target.parentNode.querySelector('.check-length');
    const checkUpperClass = e.target.parentNode.querySelector('.check-upper');
    const checkNumberClass = e.target.parentNode.querySelector('.check-number');
    const checkSpecialClass = e.target.parentNode.querySelector('.check-special');

    const checkItems = e.target.parentNode.querySelectorAll('.check-item');

    if (!value) {
      [...checkItems].forEach((item) => {
        item.classList.remove('unactive');
        item.classList.remove('active');
      });
      return;
    }
    //check lenght value
    if (value.length < 8) {
      checkLengthClass.classList.add('unactive');
      checkLengthClass.classList.remove('active');
    } else {
      checkLengthClass.classList.remove('unactive');
      checkLengthClass.classList.add('active');
    }
    // //check  least 1 uppercase
    // if (!/[A - Z]/.test(value)) {
    //   checkUpperClass.classList.add('unactive');
    //   checkUpperClass.classList.remove('active');
    // } else {
    //   checkUpperClass.classList.add('active');
    //   checkUpperClass.classList.remove('unactive');
    // }

    // //check  least 1 uppercase
    // if (!/[0-9]/.test(value)) {
    //   checkNumberClass.classList.add('unactive');
    //   checkNumberClass.classList.remove('active');
    // } else {
    //   checkNumberClass.classList.add('active');
    //   checkNumberClass.classList.remove('unactive');
    // }

    //check special charater
    // if (!/[. ^ $ * + - ? ( ) [\] { } \ | — \/]/.test(value)) {
    //   checkSpecialClass.classList.add('unactive');
    //   checkSpecialClass.classList.remove('active');
    // } else {
    //   checkSpecialClass.classList.add('active');
    //   checkSpecialClass.classList.remove('unactive');
    // }
    paswordInputValidation(checkUpperClass, value, /[A-Z]/);
    paswordInputValidation(checkNumberClass, value, /[0-9]/);
    paswordInputValidation(checkSpecialClass, value, /[. ^ $ @ * + - ? ( ) [\] { } \ | — \/]/);
  });
  function paswordInputValidation(selector, value, regex) {
    if (!regex.test(value)) {
      selector.classList.add('unactive');
      selector.classList.remove('active');
    } else {
      selector.classList.add('active');
      selector.classList.remove('unactive');
    }
  }
});
