/**Initialises the notification module */
export declare function init(side?: 'left' | 'right', clickable?: boolean): void;
/**Displays the notification and returns the ID of the notification element. Title is a string, content can either be a string or HTML. */
export declare function show(title: string, content: string, options: options): string;
/**Shows a confirmation notification (with two options: Confirm and Cancel) and accepts a confirmation callback (executed if the user confirms)
     * and an optional on-cancel callback (executed if the user cancels) and returns the ID of the notification */
export declare function confirm(content: string, options: options, onConfirmCallback: Function, onCancelCallback?: Function): string;
/**Shows a confirmation notification (with two options: Yes and No) and accepts a confirmation callback (executed if the user clicks on Yes)
    * and an optional callback that is executed if the user clicks on No, and returns the ID of the notification */
export declare function affirm(content: string, options: options, onConfirmCallback: Function, onCancelCallback?: Function): string;
/**Destroys the notification with the associated ID */
export declare function destroy(id: string): void;
/**Class that can display the notifications */
export declare class Unnotify {
    localNotificationCenterClassName: string;
    localEachNotificationClassName: string;
    /**Initialises everything. Accepts the side, whose dafault is right. Possible values are 'right', 'left' */
    constructor(side?: 'left' | 'right', clickable?: boolean);
    /**Displays the notification and returns the ID of the notification element. Title is a string, content can either be a string or HTML. */
    show(title: string, content: string, options: options): string;
    /**Shows a confirmation notification and accepts a confirmation callback (executed if the user confirms)
     * and an optional on-cancel callback (executed if the user cancels) and returns the ID of the notification */
    confirm(content: string, options: options, onConfirmCallback: Function, onCancelCallback?: Function): string;
    /**Shows a confirmation notification (with two options: Yes and No) and accepts a confirmation callback (executed if the user clicks on Yes)
    * and an optional callback that is executed if the user clicks on No, and returns the ID of the notification */
    affirm(content: string, options: options, onConfirmCallback: Function, onCancelCallback?: Function): string;
    /**Destroys the notification with the associated ID */
    destroy(id: string): void;
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
