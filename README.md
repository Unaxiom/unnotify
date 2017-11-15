# unnotify
Pure JS growlish notifications with zero dependencies, simple API written in TypeScript. No jQuery needed either.

## Installation

```bash
npm install unnotify --save
```

- If integrating using browserify:

In your typescript files, import as:

```ts
import * as unnotify from 'unnotify';
```

- If integrating to webpage:

```html
<script src="unnotify.min.js" type="text/javascript"></script>
```

## Usage

```js
// Initialization is required just once across all the files.
unnotify.init();

// To display a notification
var notificationID = unnotify.show('This is the Title', 'This is the content', {
    type: 'success' | 'info' | 'warning' | 'danger' | 'custom',
    timeout: 5000, // Number of milliseconds for which this notification needs to be displayed. If value is 0, then it won't be automatically destroyed.
    customClass: '', // (**Optional**) Name of the custom class that will be used instead of builtin classes. For this to be used, **type** should be set to 'custom'. 
    animateIn: 'lightSpeedIn', // (**Optional**) Name of the animation class (from animate.css) that needs to be used while creating the notification.
    animateOut: 'bounceOut', // (**Optional**) Name of the animation class (from animate.css) that needs to be used while destroying the notification.
})

// To close the notification programatically
unnotify.destroy(notificationID);
```

