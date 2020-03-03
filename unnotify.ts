let notificationCenter: HTMLDivElement;
const notificationCenterClassName = "unnotify-center";
const eachNotificationClassName = "unnotify-panel";
const notificationButtonClassName = "unnotify-button";
const defaultTimeout = 5000;

/**Creates and appends the stylesheet to the document */
function __unnotifyCreateStyleSheet(localNotificationCenterClassName: string, localEachNotificationClassName: string, notificationButtonClassName: string, side: string, clickable: boolean) {
    if (side === undefined || side === null) {
        side = "right";
    } else if (side === 'left') {
        side = 'left';
    } else {
        side = 'right';
    }
    let notificationCenterStyle = document.createElement("style");
    notificationCenterStyle.type = "text/css";
    notificationCenterStyle.innerHTML = __unnotifyReturnClasses(localNotificationCenterClassName, localEachNotificationClassName, notificationButtonClassName, side, clickable)
    document.getElementsByTagName('head')[0].appendChild(notificationCenterStyle);

    // Create the notification center
    notificationCenter = document.createElement("div");
    notificationCenter.classList.add(localNotificationCenterClassName);
    // document.body.appendChild(notificationCenter);
    document.body.insertBefore(notificationCenter, document.body.firstChild);
}

/**Returns the required classes */
function __unnotifyReturnClasses(localNotificationCenterClassName: string, localEachNotificationClassName: string, localNotificationButtonClassName: string, side: string, clickable: boolean): string {
    let pointerEvents = "initial";
    if (!clickable) {
        pointerEvents = "none";
    }
    return `
        .${localNotificationCenterClassName} {
            position: absolute;
            top: 20px;
            z-index: 25000;
            overflow-y: auto;
            overflow-x: hidden;
            pointer-events: ${pointerEvents};
        }

        .${localEachNotificationClassName} {
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            color: #fff;
            width: 350px;
            min-height: 40px;
            position: static;
            top: 30px;
            z-index: 25100;
            pointer-events: ${pointerEvents};
        }

        .${localNotificationButtonClassName} {
            float: right;
            position: relative;
            top: -7px;
            right: -10px;
            background-color: transparent;
            border: none;
            pointer-events: initial;
        }

        .unnotify-close-btn {
            color: #fff;
            cursor: pointer;
        }

        .unnotify-action-btn {
            width: 50%;
            color: #fff;
            text-align: center;
            padding: 5px 0px;
            margin-top: 10px;
            border: none;
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0);
            outline: none;
        }

        .unnotify-action-btn:hover {
            background-color: rgba(0, 0, 0, 0.1);
            outline: none;
        }

        .unnotify-input {
            background-color: rgba(0, 0, 0, 0.2);
            width: 100%;
            margin: 5px 0px;
            padding: 5px 0px;
            text-align: center;
            color: #fff;
            border-top-style: hidden;
            border-right-style: hidden;
            border-left-style: hidden;
            border-bottom-style: hidden;
        }

        .unnotify-success {
            background-color: rgba(27, 94, 32, 0.8);
        }

        .unnotify-info {
            background-color: rgba(29, 121, 198, 0.8);
        }

        .unnotify-warning {
            background-color: rgba(251, 114, 4, 0.8);
        }

        .unnotify-danger {
            background-color: rgba(213, 0, 0, 0.8);
        }

        /* Custom, iPhone Retina */ 
        @media only screen and (min-width : 320px) {
            .${localNotificationCenterClassName} {
                margin: 0px 2px;
                padding: 0px 2px;
            }

            .${localEachNotificationClassName} {
                width: 300px;
            }
        }
    
        /* Extra Small Devices, Phones */ 
        @media only screen and (min-width : 480px) {
            .${localNotificationCenterClassName} {
                width: 360px;
                ${side}: 0px;
                padding: 0px 10px;
                margin: 0px 20px;
            }

            .${localEachNotificationClassName} {
                width: 90%;
            }
        }
    
        /* Small Devices, Tablets */
        @media only screen and (min-width : 768px) {
            .${localNotificationCenterClassName} {
                width: 360px;
                ${side}: 0px;
                padding: 0px 10px;
                margin: 0px 20px;
            }

            .${localEachNotificationClassName} {
                width: 90%;
            }
        }
    `;
}

