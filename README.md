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

```javascript
import createRouter from 'sharp-router';

const router = createRouter({
  '/': 'Home of shopping',
  '/<category:string>/<page:int>': ({ category }) => `Shop ${category}`,
  '/<category:string>/<productName:string>': ({ productName }) => productName,
  '/cart': 'Shopping cart',
});
```

### Navigation

The following examples show different ways to navigate to example.com/#/animals/1

```javascript
// With Sharp Router
router.navigateTo('/animals/1');
```

```javascript
// With vanilla JavaScript
location.hash = '#/animals/1';
```

```html
<!-- With HTML -->
<a href="#/animals/1">Shop animals</a>
```

### Access current route, matched route pattern and extracted parameters

```javascript
console.log(router.route);        // '/animals/1'
console.log(router.matchedRoute); // '/<category:string>/<page:int>'
console.log(router.params);       // { category: 'animals', page: 1 }
```

### Listen to route changes

```javascript
const changeListener = ({ route, matchedRoute, params }) => {
  console.log(route);        // '/animals/1'
  console.log(matchedRoute); // '/<category:string>/<page:int>'
  console.log(params);       // { category: 'animals', page: 1 }
};

router.addChangeListener(changeListener);
router.removeChangeListener(changeListener);
```

### Using Sharp Router with React

```javascript
import React from 'react';
import createRouter, { useRouter } from 'sharp-router';

const router = createRouter({
  '/': 'Home of shopping',
  '/<category:string>/<page:int>': ({ category }) => `Shop ${category}`,
  '/<category:string>/<productName:string>': ({ productName }) => productName,
  '/cart': 'Shopping cart',
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
