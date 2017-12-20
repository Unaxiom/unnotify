let notificationCenter: HTMLDivElement;
const notificationCenterClassName = "unnotify-center";
const eachNotificationClassName = "unnotify-panel";
const notificationButtonClassName = "unnotify-button";
const defaultTimeout = 5000;

/**Class that can display the notifications */
export class Unnotify {
    localNotificationCenterClassName: string
    localEachNotificationClassName: string
    /**Initialises everything. Accepts the side, whose dafault is right. Possible values are 'right', 'left' */
    constructor(side?: 'left' | 'right') {
        if (side === undefined || side === null) {
            side = "right";
        } else if (side === 'left') {
            side = 'left';
        } else {
            side = 'right';
        }
        this.localNotificationCenterClassName = `${notificationCenterClassName}-${side}`;
        this.localEachNotificationClassName = `${eachNotificationClassName}-${side}`;
        // Create the CSS rules required for the notification center
        let notificationCenterStyle = document.createElement("style");
        notificationCenterStyle.type = "text/css";
        notificationCenterStyle.innerHTML = `
        .${this.localNotificationCenterClassName} {
            position: absolute;
            top: 20px;
            z-index: 25000;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .${this.localEachNotificationClassName} {
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            color: #fff;
            width: 350px;
            min-height: 40px;
            position: static;
            top: 30px;
            z-index: 25100;
            pointer-events: none;
        }

        .${notificationButtonClassName} {
            float: right;
            position: relative;
            top: -7px;
            right: -10px;
            background-color: transparent;
            border: none;
            pointer-events: initial;
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
            .${this.localNotificationCenterClassName} {
                margin: 0px 2px;
                padding: 0px 2px;
            }

            .${this.localEachNotificationClassName} {
                width: 300px;
            }
        }
    
        /* Extra Small Devices, Phones */ 
        @media only screen and (min-width : 480px) {
            .${this.localNotificationCenterClassName} {
                width: 360px;
                ${side}: 0px;
                padding: 10px;
                margin: 0px 20px;
            }

            .${this.localEachNotificationClassName} {
                width: 100%;
            }
        }
    
        /* Small Devices, Tablets */
        @media only screen and (min-width : 768px) {
            .${this.localNotificationCenterClassName} {
                width: 360px;
                ${side}: 0px;
                padding: 10px;
                margin: 0px 20px;
            }

            .${this.localEachNotificationClassName} {
                width: 100%;
            }
        }
    `;
        document.getElementsByTagName('head')[0].appendChild(notificationCenterStyle);

        // Create the notification center
        notificationCenter = document.createElement("div");
        notificationCenter.classList.add(this.localNotificationCenterClassName);
        // document.body.appendChild(notificationCenter);
        document.body.insertBefore(notificationCenter, document.body.firstChild);
    }

    /**Displays the notification and returns the ID of the notification element. Title is a string, content can either be a string or HTML. */
    show(title: string, content: string, options: options): string {
        let div = document.createElement("div");
        div.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        div.classList.add(this.localEachNotificationClassName);

        if (options.type == "success" || options.type == "info" || options.type == "danger" || options.type == "warning") {
            div.classList.add("unnotify-" + options.type);
        } else if (typeof (options.customClass) != "undefined" || typeof (options.customClass) != null || options.customClass != "") {
            div.classList.add(options.customClass);
        }

        let titleDiv = document.createElement("div");
        let titleSpan = document.createElement("span");
        titleSpan.innerText = title;
        titleDiv.appendChild(titleSpan);
        let closeButton = document.createElement("button");
        closeButton.classList.add(notificationButtonClassName);
        closeButton.innerText = "x";
        titleDiv.appendChild(closeButton);
        let unnotifyObj = this;
        closeButton.addEventListener('click', function () {
            unnotifyObj.destroy(div.id);
        });

        // If timeout is 0, then don't autodestroy it
        if (typeof (options.timeout) == "undefined" || typeof (options.timeout) == null || options.timeout < 0) {
            setTimeout(function () {
                unnotifyObj.destroy(div.id);
            }, defaultTimeout);
        } else if (options.timeout > 0) {
            setTimeout(function () {
                unnotifyObj.destroy(div.id);
            }, options.timeout)
        }

        let contentDiv = document.createElement("div");
        contentDiv.innerHTML = content;

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

        div.appendChild(titleDiv);
        div.appendChild(contentDiv);
        notificationCenter.appendChild(div);
        return div.id;
    }

    /**Destroys the notification with the associated ID */
    destroy(id: string) {
        try {
            let unnotifyObj = this;
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
                    unnotifyObj.__destroy(div);
                }, 1000);
            } else {
                unnotifyObj.__destroy(div);
            }
        } catch (e) { }
    }

    /**Internal function to destroy the notification */
    private __destroy(div: HTMLDivElement) {
        try {
            div.parentNode.removeChild(div);
        } catch (e) { }
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