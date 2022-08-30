import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  DELAY: 1000,
  dateInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  dayEl: document.querySelector('[data-days]'),
  hourEl: document.querySelector('[data-hours]'),
  minuteEl: document.querySelector('[data-minutes]'),
  secondEl: document.querySelector('[data-seconds]'),
};

const { DELAY, dateInput, btnStart, dayEl, hourEl, minuteEl, secondEl } = refs;

refs.btnStart.disabled = true;
let chosenDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  isActive: false,
  onClose(selectedDates) {
    if (this.isActive) {
      return;
    } else {
      chosenDate = selectedDates[0].getTime();
      checkDate(chosenDate);
      options.isActive = true;
    }
  },
};

const flatpickr = flatpickr(dateInput, options);

function checkDate(date) {
  if (date < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future', {
      timeout: 6000,
    });
  } else {
    btnStart.disabled = false;
  }
}

function onBtnStart(event) {
  const intervalID = setInterval(() => {
    const currentTime = Date.now();
    if (chosenDate > currentTime) {
      let difference = chosenDate - currentTime;

      const { days, hours, minutes, seconds } = convertMs(difference);
      const amountOfTime = `${days}:${hours}:${minutes}:${seconds}`;

      updateClockFace({ days, hours, minutes, seconds });
    } else {
      clearInterval(intervalID);
      const { days, hours, minutes, seconds } = convertMs(difference);
      updateClockFace({ days, hours, minutes, seconds });
    }
  }, DELAY);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
  dayEl.textContent = `${days}`;
  hourEl.textContent = `${hours}`;
  minuteEl.textContent = `${minutes}`;
  secondEl.textContent = `${seconds}`;
}

btnStart.addEventListener('click', onBtnStart);

console.log(chosenDate);
