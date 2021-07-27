"use strict";

var API_URL = "http://localhost:8000";
var USER_ID = "tester"


// Add option when right-clicking
chrome.contextMenus.create({ title: "Highlight", onclick: highlightTextFromContext, contexts: ["selection"] });
// chrome.contextMenus.create({ title: "Toggle Cursor", onclick: toggleHighlighterCursorFromContext });
// chrome.contextMenus.create({ title: "Highlighter color", id: "highlight-colors" });
// chrome.contextMenus.create({ title: "Yellow", id: "yellow", parentId: "highlight-colors", type: "radio", onclick: changeColorFromContext });
// chrome.contextMenus.create({ title: "Cyan", id: "cyan", parentId: "highlight-colors", type: "radio", onclick: changeColorFromContext });
// chrome.contextMenus.create({ title: "Lime", id: "lime", parentId: "highlight-colors", type: "radio", onclick: changeColorFromContext });
// chrome.contextMenus.create({ title: "Magenta", id: "magenta", parentId: "highlight-colors", type: "radio", onclick: changeColorFromContext });

// Get the initial color value
// chrome.storage.sync.get('color', (values) => {
//     var color = values.color ? values.color : "yellow";
//     chrome.contextMenus.update(color, { checked: true });
// });

// Add Keyboard shortcut
chrome.commands.onCommand.addListener(function (command) {
    if (command === "execute-highlight") {
        trackEvent('highlight-source', 'keyboard-shortcut');
        highlightText();
    }
});

