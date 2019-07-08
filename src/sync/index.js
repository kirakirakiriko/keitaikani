export const registerSync = () => {
  if (!'serviceWorker' in navigator) {
    return;
  }

  navigator.serviceWorker
    .register('../sw-pull.js', {
      scope: '/'
    })
    .then((reg) => {
      console.log('Service Worker registered!');
    })
    .catch((err) => {
      console.error('Error registering Service Worker!')
    });
};

export const doPullSync = () => {
  if (!'serviceWorker' in navigator) {
    return;
  }
  navigator.serviceWorker.ready
    .then(reg => reg.sync.register('pullAvailableSubjects'))
    .catch(console.error);
};

export const doPushSync = () => {
  if (!'serviceWorker' in navigator) {
    return;
  }
  navigator.serviceWorker.ready
    .then(reg => reg.sync.register('pushAnswers'))
    .catch(console.error);
};
