import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const DELAY = 1000;
const dateInput = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minuteEl = document.querySelector('[data-minutes]');
const secondEl = document.querySelector('[data-seconds]');

function convertMs(ms) {
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  isActive: false,
  onClose(selectedDates) {
    if (this.isActive) {
      return;
    }
    let selectedDate = selectedDates[0].getTime();

    if (selectedDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 6000,
      });
    } else {
      btnStart.disabled = false;
      this.isActive = true;

      function inBtnStart(event) {
        const intervalId = setInterval(() => {
          const currentTime = Date.now();

          let difference = selectedDate - currentTime;

          const { days, hours, minutes, seconds } = convertMs(difference);
          const amountOfTime = `${days}:${hours}:${minutes}:${seconds}`;

          dayEl.textContent = `${days}`;
          hourEl.textContent = `${hours}`;
          minuteEl.textContent = `${minutes}`;
          secondEl.textContent = `${seconds}`;

          if (amountOfTime === `00:00:00:00`) {
            clearInterval(intervalId);
          }
        }, DELAY);
      }

      btnStart.addEventListener('click', inBtnStart);
    }
  },
};

const fp = flatpickr(dateInput, options);
