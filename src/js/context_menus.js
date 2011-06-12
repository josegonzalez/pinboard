var pinlink = chrome.contextMenus.create({
    "title": "Post Link to Pinboard",
    "contexts": ["link"],
    "onclick": postpinlink
});

var pinpage = chrome.contextMenus.create({
    "title": "Post Page to Pinboard",
    "contexts": ["page"],
    "onclick": postpinpage
});

var pintext = chrome.contextMenus.create({
    "title": "Post Selection to Pinboard",
    "contexts": ["selection"],
    "onclick": postpintext
});

function postpinlink(info, tab) {
    var u = info.pageUrl,
        l = info.linkUrl,
        posturl = "http://pinboard.in/add?url=URLTEXT+&description=Original link found at:  FOUNDAT+&title=TTLTEXT";

    chrome.windows.create({
        "url": posturl.
            replace("URLTEXT", encodeURIComponent(l)).
            replace("FOUNDAT", encodeURIComponent(u)).
            replace("TTLTEXT", encodeURIComponent(l)),
        "type": "popup",
        "height": 300,
        "width": 550
    });
}

function postpinpage(info, tab) {
    var u = info.pageUrl,
        t = tab.title,
        posturl = "http://pinboard.in/add?url=URLTEXT+&title=TTLTEXT";

    chrome.windows.create({
        "url": posturl.
            replace("URLTEXT", encodeURIComponent(u)).
            replace("TTLTEXT", encodeURIComponent(t)),
        "type": "popup",
        "height": 300,
        "width": 550
    });
}

function postpintext(info, tab) {
    var u = info.pageUrl,
        t = tab.title,
        s = info.selectionText,
        posturl = "http://pinboard.in/add?url=URLTEXT+&description=SELTEXT+&title=TTLTEXT";

    chrome.windows.create({
        "url": posturl.
            replace("URLTEXT", encodeURIComponent(u)).
            replace("TTLTEXT", encodeURIComponent(t)).
            replace("SELTEXT", encodeURIComponent(s)),
        "type": "popup",
        "height": 300,
        "width": 550
    });
}