/**Returns a random ID */
function randomID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**Returns the Div Element that houses the notification */
function __unnotifyDiv(eachNotificationClassName: string, options: options): HTMLDivElement {
    let div = document.createElement("div");
    div.id = randomID();
    div.classList.add(eachNotificationClassName);

    if (options.type == "success" || options.type == "info" || options.type == "danger" || options.type == "warning") {
        div.classList.add("unnotify-" + options.type);
    } else if (typeof (options.customClass) != "undefined" || typeof (options.customClass) != null || options.customClass != "") {
        div.classList.add(options.customClass);
    }

    if (typeof (options.animateIn) != "undefined") {
        div.classList.add("animated");
        div.classList.add(options.animateIn);
        div.setAttribute("data-animate-in", options.animateIn);
    } else {
        div.setAttribute("data-animate-in", "");
    }

    if (typeof (options.animateOut) != "undefined") {
        div.setAttribute("data-animate-out", options.animateOut);
    } else {
        div.setAttribute("data-animate-out", "");
    }

    return div;
}

/**Returns the title div */
function __unnotifyTitle(title: string): HTMLDivElement {
    let titleDiv = document.createElement("div");
    let titleSpan = document.createElement("span");
    titleSpan.style.fontWeight = "700";
    titleSpan.style.fontSize = "1.6rem";
    titleSpan.innerText = title;
    titleDiv.appendChild(titleSpan);
    return titleDiv;
}

/**Returns the button which would close the notification */
function __unnotifyCloseButton(closeButtonClass: string): HTMLButtonElement {
    let closeButton = document.createElement("button");
    closeButton.classList.add(closeButtonClass);
    closeButton.classList.add("unnotify-close-btn");
    closeButton.innerText = "x";
    return closeButton;
}

function __unnotifyActionButton(text: string): HTMLButtonElement {
    let btn = document.createElement("button");
    btn.classList.add("unnotify-action-btn");
    btn.innerText = text;
    return btn
}

/**Returns the div that displays the content of the notification */
function __unnotifyContent(content: string): HTMLDivElement {
    let contentDiv = document.createElement("div");
    contentDiv.innerHTML = content;
    return contentDiv;
}

function __setupDestroyEventHandlers(div: HTMLDivElement, options: options) {
    // If timeout is 0, then don't autodestroy it
    if (typeof (options.timeout) == "undefined" || typeof (options.timeout) == null || options.timeout < 0) {
        setTimeout(function () {
            destroy(div.id);
        }, defaultTimeout);
    } else if (options.timeout > 0) {
        setTimeout(function () {
            destroy(div.id);
        }, options.timeout)
    }
}

/**Internal function to display the notification */
function __unnotifyShow(eachNotificationClassName: string, notificationButtonClassName: string, title: string, content: string, options: options): string {
    let div = __unnotifyDiv(eachNotificationClassName, options);
    let titleDiv = __unnotifyTitle(title);
    let closeButton = __unnotifyCloseButton(notificationButtonClassName);

    titleDiv.appendChild(closeButton);
    closeButton.addEventListener('click', function () {
        destroy(div.id);
    });

    let contentDiv = __unnotifyContent(content);

    div.appendChild(titleDiv);
    div.appendChild(contentDiv);
    __setupDestroyEventHandlers(div, options);
    notificationCenter.appendChild(div);

    return div.id;
}

