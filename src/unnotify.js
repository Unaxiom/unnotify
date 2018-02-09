"use strict";
exports.__esModule = true;
var notificationCenter;
var notificationCenterClassName = "unnotify-center";
var eachNotificationClassName = "unnotify-panel";
var notificationButtonClassName = "unnotify-button";
var defaultTimeout = 5000;
/**Creates and appends the stylesheet to the document */
function __unnotifyCreateStyleSheet(localNotificationCenterClassName, localEachNotificationClassName, notificationButtonClassName, side, clickable) {
    if (side === undefined || side === null) {
        side = "right";
    }
    else if (side === 'left') {
        side = 'left';
    }
    else {
        side = 'right';
    }
    var notificationCenterStyle = document.createElement("style");
    notificationCenterStyle.type = "text/css";
    notificationCenterStyle.innerHTML = __unnotifyReturnClasses(localNotificationCenterClassName, localEachNotificationClassName, notificationButtonClassName, side, clickable);
    document.getElementsByTagName('head')[0].appendChild(notificationCenterStyle);
    // Create the notification center
    notificationCenter = document.createElement("div");
    notificationCenter.classList.add(localNotificationCenterClassName);
    // document.body.appendChild(notificationCenter);
    document.body.insertBefore(notificationCenter, document.body.firstChild);
}
/**Returns the required classes */
function __unnotifyReturnClasses(localNotificationCenterClassName, localEachNotificationClassName, localNotificationButtonClassName, side, clickable) {
    var pointerEvents = "initial";
    if (!clickable) {
        pointerEvents = "none";
    }
    return "\n        ." + localNotificationCenterClassName + " {\n            position: absolute;\n            top: 20px;\n            z-index: 25000;\n            overflow-y: auto;\n            overflow-x: hidden;\n            pointer-events: " + pointerEvents + ";\n        }\n\n        ." + localEachNotificationClassName + " {\n            padding: 10px;\n            margin: 10px;\n            border-radius: 5px;\n            color: #fff;\n            width: 350px;\n            min-height: 40px;\n            position: static;\n            top: 30px;\n            z-index: 25100;\n            pointer-events: " + pointerEvents + ";\n        }\n\n        ." + localNotificationButtonClassName + " {\n            float: right;\n            position: relative;\n            top: -7px;\n            right: -10px;\n            background-color: transparent;\n            border: none;\n            pointer-events: initial;\n        }\n\n        .unnotify-success {\n            background-color: rgba(27, 94, 32, 0.8);\n        }\n\n        .unnotify-info {\n            background-color: rgba(29, 121, 198, 0.8);\n        }\n\n        .unnotify-warning {\n            background-color: rgba(251, 114, 4, 0.8);\n        }\n\n        .unnotify-danger {\n            background-color: rgba(213, 0, 0, 0.8);\n        }\n\n        /* Custom, iPhone Retina */ \n        @media only screen and (min-width : 320px) {\n            ." + localNotificationCenterClassName + " {\n                margin: 0px 2px;\n                padding: 0px 2px;\n            }\n\n            ." + localEachNotificationClassName + " {\n                width: 300px;\n            }\n        }\n    \n        /* Extra Small Devices, Phones */ \n        @media only screen and (min-width : 480px) {\n            ." + localNotificationCenterClassName + " {\n                width: 360px;\n                " + side + ": 0px;\n                padding: 10px;\n                margin: 0px 20px;\n            }\n\n            ." + localEachNotificationClassName + " {\n                width: 100%;\n            }\n        }\n    \n        /* Small Devices, Tablets */\n        @media only screen and (min-width : 768px) {\n            ." + localNotificationCenterClassName + " {\n                width: 360px;\n                " + side + ": 0px;\n                padding: 10px;\n                margin: 0px 20px;\n            }\n\n            ." + localEachNotificationClassName + " {\n                width: 100%;\n            }\n        }\n    ";
}
/**Returns the Div Element that houses the notification */
function __unnotifyDiv(eachNotificationClassName, options) {
    var div = document.createElement("div");
    div.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    div.classList.add(eachNotificationClassName);
    if (options.type == "success" || options.type == "info" || options.type == "danger" || options.type == "warning") {
        div.classList.add("unnotify-" + options.type);
    }
    else if (typeof (options.customClass) != "undefined" || typeof (options.customClass) != null || options.customClass != "") {
        div.classList.add(options.customClass);
    }
    if (typeof (options.animateIn) != "undefined") {
        div.classList.add("animated");
        div.classList.add(options.animateIn);
        div.setAttribute("data-animate-in", options.animateIn);
    }
    else {
        div.setAttribute("data-animate-in", "");
    }
    if (typeof (options.animateOut) != "undefined") {
        div.setAttribute("data-animate-out", options.animateOut);
    }
    else {
        div.setAttribute("data-animate-out", "");
    }
    return div;
}
/**Returns the title div */
function __unnotifyTitle(title) {
    var titleDiv = document.createElement("div");
    var titleSpan = document.createElement("span");
    titleSpan.innerText = title;
    titleDiv.appendChild(titleSpan);
    return titleDiv;
}
/**Returns the button which would close the notification */
function __unnotifyCloseButton(closeButtonClass) {
    var closeButton = document.createElement("button");
    closeButton.classList.add(closeButtonClass);
    closeButton.innerText = "x";
    return closeButton;
}
/**Returns the div that displays the content of the notification */
function __unnotifyContent(content) {
    var contentDiv = document.createElement("div");
    contentDiv.innerHTML = content;
    return contentDiv;
}
/**Internal function to display the notification */
function __unnotifyShow(eachNotificationClassName, notificationButtonClassName, title, content, options) {
    var div = __unnotifyDiv(eachNotificationClassName, options);
    var titleDiv = __unnotifyTitle(title);
    var closeButton = __unnotifyCloseButton(notificationButtonClassName);
    titleDiv.appendChild(closeButton);
    closeButton.addEventListener('click', function () {
        destroy(div.id);
    });
    // If timeout is 0, then don't autodestroy it
    if (typeof (options.timeout) == "undefined" || typeof (options.timeout) == null || options.timeout < 0) {
        setTimeout(function () {
            destroy(div.id);
        }, defaultTimeout);
    }
    else if (options.timeout > 0) {
        setTimeout(function () {
            destroy(div.id);
        }, options.timeout);
    }
    var contentDiv = __unnotifyContent(content);
    div.appendChild(titleDiv);
    div.appendChild(contentDiv);
    notificationCenter.appendChild(div);
    return div.id;
}
function __unnotifyDestroy(id) {
    try {
        var div_1 = document.getElementById(id);
        // Apply the animate-out class
        var animateOut = div_1.getAttribute("data-animate-out");
        var animateIn = div_1.getAttribute("data-animate-in");
        if (animateOut.length != 0) {
            if (!div_1.classList.contains("animated")) {
                div_1.classList.add("animated");
            }
            if (animateIn.length != 0) {
                div_1.classList.remove(animateIn);
            }
            div_1.classList.add(animateOut);
            setTimeout(function () {
                div_1.parentNode.removeChild(div_1);
            }, 1000);
        }
        else {
            div_1.parentNode.removeChild(div_1);
        }
    }
    catch (e) { }
}
/**Initialises the notification module */
function init(side, clickable) {
    __unnotifyCreateStyleSheet(notificationCenterClassName, eachNotificationClassName, notificationButtonClassName, side, clickable);
}
exports.init = init;
/**Displays the notification and returns the ID of the notification element. Title is a string, content can either be a string or HTML. */
function show(title, content, options) {
    return __unnotifyShow(eachNotificationClassName, notificationButtonClassName, title, content, options);
}
exports.show = show;
/**Destroys the notification with the associated ID */
function destroy(id) {
    __unnotifyDestroy(id);
}
exports.destroy = destroy;
/**Class that can display the notifications */
var Unnotify = /** @class */ (function () {
    /**Initialises everything. Accepts the side, whose dafault is right. Possible values are 'right', 'left' */
    function Unnotify(side, clickable) {
        this.localNotificationCenterClassName = notificationCenterClassName + "-" + side;
        this.localEachNotificationClassName = eachNotificationClassName + "-" + side;
        // Create the CSS rules required for the notification center
        __unnotifyCreateStyleSheet(this.localNotificationCenterClassName, this.localEachNotificationClassName, notificationButtonClassName, side, clickable);
    }
    /**Displays the notification and returns the ID of the notification element. Title is a string, content can either be a string or HTML. */
    Unnotify.prototype.show = function (title, content, options) {
        return __unnotifyShow(this.localEachNotificationClassName, notificationButtonClassName, title, content, options);
    };
    /**Destroys the notification with the associated ID */
    Unnotify.prototype.destroy = function (id) {
        __unnotifyDestroy(id);
    };
    return Unnotify;
}());
exports.Unnotify = Unnotify;
