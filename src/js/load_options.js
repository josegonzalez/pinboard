function getOptionValue(name, defaultValue) {
    var value = localStorage[name];

    if (!value) {
        return defaultValue;
    }

    return value;
}

function setOptionValue(name, value) {
    if (value) {
        localStorage[name] = value;
    } else {
        localStorage.removeItem(name);
    }
}

function getOptionUserName() {
    return getOptionValue("userName", "");
}

function setOptionUserName(value) {
    setOptionValue("userName", value);
}

function getOptionIconName() {
    return getOptionValue("iconName", "a");
}

function setOptionIconName(value) {
    setOptionValue("iconName", value);
}

function getOptionShowSaveBookmark() {
    return getOptionValue("showSaveBookmark", "yes");
}

function setOptionShowSaveBookmark(value) {
    setOptionValue("showSaveBookmark", value);
}

function getOptionShowReadLater() {
    return getOptionValue("showReadLater", "yes");
}

function setOptionShowReadLater(value) {
    setOptionValue("showReadLater", value);
}

function getOptionShowUnreadBookmarks() {
    return getOptionValue("showUnreadBookmarks", "yes");
}

function setOptionShowUnreadBookmarks(value) {
    setOptionValue("showUnreadBookmarks", value);
}

function getOptionShowAllBookmarks() {
    return getOptionValue("showAllBookmarks", "no");
}

function setOptionShowAllBookmarks(value) {
    setOptionValue("showAllBookmarks", value);
}

function getOptionShowPrivateBookmarks() {
    return getOptionValue("showPrivateBookmarks", "no");
}

function setOptionShowPrivateBookmarks(value) {
    setOptionValue("showPrivateBookmarks", value);
}

function getOptionShowPublicBookmarks() {
    return getOptionValue("showPublicBookmarks", "no");
}

function setOptionShowPublicBookmarks(value) {
    setOptionValue("showPublicBookmarks", value);
}

function getOptionShowUntaggedBookmarks() {
    return getOptionValue("showUntaggedBookmarks", "no");
}

function setOptionShowUntaggedBookmarks(value) {
    setOptionValue("showUntaggedBookmarks", value);
}

function getOptionShowStarredBookmarks() {
    return getOptionValue("showStarredBookmarks", "no");
}

function setOptionShowStarredBookmarks(value) {
    setOptionValue("showStarredBookmarks", value);
}

function getOptionShowSaveTabSet() {
    return getOptionValue("showSaveTabSet", "no");
}

function setOptionShowSaveTabSet(value) {
    setOptionValue("showSaveTabSet", value);
}

function getOptionShowTabSets() {
    return getOptionValue("showTabSets", "no");
}

function setOptionShowTabSets(value) {
    setOptionValue("showTabSets", value);
}

function getOptionAll() {
    return {
        userName:               getOptionUserName(),
        iconName:               getOptionIconName(),
        showSaveBookmark:       getOptionShowSaveBookmark(),
        showReadLater:          getOptionShowReadLater(),
        showUnreadBookmarks:    getOptionShowUnreadBookmarks(),
        showAllBookmarks:       getOptionShowAllBookmarks(),
        showPrivateBookmarks:   getOptionShowPrivateBookmarks(),
        showPublicBookmarks:    getOptionShowPublicBookmarks(),
        showUntaggedBookmarks:  getOptionShowUntaggedBookmarks(),
        showStarredBookmarks:   getOptionShowStarredBookmarks(),
        showSaveTabSet:         getOptionShowSaveTabSet(),
        showTabSets:            getOptionShowTabSets()
    };
}

function setOptionAll(value) {
    setOptionValue("userName",              value.userName);
    setOptionValue("iconName",              value.iconName);
    setOptionValue("showSaveBookmark",      value.showSaveBookmark);
    setOptionValue("showReadLater",         value.showReadLater);
    setOptionValue("showUnreadBookmarks",   value.showUnreadBookmarks);
    setOptionValue("showAllBookmarks",      value.showAllBookmarks);
    setOptionValue("showPrivateBookmarks",  value.showPrivateBookmarks);
    setOptionValue("showPublicBookmarks",   value.showPublicBookmarks);
    setOptionValue("showUntaggedBookmarks", value.showUntaggedBookmarks);
    setOptionValue("showStarredBookmarks",  value.showStarredBookmarks);
    setOptionValue("showSaveTabSet",        value.showSaveTabSet);
    setOptionValue("showTabSets",           value.showTabSets);
    updateIcon();
}

function updateIcon() {
    chrome.browserAction.setIcon({path: "src/img/icon_19_" + getOptionIconName() + ".png"});
}

updateIcon();