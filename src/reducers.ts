import { Route, Router, Title, TitleGetter } from './types';

export const handleSetRoutes = (
  state: Router,
  routes: Record<Route, Title | TitleGetter>,
) => {
  const processedRoutes: Record<Route, Route> = {};
  const processedTitleGetters: Record<Route, TitleGetter> = {};
  Object.entries(routes).forEach(([route, titleOrTitleGetter]) => {
    processedRoutes[route] = route;
    const titleGetter =
      titleOrTitleGetter instanceof Function
        ? titleOrTitleGetter
        : () => titleOrTitleGetter;
    processedTitleGetters[route] = titleGetter;
    if (route === '/') {
      processedRoutes[''] = route;
      processedTitleGetters[''] = titleGetter;
    }
  });
  return {
    ...state,
    routes: processedRoutes,
    titleGetters: processedTitleGetters,
  };
};
