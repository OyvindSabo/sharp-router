import type { Params, Route, Title, ChangeListener } from './types';
import {
  getRouteAndParamsFromHash,
  withChangeListener,
  withoutChangeListener,
} from './utils';

class Router {
  params: Params;
  matchedRoute: Route;
  currentTitle: Title;
  // TODO: Consider if this could rather be Route[]
  _routes: Record<Route, Route>;
  _titles: Record<Route, Title>;
  _changeListeners: ChangeListener[];
  constructor(routes: Record<Route, Title>) {
    this.params = {};
    this.matchedRoute = '';
    this.currentTitle = '';
    this._routes = {};
    this._titles = {};
    this._changeListeners = [];
    this.setRoutes(routes);
    window.addEventListener('hashchange', () => {
      this._syncWithHash();
      this._callChangeListeners();
    });
  }

  _setParams = (params: Params) => {
    this.params = params;
  };

  _setMatchedRoute = (route: Route) => {
    this.matchedRoute = route;
  };

  _setCurrentTitle = (title: Title) => {
    this.currentTitle = title;
  };

  _removeHash = () => {
    return history.replaceState(null, document.title, ' ');
  };

  _syncWithHash = () => {
    const { hash } = location;
    const { route, params, reconstructedHash } = getRouteAndParamsFromHash(
      hash,
      Object.keys(this._routes),
    );
    this._setParams(params);
    this._setMatchedRoute(this._routes[route]);
    this._setCurrentTitle(this._titles[route]);
    if (reconstructedHash === '#') {
      this._removeHash();
    } else {
      history.replaceState(undefined, document.title, reconstructedHash);
    }
    document.title = this.currentTitle;
  };

  setRoutes = (routes: Record<Route, Title>) => {
    Object.entries(routes).forEach(([route, title]) => {
      this._routes[route] = route;
      this._titles[route] = title;
      if (route === '/') {
        this._routes[''] = route;
        this._titles[''] = title;
      }
    });
    this._syncWithHash();
  };

  navigateTo = (route: Route) => {
    location.hash = `#${route}`;
  };

  // TODO: Consider removing this
  refresh = () => this._syncWithHash();

  _callChangeListeners = () => {
    this._changeListeners.forEach((changeListener) => {
      changeListener({ params: this.params, matchedRoute: this.matchedRoute });
    });
  };

  addChangeListener = (changeListenerToBeAdded: ChangeListener) => {
    this._changeListeners = withChangeListener(
      this._changeListeners,
      changeListenerToBeAdded,
    );
  };

  removeChangeListener = (changeListenerToBeRemoved: ChangeListener) => {
    this._changeListeners = withoutChangeListener(
      this._changeListeners,
      changeListenerToBeRemoved,
    );
  };
}

export default Router;
