"use strict";
exports.__esModule = true;
var notificationCenter;
var notificationCenterClassName = "unnotify-center";
var eachNotificationClassName = "unnotify-panel";
var notificationButtonClassName = "unnotify-button";
var defaultTimeout = 5000;
/**Class that can display the notifications */
var Unnotify = /** @class */ (function () {
    /**Initialises everything. Accepts the side, whose dafault is right. Possible values are 'right', 'left' */
    function Unnotify(side) {
        if (side === undefined || side === null) {
            side = "right";
        }
        else if (side === 'left') {
            side = 'left';
        }
        else {
            side = 'right';
        }
        // Create the CSS rules required for the notification center
        var notificationCenterStyle = document.createElement("style");
        notificationCenterStyle.type = "text/css";
        notificationCenterStyle.innerHTML = "\n        ." + notificationCenterClassName + " {\n            position: absolute;\n            top: 20px;\n            z-index: 25000;\n            overflow-y: auto;\n            overflow-x: hidden;\n        }\n\n        ." + eachNotificationClassName + " {\n            padding: 10px;\n            margin: 10px;\n            border-radius: 5px;\n            color: #fff;\n            width: 350px;\n            min-height: 40px;\n            position: static;\n            top: 30px;\n            z-index: 25100;\n            pointer-events: none;\n        }\n\n        ." + notificationButtonClassName + " {\n            float: right;\n            position: relative;\n            top: -7px;\n            right: -10px;\n            background-color: transparent;\n            border: none;\n            pointer-events: initial;\n        }\n\n        .unnotify-success {\n            background-color: rgba(27, 94, 32, 0.8);\n        }\n\n        .unnotify-info {\n            background-color: rgba(29, 121, 198, 0.8);\n        }\n\n        .unnotify-warning {\n            background-color: rgba(251, 114, 4, 0.8);\n        }\n\n        .unnotify-danger {\n            background-color: rgba(213, 0, 0, 0.8);\n        }\n\n        /* Custom, iPhone Retina */ \n        @media only screen and (min-width : 320px) {\n            ." + notificationCenterClassName + " {\n                margin: 0px 2px;\n                padding: 0px 2px;\n            }\n\n            ." + eachNotificationClassName + " {\n                width: 300px;\n            }\n        }\n    \n        /* Extra Small Devices, Phones */ \n        @media only screen and (min-width : 480px) {\n            ." + notificationCenterClassName + " {\n                width: 360px;\n                right: 0px;\n                padding: 10px;\n                margin: 0px 20px;\n            }\n\n            ." + eachNotificationClassName + " {\n                width: 100%;\n            }\n        }\n    \n        /* Small Devices, Tablets */\n        @media only screen and (min-width : 768px) {\n            ." + notificationCenterClassName + " {\n                width: 360px;\n                right: 0px;\n                padding: 10px;\n                margin: 0px 20px;\n            }\n\n            ." + eachNotificationClassName + " {\n                width: 100%;\n            }\n        }\n    ";
        document.getElementsByTagName('head')[0].appendChild(notificationCenterStyle);
        // Create the notification center
        notificationCenter = document.createElement("div");
        notificationCenter.classList.add(notificationCenterClassName);
        // document.body.appendChild(notificationCenter);
        document.body.insertBefore(notificationCenter, document.body.firstChild);
    }
    /**Displays the notification and returns the ID of the notification element. Title is a string, content can either be a string or HTML. */
    Unnotify.prototype.show = function (title, content, options) {
        var div = document.createElement("div");
        div.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        div.classList.add(eachNotificationClassName);
        if (options.type == "success" || options.type == "info" || options.type == "danger" || options.type == "warning") {
            div.classList.add("unnotify-" + options.type);
        }
        else if (typeof (options.customClass) != "undefined" || typeof (options.customClass) != null || options.customClass != "") {
            div.classList.add(options.customClass);
        }
        var titleDiv = document.createElement("div");
        var titleSpan = document.createElement("span");
        titleSpan.innerText = title;
        titleDiv.appendChild(titleSpan);
        var closeButton = document.createElement("button");
        closeButton.classList.add(notificationButtonClassName);
        closeButton.innerText = "x";
        titleDiv.appendChild(closeButton);
        var unnotifyObj = this;
        closeButton.addEventListener('click', function () {
            unnotifyObj.destroy(div.id);
        });
        // If timeout is 0, then don't autodestroy it
        if (typeof (options.timeout) == "undefined" || typeof (options.timeout) == null || options.timeout < 0) {
            setTimeout(function () {
                unnotifyObj.destroy(div.id);
            }, defaultTimeout);
        }
        else if (options.timeout > 0) {
            setTimeout(function () {
                unnotifyObj.destroy(div.id);
            }, options.timeout);
        }
        var contentDiv = document.createElement("div");
        contentDiv.innerHTML = content;
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
        div.appendChild(titleDiv);
        div.appendChild(contentDiv);
        notificationCenter.appendChild(div);
        return div.id;
    };
    /**Destroys the notification with the associated ID */
    Unnotify.prototype.destroy = function (id) {
        try {
            var unnotifyObj_1 = this;
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
                    unnotifyObj_1.__destroy(div_1);
                }, 1000);
            }
            else {
                unnotifyObj_1.__destroy(div_1);
            }
        }
        catch (e) { }
    };
    /**Internal function to destroy the notification */
    Unnotify.prototype.__destroy = function (div) {
        try {
            div.parentNode.removeChild(div);
        }
        catch (e) { }
    };
    return Unnotify;
}());
exports.Unnotify = Unnotify;
