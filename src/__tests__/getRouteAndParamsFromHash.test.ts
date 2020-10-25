import { getRouteAndParamsFromHash } from '../utils';

test('Test static routing happy path', () => {
  expect(
    getRouteAndParamsFromHash('#', ['/', '/about', '/users']),
  ).toStrictEqual({
    route: '/',
    params: {},
    reconstructedHash: '#',
  });
  expect(
    getRouteAndParamsFromHash('#/about', ['/', '/about', '/users']),
  ).toStrictEqual({
    route: '/about',
    params: {},
    reconstructedHash: '#/about',
  });
  expect(
    getRouteAndParamsFromHash('#/users', ['/', '/about', '/users']),
  ).toStrictEqual({
    route: '/users',
    params: {},
    reconstructedHash: '#/users',
  });
});

test('Test recognizing and cleaning routes with a trailing slash', () => {
  expect(
    getRouteAndParamsFromHash('#/', ['/', '/about', '/users']),
  ).toStrictEqual({
    route: '/',
    params: {},
    reconstructedHash: '#',
  });
  expect(
    getRouteAndParamsFromHash('#/about/', ['/', '/about', '/users']),
  ).toStrictEqual({
    route: '/about',
    params: {},
    reconstructedHash: '#/about',
  });
  expect(
    getRouteAndParamsFromHash('#/users/', ['/', '/about', '/users']),
  ).toStrictEqual({
    route: '/users',
    params: {},
    reconstructedHash: '#/users',
  });
});

test('Test extracting string parameter from routes', () => {
  expect(
    getRouteAndParamsFromHash('#', [
      '/',
      '/about',
      '/topics',
      '/topics/<topicId:string>',
    ]),
  ).toStrictEqual({
    route: '/',
    params: {},
    reconstructedHash: '#',
  });
  expect(
    getRouteAndParamsFromHash('#/about', [
      '/',
      '/about',
      '/topics',
      '/topics/<topicId:string>',
    ]),
  ).toStrictEqual({
    route: '/about',
    params: {},
    reconstructedHash: '#/about',
  });
  expect(
    getRouteAndParamsFromHash('#/topics', [
      '/',
      '/about',
      '/topics',
      '/topics/<topicId:string>',
    ]),
  ).toStrictEqual({
    route: '/topics',
    params: {},
    reconstructedHash: '#/topics',
  });
  expect(
    getRouteAndParamsFromHash('#/topics/art-and-culture', [
      '/',
      '/about',
      '/topics',
      '/topics/<topicId:string>',
    ]),
  ).toStrictEqual({
    route: '/topics/<topicId:string>',
    params: { topicId: 'art-and-culture' },
    reconstructedHash: '#/topics/art-and-culture',
  });
});

test('Test extracting integer parameters from routes', () => {
  expect(
    getRouteAndParamsFromHash('#/rgb/255/0/0', [
      '/rgb/<r:int>/<g:int>/<b:int>',
    ]),
  ).toStrictEqual({
    route: '/rgb/<r:int>/<g:int>/<b:int>',
    params: { r: 255, g: 0, b: 0 },
    reconstructedHash: '#/rgb/255/0/0',
  });
});

test('Test extracting integer parameters from route', () => {
  expect(
    getRouteAndParamsFromHash('#/rgb/255/0/0', [
      '/rgb/<r:int>/<g:int>/<b:int>',
    ]),
  ).toStrictEqual({
    route: '/rgb/<r:int>/<g:int>/<b:int>',
    params: { r: 255, g: 0, b: 0 },
    reconstructedHash: '#/rgb/255/0/0',
  });
  expect(
    getRouteAndParamsFromHash('#/rgb/0/255/0', [
      '/rgb/<r:int>/<g:int>/<b:int>',
    ]),
  ).toStrictEqual({
    route: '/rgb/<r:int>/<g:int>/<b:int>',
    params: { r: 0, g: 255, b: 0 },
    reconstructedHash: '#/rgb/0/255/0',
  });
  expect(
    getRouteAndParamsFromHash('#/rgb/0/0/255', [
      '/rgb/<r:int>/<g:int>/<b:int>',
    ]),
  ).toStrictEqual({
    route: '/rgb/<r:int>/<g:int>/<b:int>',
    params: { r: 0, g: 0, b: 255 },
    reconstructedHash: '#/rgb/0/0/255',
  });
});

test('Test extracting integer and number parameters from routes', () => {
  expect(
    getRouteAndParamsFromHash('#/rgb/255/0/0/0.3', [
      '/rgb/<r:int>/<g:int>/<b:int>/<a:number>',
    ]),
  ).toStrictEqual({
    route: '/rgb/<r:int>/<g:int>/<b:int>/<a:number>',
    params: { r: 255, g: 0, b: 0, a: 0.3 },
    reconstructedHash: '#/rgb/255/0/0/0.3',
  });
  expect(
    getRouteAndParamsFromHash('#/rgb/0/255/0/0.3', [
      '/rgb/<r:int>/<g:int>/<b:int>/<a:number>',
    ]),
  ).toStrictEqual({
    route: '/rgb/<r:int>/<g:int>/<b:int>/<a:number>',
    params: { r: 0, g: 255, b: 0, a: 0.3 },
    reconstructedHash: '#/rgb/0/255/0/0.3',
  });
  expect(
    getRouteAndParamsFromHash('#/rgb/0/0/255/0.3', [
      '/rgb/<r:int>/<g:int>/<b:int>/<a:number>',
    ]),
  ).toStrictEqual({
    route: '/rgb/<r:int>/<g:int>/<b:int>/<a:number>',
    params: { r: 0, g: 0, b: 255, a: 0.3 },
    reconstructedHash: '#/rgb/0/0/255/0.3',
  });
});
