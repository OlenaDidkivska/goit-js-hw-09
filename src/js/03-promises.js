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

  let positions = [];
  let delay;

  for (let i = 0; i < amount; i += 1) {
    const element = i + 1;
    positions.push(element);
  }

  for (let i = delayEl; i < positions.length + 1; i += stepEl) {
    delay += i;
  }

  const promises = positions
    .map(position => createPromise(position, 1000))
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });

  //   (position, delay)
  //     .then(({ position, delay }) => {
  //       console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  //     })
  //     .catch(({ position, delay }) => {
  //       console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  //     })
  // );
  Promise.race(promises);

  console.log(promises);
}

form.addEventListener('submit', onFormSubmit);
