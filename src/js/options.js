function getTextValue(elementId) {
    var textElement = document.getElementById(elementId);
    return textElement.value;
}

function setTextValue(elementId, text) {
    var textElement = document.getElementById(elementId);
    textElement.value = text;
}

function getIconName() {
    if (document.getElementById("iconNameB").checked) {
        return "b";
    } else if (document.getElementById("iconNameC").checked) {
        return "c";
    } else if (document.getElementById("iconNameD").checked) {
        return "d";
    }
    return "a";
}

function setIconName(iconName) {
    if ("b" === iconName) {
        document.getElementById("iconNameB").checked = true;
    } else if ("c" === iconName) {
        document.getElementById("iconNameC").checked = true;
    } else if ("d" === iconName) {
        document.getElementById("iconNameD").checked = true;
    } else {
        document.getElementById("iconNameA").checked = true;
    }
}

function getCheckboxState(elementId) {
    var checkboxElement = document.getElementById(elementId);
    if (true === checkboxElement.checked) {
        return "yes";
    } else {
        return "no";
    }
}

function setCheckboxState(elementId, checked) {
    var checkboxElement = document.getElementById(elementId);
    checkboxElement.checked = ("yes" === checked);
}

function showOptionsSavedMessage() {
    var statusElement = document.getElementById("optionsSavedMessage");
    statusElement.setAttribute("style", "visibility: visible;");
    setTimeout(function () { statusElement.setAttribute("style", "visibility: hidden;"); }, 1000);
}

function loadOptions() {
    var options = chrome.extension.getBackgroundPage().getOptionAll();
    setTextValue("userName", options.userName);
    setIconName(options.iconName);
    setCheckboxState("showSaveBookmark",      options.showSaveBookmark);
    setCheckboxState("showReadLater",         options.showReadLater);
    setCheckboxState("showUnreadBookmarks",   options.showUnreadBookmarks);
    setCheckboxState("showAllBookmarks",      options.showAllBookmarks);
    setCheckboxState("showPrivateBookmarks",  options.showPrivateBookmarks);
    setCheckboxState("showPublicBookmarks",   options.showPublicBookmarks);
    setCheckboxState("showUntaggedBookmarks", options.showUntaggedBookmarks);
    setCheckboxState("showStarredBookmarks",  options.showStarredBookmarks);
    setCheckboxState("showSaveTabSet",        options.showSaveTabSet);
    setCheckboxState("showTabSets",           options.showTabSets);
}

function saveOptions() {
    chrome.extension.getBackgroundPage().setOptionAll({
        userName: getTextValue("userName"),
        iconName: getIconName(),
        showSaveBookmark:                     getCheckboxState("showSaveBookmark"),
        showReadLater:                        getCheckboxState("showReadLater"),
        showUnreadBookmarks:                  getCheckboxState("showUnreadBookmarks"),
        showAllBookmarks:                     getCheckboxState("showAllBookmarks"),
        showPrivateBookmarks:                 getCheckboxState("showPrivateBookmarks"),
        showPublicBookmarks:                  getCheckboxState("showPublicBookmarks"),
        showUntaggedBookmarks:                getCheckboxState("showUntaggedBookmarks"),
        showStarredBookmarks:                 getCheckboxState("showStarredBookmarks"),
        showSaveTabSet:                       getCheckboxState("showSaveTabSet"),
        showTabSets:                          getCheckboxState("showTabSets")
    });
    showOptionsSavedMessage();
}