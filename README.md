# Sharp Router

An easy to use hash-based routing library for single-page JavaScript applications

- Routing is handled 100% in the browser - no server configuration required!
- Enables routing within a single page of a multi-page application - perfect for GitHub pages!
- Ships with TypeScript type declarations!
- Easy to use with React!

## Installation

```bash
npm install sharp-router
```

## Create your router

```javascript
import Router from 'sharp-router';

const router = new Router({
  '/': 'Home', // https://example.com
  '/login': 'Login', // https://example.com/#/login
  '/register': 'Register', // https://example.com/#/register
  '/users/<username:string>': 'Profile', // https://example.com/#/users/bob
});
```

## Navigation

The following examples show different ways to navigate to https://example.com/#/users/bob

```javascript
// With Sharp Router
router.navigateTo('/users/bob');
```

```javascript
// With vanilla JavaScript
location.hash = '#/users/bob';
```

```html
<!-- With HTML -->
<a href="#/users/bob">Bob's profile</a>
```

## Access the matched route, as well as its parameters

```javascript
console.log(router.currentRoute); // '/users/<username:string>'
console.log(router.params); // { username: 'bob' }
```

## Listen to route changes

```javascript
router.addChangeListener(({ currentRoute, params }) => {
  console.log(currentRoute); // '/users/<username:string>'
  console.log(params); // { username: 'bob' }
});
```

## Using Sharp Router with React

```javascript
import React, { useEffect, useState } from 'react';
import Router from 'sharp-router';

const router = new Router({
  '/': 'Home',
  '/login': 'Login',
  '/register': 'Register',
  '/users/<username:string>': 'Profile',
});

const ComponentWithRouting = () => {
  const [currentRoute, setCurrentRoute] = useState('');
  const [params, setParams] = useState({});

  useEffect(() => {
    router.addChangeListener(({ currentRoute, params }) => {
      setCurrentRoute(currentRoute);
      setParams(params);
    });
  });

  switch (currentRoute) {
    case '/login':
      return <div>Login</div>;
    case '/register':
      return <div>Register</div>;
    case '/users/<username:string>':
      return <div>{params.username}'s profile</div>;
    default:
      return <div>Home</div>;
  }
};
```

## Publishing a new version

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
