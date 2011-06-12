if (window === top) {
    window.addEventListener('keyup', function (e) {
        if (e.ctrlKey && e.keyCode === 68) {
            var description = window.getSelection().toString(),
                url = "http://pinboard.in/add?jump=close&url="
                    + encodeURIComponent(window.location) + "&title="
                    + encodeURIComponent(document.title);

            if (description.length > 0) {
                url += "&description=" + encodeURIComponent(description.substr(0, 256));
            }

            window.open(url, 'pinboard.in', "location=no,links=no,scrollbars=no,toolbar=no,width=700,height=300");
        }
    }, false);
}