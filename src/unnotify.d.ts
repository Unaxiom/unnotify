/**Initialises everything */
export declare function init(): void;
/**Displays the notification and returns the ID of the notification element. Title is a string, content can either be a string or HTML. */
export declare function show(title: string, content: string, options: options): string;
/**Destroys the notification with the associated ID */
export declare function destroy(id: string): void;
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
