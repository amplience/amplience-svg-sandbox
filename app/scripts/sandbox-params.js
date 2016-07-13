(function() {
  var STORAGE_NAME = 'ampSvgSandboxParams';

  var sandboxParams = localStorage.getItem(STORAGE_NAME) || '';
  var queryString = window.location.search;
  var previews = document.getElementsByClassName('amp-preview');

  if (!queryString && sandboxParams) {
    window.location.href = window.location.href.split('?')[0] + sandboxParams;
  } else if (queryString === '?clear') {
    localStorage.setItem(STORAGE_NAME, '');
    window.location.href = window.location.href.split('?')[0];
  } else {
    localStorage.setItem(STORAGE_NAME, queryString);
  }


  if (previews) {
    forEach(previews, function(preview) {
      var image = preview.getElementsByClassName('amp-preview-img')[0];
      var label = preview.getElementsByClassName('amp-preview-url')[0];
      var newSrc = image.getAttribute('src').split('?')[0] + window.location.search;

      image.setAttribute('src', newSrc);
      label.innerHTML = newSrc.replace(/&/gi, '&amp;');
    });
  }

  function forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, array[i], i);
    }
  }
})();
