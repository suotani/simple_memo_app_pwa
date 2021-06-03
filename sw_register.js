if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./ServiceWorker.js').then(registration => {
    console.log('ServiceWorker registration successful.');
    registration.onupdatefound = function() {
      console.log('ServiceWorker update.');
      registration.update();
    }
  }).catch(err => {
    console.log('ServiceWorker registration failed.');
  });
}