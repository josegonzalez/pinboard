function addMenuItem(show, name, onClickFunction) {
    if ("yes" === show) {
        var parentElement = document.getElementById("menu"),
            menuItemElement = document.createElement("div");
        menuItemElement.setAttribute("class", "menu-item");
        menuItemElement.setAttribute("onclick", onClickFunction);
        menuItemElement.appendChild(document.createTextNode(name));
        parentElement.appendChild(menuItemElement);
    }
}

function addMenuItems() {
    var options = chrome.extension.getBackgroundPage().getOptionAll();
    if (options.userName && "" !== options.userName) {
        addMenuItem(options.showSaveBookmark,       "Save Bookmark",        "saveBookmark();");
        addMenuItem(options.showReadLater,          "Read Later",           "readLater();");
        addMenuItem(options.showUnreadBookmarks,    "Unread Bookmarks",     'openUrl("http://pinboard.in/toread/");');
        addMenuItem(options.showAllBookmarks,       "All Bookmarks",        'openUrl("http://pinboard.in/");');
        addMenuItem(options.showPrivateBookmarks,   "Private Bookmarks",    'openUrl("http://pinboard.in/u:' + options.userName + '/private/");');
        addMenuItem(options.showPublicBookmarks,    "Public Bookmarks",     'openUrl("http://pinboard.in/u:' + options.userName + '/public/");');
        addMenuItem(options.showUntaggedBookmarks,  "Untagged Bookmarks",   'openUrl("http://pinboard.in/u:' + options.userName + '/untagged/");');
        addMenuItem(options.showStarredBookmarks,   "Starred Bookmarks",    'openUrl("http://pinboard.in/u:' + options.userName + '/starred/");');
        addMenuItem(options.showSaveTabSet,        "Save Tab Set",         'saveTabs();');
        addMenuItem(options.showTabSets,            "Tab Sets",             'openUrl("http://pinboard.in/tabs/");');
    } else {
        addMenuItem("yes",                          "Setup User Name",      'openUrl("' + chrome.extension.getURL("options.html") + '");');
    }
}

function saveTabs() {
    chrome.windows.getAll({"populate" : true}, function (windows) {
        var winz = [],
            result = { browser: "chrome",  windows: winz },
            req   = new XMLHttpRequest(),
            params = new FormData(),
            chromeWinz = windows,
            chromeTabz = null,
            tabList = null,
            tabz = null,
            cTab = null;

        for (var i = 0; i < chromeWinz.length; i++) {
            chromeTabz = chromeWinz[i].tabs;
            tabz = [];

            for (var j = 0; j < chromeTabz.length; j++) {
                cTab = chromeTabz[j];
                if (cTab.url) {
                    tabz.push({ title: cTab.title, url: cTab.url });
                }
            }
            winz.push(tabz);
        }

        params.append("data", JSON.stringify(result));
        req.open("POST", 'https://pinboard.in/tabs/save/', true);

        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                chrome.tabs.create({url: 'https://pinboard.in/tabs/show/' });
            }
        };
        req.send(params);
    });
}



function openUrl(url) {
    chrome.tabs.getAllInWindow(null, function (tabs) {
        for (var i in tabs) {
            var tab = tabs[i];
            if (tab.url === url || tab.url === url.replace("http://", "https://")) {
                chrome.tabs.update(tab.id, {selected:true});
                return;
            }
        }
        chrome.tabs.create({url: url});
        window.close();
    });
}

function saveBookmark() {
    chrome.tabs.getSelected(null , function(tab) {
        chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function (response) {
            var description = response.data;
            var url = "http://pinboard.in/add?jump=close&url="
                + encodeURIComponent(tab.url) + "&title="
                + encodeURIComponent(tab.title);

            if (description.length > 0) {
                url += "&description=" + encodeURIComponent(description.substr(0, 256))
            }

            window.open(url, 'pinboard.in', "location=no,links=no,scrollbars=no,toolbar=no,width=700,height=350");
        });
    });
}

function readLater() {
    chrome.tabs.getSelected(null , function(tab) {
        window.open("http://pinboard.in/add?later=yes&noui=yes&jump=close&url="
                    + encodeURIComponent(tab.url) + "&title=" + encodeURIComponent(tab.title),
            "pinboad.in",
            "location=no,links=no,scrollbars=no,toolbar=no,width=0,height=0"
        );
    });
}