/**
 * Same as Route, but with a hash at the beginning
 */
export type Hash = string;
export type Params = Record<string, boolean | number | string>; // TODO: Check that boolean is actually supported
/**
 * Same as Hash, but without the hash at the beginning
 */
export type Route = string;
export type Title = string;
export type TitleGetter = ((params: Params) => Title) | (() => Title);
export type ThunkedString = () => string;
export type Token = string;
export type ChangeListener = ({
  params,
  matchedRoute,
}: {
  params: Params;
  matchedRoute: Route;
}) => void;

export type RouterState = {
  params: Params;
  matchedRoute: Route;
  currentTitle: Title;
  // TODO: Consider if this could rather be Route[]
  routes: Record<Route, Route>;
  titleGetters: Record<Route, TitleGetter>;
  changeListeners: ChangeListener[];
};

export type Router = {
  params: Params;
  matchedRoute: Route;
  currentTitle: Title;
  setRoutes: (routes: Record<Route, Title | TitleGetter>) => void;
  navigateTo: (route: Route) => void;
  refresh: VoidFunction;
  addChangeListener: (changeListenerToBeAdded: ChangeListener) => void;
  removeChangeListener: (changeListenerToBeRemoved: ChangeListener) => void;
};
