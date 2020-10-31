import { handleSetRoutes } from './reducers';
import type {
  Params,
  Route,
  Title,
  TitleGetter,
  ChangeListener,
} from './types';
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
  _titleGetters: Record<Route, TitleGetter>;
  _changeListeners: ChangeListener[];
  constructor(routes: Record<Route, Title | TitleGetter>) {
    this.params = {};
    this.matchedRoute = '';
    this.currentTitle = '';
    this._routes = {};
    this._titleGetters = {};
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
    this._setCurrentTitle(this._titleGetters[route](params));
    if (reconstructedHash === '#') {
      this._removeHash();
    } else {
      history.replaceState(undefined, document.title, reconstructedHash);
    }
    document.title = this.currentTitle;
  };

  setRoutes = (routes: Record<Route, Title | TitleGetter>) => {
    const {
      routes: processedRoutes,
      titleGetters: processedTitleGetters,
    } = handleSetRoutes(this, routes);
    this._routes = processedRoutes;
    this._titleGetters = processedTitleGetters;
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
