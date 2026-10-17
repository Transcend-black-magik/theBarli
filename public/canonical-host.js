if (['the-barli-latest.web.app', 'the-barli-latest.firebaseapp.com'].includes(window.location.hostname)) {
  window.location.replace('https://thebarli.com' + window.location.pathname + window.location.search + window.location.hash);
}
