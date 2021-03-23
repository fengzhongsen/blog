window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
      .then(registration => {
        registration.onupdatefound = () => {
          console.log('Service Worker 注册成功');
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state = 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('New content is available and will be used when all tabs for this page are close.');
              } else {
                console.log('Content is cached for offline use.');
              }
            }
          }
        }
      }).catch(error => {
        console.error('Error during service worker registration:', error);
      });
  }
});