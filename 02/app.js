document.addEventListener('DOMContentLoaded', init);

function init() {
    const clickEl = document.querySelector('.error--click');
    const enterEl = document.querySelector('.error--enter');

    setRandomPosition(clickEl);
    setRandomPosition(enterEl);

    initEventWithError(clickEl, 'click', new RangeError('Błąd zakresu!'));
    initEventWithError(enterEl, 'mouseenter', new TypeError('Błąd typu!'));
}

function setRandomPosition(element, error = null) {
    element.style.top = Math.random() * 600 + 'px';
    element.style.left = Math.random() * 800 + 'px';

    if (error) {
        throw error;
    }
}

function initEventWithError(element, eventName, error) {
    element.addEventListener(eventName, function () {
        try {
            setRandomPosition(this, error);
        } catch (err) {
            showAlert(err);
        }
    });
}

function showAlert(error) {
    const alertEl = document.querySelector('.alert');
    const msgEl = alertEl.querySelector('.alert__message');

    msgEl.textContent = error && error.message ? error.message : String(error);

    alertEl.classList.remove('alert--hidden');

    clearTimeout(showAlert._timeoutId);
    showAlert._timeoutId = setTimeout(() => {
        alertEl.classList.add('alert--hidden');
    }, 4000);
}