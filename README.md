# jQuery age gate

jQuery age gate is a flexible plug-in for people who can write their own CSS. It can use an existing dialog element with a CSS selector or retrieve a remote one with an XHR-compatible string. It comes with two lightweight cookie adapters.

## Installation

### Bower

From the command line:

```shell
bower install --save jquery-age-gate
```

In your HTML:

```html
<script src="bower_components/jquery-age-gate/jquery-age-gate.min.js">
```

### npm

Alternatively, you can install from npm. From the command line:

```shell
npm install --save jquery-age-gate
```

In your HTML:

```html
<script src="node_modules/jquery-age-gate/jquery-age-gate.min.js">
```

## Usage

You can run the age gate with the default options inside a document ready handler like so:

```javascript
$(function () {

  $.ageGate();
  
});
```

You can also run it with your own options. Here they are with their default values:

```javascript
$(function () {

  $.ageGate({
    whitelistSelector: 'meta[name="age-restricted"][content="false"]',
    backdropId: 'age-gate-backdrop',
    activeBackdropClass: 'active',
    dialogSrc: '#age-gate-dialog',
    activeDialogClass: 'active',
    invalidAgeDialogClass: 'invalid',
    minimumAgeSelector: '[name="age-gate-minimum"]',
    parseUserDateFunction: function () { /* ... */ },
    enterButtonSelector: '.age-gate-enter',
    focusSelector: 'input[name="age-gate-month"]',
    expiration: Infinity
  });
  
});
```

Check out the [examples](examples) to see how the options can be used.