// Listen to messages from content scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action && request.action == 'highlight') {
        trackEvent('highlight-source', 'highlighter-cursor');
        highlightText();
    } else if (request.action && request.action == 'track-event') {
        if (request.trackCategory && request.trackAction) {
            trackEvent(request.trackCategory, request.trackAction)
        }
    }
    if (request.action == "getCategories") {

        axios.get(API_URL + '/categories')
            .then(function (response) {
                // handle success
                // console.log(response);
                sendResponse(response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        // return true;
    }
    if (request.action == "saveToServer") {

                // get the token from local storage and send as bearer authentication for this end point
        // if token is not present, send message back to the CFE and ask to show the login form

        chrome.storage.sync.get(['token'], function (result) {
            console.log('Value currently is ' + result.token);
            var token = result.token;

            if (token != null && token.length > 0) {
                // send request

                var data = {
                    user_id: USER_ID,
                    flagged_string: request.string,
                    category: request.category,
                    url: request.url
                   };

                var config = {
                    method: 'post',
                    url: API_URL + '/mark',
                    headers: { 
                      'Authorization': `Bearer ${token}`
                      //'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data : data
                  };
                
                axios(config)
                    .then(function (response) {
                        // handle success
                        sendResponse(response);
                        // return true;
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                        authenticationFalue()
                    })
                    .then(function () {
                        // always executed
                    });
            }
            else {
                authenticationFalue()
            }
        })
        
    }
    if (request.action == "removeFromServer") {

        // get the token from local storage and send as bearer authentication for this end point
        // if token is not present, send message back to the CFE and ask to show the login form

        chrome.storage.sync.get(['token'], function (result) {
            console.log('Value currently is ' + result.token);
            var token = result.token;

            if (token != null && token.length > 0) {
                // send request

                var data = {
                    _id: request._id,
                   };

                var config = {
                    method: 'delete',
                    url: API_URL + '/mark?_id='+request._id,
                    headers: { 
                      'Authorization': `Bearer ${token}`
                      //'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  };
                
                
                // axios.delete(API_URL + '/mark', {
                //     params: {
                //         _id: request._id,
                //     },
                //     config
                // })
                axios(config)
                    .then(function (response) {
                        // handle success
                        // console.log(response);
                        // return true;
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                        authenticationFalue()
                        // return false;
                    })
                    .then(function () {
                        // always executed
                    });
            }
            else {
                authenticationFalue()
            }
            // return false;
        })
    }
    if (request.action == "updateOnServer") {


        chrome.storage.sync.get(['token'], function (result) {
            console.log('Value currently is ' + result.token);
            var token = result.token;

            if (token != null && token.length > 0) {
                // send request

                console.log(request);

                var data = {
                    user_id: "",
                    flagged_string: "",
                    category: request.category,
                    url: ""
                   };

                var config = {
                    method: 'put',
                    url: API_URL + '/mark/' + request._id,
                    headers: { 
                      'Authorization': `Bearer ${token}`
                      //'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data : data
                  };
                
                axios(config)
                    .then(function (response) {
                        // handle success
                        sendResponse(response);
                        // return true;
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                        authenticationFalue()
                        // return false;
                    })
                    .then(function () {
                        // always executed
                    });
            }
            else {
                authenticationFalue()
            }
        })


        // axios.put(API_URL + '/mark/' + request._id, {

        //     user_id: "",
        //     flagged_string: "",
        //     category: request.category,
        //     url: ""
        // })
        //     .then(function (response) {
        //         // handle success
        //         // console.log(response);
        //         sendResponse(response)
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
        //     .then(function () {
        //         // always executed
        //     });
        // // return true;
    }
    return true;
});

function authenticationFalue() {
    alert("Authentication failure, please login (again)")
}

function highlightTextFromContext() {
    trackEvent('highlight-source', 'context-menu');
    highlightText();
}

function highlightText() {
    trackEvent('highlight-action', 'highlight');
    chrome.tabs.executeScript({ file: 'contentScripts/highlight.js' });
}

function toggleHighlighterCursorFromContext() {
    trackEvent('toggle-cursor-source', 'context-menu');
    toggleHighlighterCursor();
}

function toggleHighlighterCursor() {
    trackEvent('highlight-action', 'toggle-cursor');
    chrome.tabs.executeScript({ file: 'contentScripts/toggleHighlighterCursor.js' });
}

function removeHighlights() {
    trackEvent('highlight-action', 'clear-all');
    chrome.tabs.executeScript({ file: 'contentScripts/removeHighlights.js' });
}

function authenticate(username, password) {
    
    //authenticate even if already authenticated
    console.log(`authenticating with the server ${API_URL}/login/`);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);


    var token = '';
    // if token already present, return it
    chrome.storage.sync.get(['token'], function (result) {
        console.log('chrome.storage.token: ' + result.token);
        token = result.token;

        axios.post(API_URL + '/token', formData)
            .then(function (response) {
                // response came with with 200. 
                // store the access token in local storage
                console.log(`Token: ${response.data.access_token}`);
                // chrome.storage.sync.set({ token: response.data.access_token });
                chrome.storage.sync.set({ token: response.data.access_token }, function () {
                    console.log('Value is set to ' + response.data.access_token);
                });
                // set user email upon succesful login
                chrome.storage.sync.set({ user: username }, function () {});
            })
            .catch(function (error) {
                // handle error
                console.log(`Something went wrong. Error status: ${error.response.status}`);
            })
            .then(function () {
                // always executed
            });
    });
}

function logout() {
    chrome.storage.sync.remove('token',()=>{});
    chrome.storage.sync.remove('user',()=>{});
}

function showHighlight(highlightId) {
    trackEvent('highlight-action', 'show-highlight');

    chrome.tabs.executeScript({
        code: `var highlightId = ${highlightId};`
    }, function () {
        chrome.tabs.executeScript({ file: 'contentScripts/showHighlight.js' });
    });
}

function changeColorFromContext(info) {
    trackEvent('color-change-source', 'context-menu');
    changeColor(info.menuItemId);
}

function changeColor(color) {
    trackEvent('color-changed-to', color);
    chrome.storage.sync.set({ color: color });

    // Also update the context menu
    chrome.contextMenus.update(color, { checked: true });
}

function trackEvent(category, action) {
    // _gaq.push(['_trackEvent', category, action]);
}


function setApiUrl(value) {
    console.log("setting api value")
    API_URL = value;
}

function getApiUrl() {
    return API_URL
}

function setUserId() {

}

function getUserId() {

}

function getUser(callBack) {
    chrome.storage.sync.get('user', function (value) {
        callBack(value.user);
    });
}