/**Internal function to display a confirmation notification */
function __unnotifyConfirm(eachNotificationClassName: string, notificationButtonClassName: string, content: string, options: options, confirmButtonName: "Confirm" | "Yes", cancelButtonName: "Cancel" | "No", onConfirmCallback: (evt: MouseEvent, id: string) => void, onCancelCallback: (evt: MouseEvent, id: string) => void): string {
    let div = __unnotifyDiv(eachNotificationClassName, options);
    let closeButton = __unnotifyCloseButton(notificationButtonClassName);
    closeButton.addEventListener('click', function () {
        destroy(div.id);
    });
    let contentDiv = __unnotifyContent(content);
    let confirmButton = __unnotifyActionButton(confirmButtonName);
    let cancelButton = __unnotifyActionButton(cancelButtonName);

    div.appendChild(closeButton);
    div.appendChild(contentDiv);
    div.appendChild(confirmButton);
    div.appendChild(cancelButton);

    if (onConfirmCallback != undefined && onConfirmCallback != null) {
        confirmButton.addEventListener('click', evt => {
            onConfirmCallback(evt, div.id);
        });
    }
    if (onCancelCallback != undefined && onCancelCallback != null) {
        cancelButton.addEventListener('click', evt => {
            onCancelCallback(evt, div.id);
        });
    }
    
    
    notificationCenter.appendChild(div);
    return div.id;
}

/**Internal function to display an input notification */
function __unnotifyInputHandler(eachNotificationClassName: string, notificationButtonClassName: string, title: string, options: options, onNextCallback: (evt: MouseEvent, id: string, valueEntered: string) => void, onCancelCallback: (evt: MouseEvent, id: string) => void): string {
    let div = __unnotifyDiv(eachNotificationClassName, options);
    let closeButton = __unnotifyCloseButton(notificationButtonClassName);
    closeButton.addEventListener('click', function () {
        destroy(div.id);
    });
    let titleDiv = __unnotifyContent(title);
    
    let inp = document.createElement("input");
    inp.id = randomID();
    inp.classList.add("unnotify-input");


    let confirmButton = __unnotifyActionButton("Next");
    let cancelButton = __unnotifyActionButton("Cancel");

    div.appendChild(closeButton);
    div.appendChild(titleDiv);
    div.appendChild(inp);

    div.appendChild(confirmButton);
    div.appendChild(cancelButton);

    if (onNextCallback != undefined && onNextCallback != null) {
        confirmButton.addEventListener('click', evt => {
            let valueEntered = inp.value;
            onNextCallback(evt, div.id, valueEntered);
        });
    }
    if (onCancelCallback != undefined && onCancelCallback != null) {
        cancelButton.addEventListener('click', evt => {
            onCancelCallback(evt, div.id);
        });
    }
    
    notificationCenter.appendChild(div);
    return div.id;
}

/**Internal function to destroy the notification with the given id */
function __unnotifyDestroy(id: string) {
    try {
        let div = <HTMLDivElement>document.getElementById(id);
        // Apply the animate-out class
        let animateOut = div.getAttribute("data-animate-out");
        let animateIn = div.getAttribute("data-animate-in");
        if (animateOut.length != 0) {
            if (!div.classList.contains("animated")) {
                div.classList.add("animated");
            }
            if (animateIn.length != 0) {
                div.classList.remove(animateIn);
            }
            div.classList.add(animateOut);
            setTimeout(function () {
                div.parentNode.removeChild(div);
            }, 1000);
        } else {
            div.parentNode.removeChild(div);
        }
    } catch (e) { }
}

/**Initialises the notification module */
export function init(side?: 'left' | 'right', clickable?: boolean) {
    __unnotifyCreateStyleSheet(notificationCenterClassName, eachNotificationClassName, notificationButtonClassName, side, clickable);
}

/**Displays the notification and returns the ID of the notification element. Title is a string, content can either be a string or HTML. */
export function show(title: string, content: string, options: options): string {
    return __unnotifyShow(eachNotificationClassName, notificationButtonClassName, title, content, options);
}

/**Shows a confirmation notification (with two options: Confirm and Cancel) and accepts a confirmation callback (executed if the user confirms) 
     * and an optional on-cancel callback (executed if the user cancels) and returns the ID of the notification */
export function confirm(content: string, options: options, onConfirmCallback: (evt: MouseEvent, id: string) => void, onCancelCallback?: (evt: MouseEvent, id: string) => void): string {
    return __unnotifyConfirm(eachNotificationClassName, notificationButtonClassName, content, options, "Confirm", "Cancel", onConfirmCallback, onCancelCallback);
}

