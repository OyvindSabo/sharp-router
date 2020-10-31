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

export type Router = {
  params: Params;
  matchedRoute: Route;
  currentTitle: Title;
  // TODO: Consider if this could rather be Route[]
  _routes: Record<Route, Route>;
  _titleGetters: Record<Route, TitleGetter>;
  _changeListeners: ChangeListener[];
};
