if (window == top) {
  window.addEventListener('keyup', keyListener, false);
}

/**
* Keyboard keyup listener callback.
*/
function keyListener(e) {
  // Must press ctrl key to validate. Filter the keys if the keyCode is Shift/Ctrl/Alt since we are
  // capturing it via its own modifier.
  if (e.ctrlKey && e.keyCode == 68) {
    var description = window.getSelection().toString(),
        url = "http://pinboard.in/add?jump=close&url="
              + encodeURIComponent(window.location) + "&title="
              + encodeURIComponent(document.title);

    if (description.length > 0) {
      url += "&description=" + encodeURIComponent(description.substr(0, 256))
    }

    window.open(url, 'pinboard.in', "location=no,links=no,scrollbars=no,toolbar=no,width=700,height=300");
  }
}