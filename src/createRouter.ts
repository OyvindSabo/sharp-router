import { handleSetRoutes } from './reducers';
import type {
  Params,
  Route,
  Title,
  TitleGetter,
  ChangeListener,
  RouterState,
} from './types';
import {
  getRouteAndParamsFromHash,
  withChangeListener,
  withoutChangeListener,
} from './utils';

const createRouter = (routes: Record<Route, Title | TitleGetter>) => {
  let state: RouterState = {
    params: {},
    matchedRoute: '',
    currentTitle: '',
    routes: {},
    titleGetters: {},
    changeListeners: [],
  };

  const setParams = (params: Params) => {
    state.params = params;
  };

  const setMatchedRoute = (route: Route) => {
    state.matchedRoute = route;
  };

  const setCurrentTitle = (title: Title) => {
    state.currentTitle = title;
  };

  const removeHash = () => {
    history.replaceState(null, document.title, ' ');
  };

  const syncWithHash = () => {
    const { hash } = location;
    const { route, params, reconstructedHash } = getRouteAndParamsFromHash(
      hash,
      Object.keys(state.routes),
    );
    setParams(params);
    setMatchedRoute(state.routes[route]);
    setCurrentTitle(state.titleGetters[route](params));
    if (reconstructedHash === '#') {
      removeHash();
    } else {
      history.replaceState(undefined, document.title, reconstructedHash);
    }
    document.title = state.currentTitle;
  };

  const callChangeListeners = () => {
    state.changeListeners.forEach((changeListener) => {
      changeListener({
        params: state.params,
        matchedRoute: state.matchedRoute,
      });
    });
  };

  // Public methods

  const setRoutes = (routes: Record<Route, Title | TitleGetter>) => {
    state = handleSetRoutes(state, routes);
    syncWithHash();
  };

  const navigateTo = (route: Route) => {
    location.hash = `#${route}`;
  };

  // TODO: Consider removing this
  const refresh = () => {
    syncWithHash();
    callChangeListeners();
  };

  const addChangeListener = (changeListenerToBeAdded: ChangeListener) => {
    state.changeListeners = withChangeListener(
      state.changeListeners,
      changeListenerToBeAdded,
    );
  };

  const removeChangeListener = (changeListenerToBeRemoved: ChangeListener) => {
    state.changeListeners = withoutChangeListener(
      state.changeListeners,
      changeListenerToBeRemoved,
    );
  };

  // On initialization
  setRoutes(routes);
  window.addEventListener('hashchange', () => {
    syncWithHash();
    callChangeListeners();
  });

  return {
    params: state.params,
    matchedRoute: state.matchedRoute,
    currentTitle: state.currentTitle,
    setRoutes,
    navigateTo,
    refresh,
    addChangeListener,
    removeChangeListener,
  };
};

export default createRouter;
