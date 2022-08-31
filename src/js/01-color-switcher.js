function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  bodyEl: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let timerId = null;

function onBtnStartClick() {
  refs.btnStart.disabled = true;
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    refs.bodyEl.style.background = color;
  }, 1000);
}

function onBtnStopClick() {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
}

refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);
