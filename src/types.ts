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
export type Token = string;
export type Callback = ({
  params,
  currentRoute,
}: {
  params: Params;
  currentRoute: Route;
}) => void;
