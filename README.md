# unnotify

Pure JS growlish notifications with zero dependencies, simple API written in TypeScript. No jQuery needed either.

## Installation

```bash
user@username ~> npm install @unaxiom/unnotify --save
```

- If integrating using browserify:

In your typescript files, import as:

```ts
import * as unnotify from '@unaxiom/unnotify';
```

- If integrating to webpage:

```html
<script src="dist/unnotify.min.js" type="text/javascript"></script>
```

## Usage

- Simple functions

```js
// Initialization is required just once across all the files.
unnotify.init(); // Default is on the right. Also accepts a string - 'left' or 'right'.

// Can also be initialized in the following way
unnotify.init('right', true); // The second parameter denotes if the notification should have the ability to be clickable. Default is false.

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

- Use object

```js
var notificationCenter = new unnotify.Unnotify('right'); // Accepts either 'right' or 'left'
var id = notificationCenter.show("Hi", "From right", {
    timeout: 0,
    type: 'info',
    animateIn: 'fadeInUpBig',
    animateOut: 'rotateOutDownLeft'
});

setTimeout(function () {
    notificationCenter.destroy(id);
}, 8000);

notificationCenter.show("Hi Again", "From right", {
    timeout: 5000,
    type: 'danger',
    animateIn: 'fadeInUpBig',
    animateOut: 'rotateOutDownLeft'
});
```

## Dev

```bash
user@username ~> npm install
user@username ~> gulp
```

Make necessary code changes in unnotify.ts