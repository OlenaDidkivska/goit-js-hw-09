import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      console.log(position, delay);
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  const formEl = event.currentTarget.elements;
  const delayEl = Number(formEl.delay.value);
  const stepEl = Number(formEl.step.value);
  const amount = Number(formEl.amount.value);

  createDatabasePromises(delayEl, stepEl, amount);
}

function createDatabasePromises(delayEl, stepEl, amount) {
  let delay = delayEl;

  for (let i = 1; i < amount + 1; i += 1) {
    delay = delayEl + stepEl * (i - 1);
    console.log(i);
    console.log(delay);

    const promises = createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

form.addEventListener('submit', onFormSubmit);