/**Shows a confirmation notification (with two options: Yes and No) and accepts a confirmation callback (executed if the user clicks on Yes) 
    * and an optional callback that is executed if the user clicks on No, and returns the ID of the notification */
export function affirm(content: string, options: options, onConfirmCallback: (evt: MouseEvent, id: string) => void, onCancelCallback?: (evt: MouseEvent, id: string) => void): string {
    return __unnotifyConfirm(eachNotificationClassName, notificationButtonClassName, content, options, "Yes", "No", onConfirmCallback, onCancelCallback);
}

/**Displays a notification with the provision for an input, which is passed to the onNextCallback when the user clicks on "Next" */
export function input(title: string, options: options, onNextCallback: (evt: MouseEvent, id: string, valueEntered: string) => void, onCancelCallback?: (evt: MouseEvent, id: string) => void): string {
    return __unnotifyInputHandler(eachNotificationClassName, notificationButtonClassName, title, options, onNextCallback, onCancelCallback);
}

/**Destroys the notification with the associated ID */
export function destroy(id: string) {
    __unnotifyDestroy(id);
}

/**Class that can display the notifications */
export class Unnotify {
    localNotificationCenterClassName: string
    localEachNotificationClassName: string
    /**Initialises everything. Accepts the side, whose dafault is right. Possible values are 'right', 'left' */
    constructor(side?: 'left' | 'right', clickable?: boolean) {
        this.localNotificationCenterClassName = `${notificationCenterClassName}-${side}`;
        this.localEachNotificationClassName = `${eachNotificationClassName}-${side}`;
        // Create the CSS rules required for the notification center
        __unnotifyCreateStyleSheet(this.localNotificationCenterClassName, this.localEachNotificationClassName, notificationButtonClassName, side, clickable)
    }

    /**Displays the notification and returns the ID of the notification element. Title is a string, content can either be a string or HTML. */
    show(title: string, content: string, options: options): string {
        return __unnotifyShow(this.localEachNotificationClassName, notificationButtonClassName, title, content, options);
    }

    /**Shows a confirmation notification and accepts a confirmation callback (executed if the user confirms) 
     * and an optional on-cancel callback (executed if the user cancels) and returns the ID of the notification */
    confirm(content: string, options: options, onConfirmCallback: (evt: MouseEvent, id: string) => void, onCancelCallback?: (evt: MouseEvent, id: string) => void): string {
        return __unnotifyConfirm(this.localEachNotificationClassName, notificationButtonClassName, content, options, "Confirm", "Cancel", onConfirmCallback, onCancelCallback);
    }

    /**Shows a confirmation notification (with two options: Yes and No) and accepts a confirmation callback (executed if the user clicks on Yes) 
    * and an optional callback that is executed if the user clicks on No, and returns the ID of the notification */
    affirm(content: string, options: options, onConfirmCallback: (evt: MouseEvent, id: string) => void, onCancelCallback?: (evt: MouseEvent, id: string) => void): string {
        return __unnotifyConfirm(this.localEachNotificationClassName, notificationButtonClassName, content, options, "Yes", "No", onConfirmCallback, onCancelCallback);
    }

    /**Displays a notification with the provision for an input, which is passed to the onNextCallback when the user clicks on "Next" */
    input(title: string, options: options, onNextCallback: (evt: MouseEvent, id: string, valueEntered: string) => void, onCancelCallback?: (evt: MouseEvent, id: string) => void): string {
        return __unnotifyInputHandler(this.localEachNotificationClassName, notificationButtonClassName, title, options, onNextCallback, onCancelCallback);
    }

    /**Destroys the notification with the associated ID */
    destroy(id: string) {
        __unnotifyDestroy(id);
    }
}

/**Stores the available options */
export interface options {
    /**Notification type, if custom, then customClass will hold the class name that needs to be applied. */
    type: 'success' | 'info' | 'warning' | 'danger' | 'custom' | string;
    /**Timeout in milliseconds. Default is 5000. */
    timeout?: number;
    /**Class name to be applied to the notification. `type` should be set to `custom`. */
    customClass?: string;
    /**Set the animate.css animationIn class */
    animateIn?: string;
    /**Set the animate.css animationOut class */
    animateOut?: string;
}