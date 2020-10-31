import type { ChangeListener, Hash, Params, Route, Token } from './types';

const getTokens = (hash: Hash) =>
  hash
    .split('/')
    .filter(Boolean)
    .filter((element) => element !== '#');

const isParameterRouteToken = (token: Token) => {
  if (
    token.indexOf('<') !== 0 ||
    !token.slice(2, -4).includes(':') ||
    token.indexOf('>') !== token.length - 1
  ) {
    return false;
  }
  const [, type] = token
    .slice(token.indexOf('<') + 1, token.indexOf('>'))
    .split(':');

  if (!['int', 'string', 'number'].includes(type)) {
    return false;
  }
  return true;
};

const parseParameterRouteToken = (token: Token) => {
  const [parameter, type] = token
    .slice(token.indexOf('<') + 1, token.indexOf('>'))
    .split(':');
  return {
    parameter,
    type,
  };
};

const isNumber = (possiblyNumber: Token) => !isNaN(Number(possiblyNumber));

const isInt = (possiblyInt: Token) => {
  return (
    isNumber(possiblyInt) && parseInt(possiblyInt, 10) === Number(possiblyInt)
  );
};

const appendTokenToHash = (hash: Hash, token: Token) => `${hash}/${token}`;

const getMatch = (hash: Hash, route: Route) => {
  const hashTokens = getTokens(hash);
  const routeTokens = getTokens(route);
  const params: Params = {};
  let reconstructedHash = '#';
  if (hashTokens.length !== routeTokens.length) return false;
  for (const i of Object.keys(hashTokens)) {
    const hashToken = hashTokens[Number(i)];
    const routeToken = routeTokens[Number(i)];
    if (isParameterRouteToken(routeToken)) {
      const { parameter, type } = parseParameterRouteToken(routeToken);
      if (type === 'int') {
        if (!isInt(hashToken)) return false;
        params[parameter] = parseInt(hashToken, 10);
        reconstructedHash = appendTokenToHash(reconstructedHash, hashToken);
      } else if (type === 'number') {
        if (!isNumber(hashToken)) return false;
        params[parameter] = Number(hashToken);
        reconstructedHash = appendTokenToHash(reconstructedHash, hashToken);
      } else if (type === 'string') {
        params[parameter] = hashToken;
        reconstructedHash = appendTokenToHash(reconstructedHash, hashToken);
      }
    } else {
      if (hashToken !== routeToken) return false;
      reconstructedHash = appendTokenToHash(reconstructedHash, hashToken);
    }
  }
  return { params, reconstructedHash };
};

export const getRouteAndParamsFromHash = (
  hash: Hash,
  routePatterns: Route[],
) => {
  for (const routePattern of routePatterns) {
    const match = getMatch(hash, routePattern);
    if (match) {
      const { params, reconstructedHash } = match;
      const route = reconstructedHash.substr(1);
      return { route, routePattern, params, reconstructedHash };
    }
  }
  return { route: '', routePattern: '', params: {}, reconstructedHash: '' };
};

export const withChangeListener = (
  changeListeners: ChangeListener[],
  changeListenerToBeAdded: ChangeListener,
) => {
  return [...changeListeners, changeListenerToBeAdded];
};

export const withoutChangeListener = (
  changeListeners: ChangeListener[],
  changeListenerToBeRemoved: ChangeListener,
) => {
  return changeListeners.filter(
    (changeListener) => changeListener !== changeListenerToBeRemoved,
  );
};
