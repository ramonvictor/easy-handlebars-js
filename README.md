# easy-handlebars-js
[![npm version](https://badge.fury.io/js/easy-handlebars-js.svg)](https://badge.fury.io/js/easy-handlebars-js)

Easy to memorize API to render handlebars templates.

## Usage
Add your template(s) using script tag:
```html
<script id="my-template" type="text/x-handlebars-template">
  <h1>{{title}}</h1>
</script>
```

Then, on JavaScript:
```js
const easyHandlebars = require('easy-handlebars');

easyHandlebars('my-template').render({
  title: 'Hi there!'
});
```
