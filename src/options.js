"use strict";

var backgroundPage = chrome.extension.getBackgroundPage();

var apiEl = document.getElementById('api');
var apiSaveBtn = document.getElementById('api-save-button');

apiSaveBtn.addEventListener('click', () => {
    backgroundPage.setApiUrl(apiEl.value)
    apiEl.value = backgroundPage.getApiUrl();
    close();
});
 

(function () {
    console.log('setURLInput - '+backgroundPage.getApiUrl());
    apiEl.value = backgroundPage.getApiUrl();
})();