![SHARP](https://user-images.githubusercontent.com/25663729/97790020-76c41000-1bc5-11eb-8bb2-84c3a97ab24a.png)

<div align=center><b>An easy to use hash-based routing library for single-page JavaScript applications</b></div>

### Key Features

- Routing is handled 100% in the browser - no server configuration required!
- Enables routing within a single page of a multi-page application - perfect for GitHub pages!
- Ships with TypeScript type declarations!
- Easy to use with React!

### Installation

```bash
npm install sharp-router
```

### Create your router

The following example shows how to create a router for an npm-like package manager website

```javascript
import createRouter from 'sharp-router';

const router = createRouter({
  '/': 'Build amazing things',
  '/package/<packageName>': ({ packageName }) => packageName,
  '/package/<packageName>/v/<major:int>/<minor:int>/<patch:int>': ({ packageName }) => packageName,
});
```

### Navigation

The following examples show different ways to navigate to example.com/#/package/sharp-router/v/4/1/3

```javascript
// With Sharp Router
router.navigateTo('/package/sharp-router/v/4/1/3');
```

```javascript
// With vanilla JavaScript
location.hash = '#/package/sharp-router/v/4/1/3';
```

```html
<!-- With HTML -->
<a href="#/package/sharp-router/v/4/1/3">sharp-router</a>
```

### Access current route, matched route pattern and extracted parameters

```javascript
console.log(router.route);        // '/package/sharp-router/v/4/1/3'
console.log(router.matchedRoute); // '/package/<packageName>/v/<major:int>/<minor:int>/<patch:int>'
console.log(router.params);       // { packageName: 'sharp-router', major: 4, minor: 1, patch: 3 }
```

### Listen to route changes

```javascript
const changeListener = ({ route, matchedRoute, params }) => {
  console.log(route);        // '/package/sharp-router/v/4/1/3'
  console.log(matchedRoute); // '/package/<packageName>/v/<major:int>/<minor:int>/<patch:int>'
  console.log(params);       // { packageName: 'sharp-router', major: 4, minor: 1, patch: 3 }
};

router.addChangeListener(changeListener);
router.removeChangeListener(changeListener);
```

### Using Sharp Router with React

```javascript
import React from 'react';
import createRouter, { useRouter } from 'sharp-router';

const router = createRouter({
  '/': 'Build amazing things',
  '/package/<packageName>': ({ packageName }) => packageName,
  '/package/<packageName>/v/<major:int>/<minor:int>/<patch:int>': ({ packageName }) => packageName,
});

const ComponentWithRouting = () => {
  const { route, matchedRoute, params } = useRouter(router);
  return (
    <div>
      <div>
        route: <pre>{route}</pre>
      </div>
      <div>
        matchedRoute: <pre>{matchedRoute}</pre>
      </div>
      <div>
        matchedRoute: <pre>{JSON.stringify(params, null, 2)}</pre>
      </div>
    </div>
  );
};
```

### Publishing a new version

Check that linting, formatting, build and tests pass

```bash
npm run lint
npm run format
npm run build
npm test
```

Bump version

```bash
npm version [major | minor | patch]
```

Publish to NPM

```bash
npm publish
```
