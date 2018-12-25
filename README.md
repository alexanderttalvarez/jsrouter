# Simple Router
Simple router in JavaScript. Works with [URL in hash format](https://en.wikipedia.org/wiki/Fragment_identifier), and without params.

## Use
Start a new instance of the class:
```javascript
const router = new Router('#app')
```
The constructor admits two parameters. The first one is the DOM element where the routes will be rendered (mandatory), and the second one is an optional callback function. This function must return the HTML we want to render.

```javascript
const router = new Router('#app', function() {
    return "The current route doesn't exists";
})
```
### Adding new routes
For adding new routes use the addRoute method. It needs the route starting with / as first parameter, and a callback function returning the HTML to render as the second one.
```javascript
router.addRoute('/about', function() {
    return "Welcome to the <strong>about</strong> page";
})
```

### Navigating through the routes
Add a # symbol before your routes in your HTML links.
```html
<a href="#/about">About</a>
```

## Recomendations
Use Babel to transpile your code and make sure that it works with every browser.

## Future
These features are planned to be added in the future.
1. Parameters in the URL compatibility.
2. Singleton pattern.
3. Default route.
4. Complex routes handling.