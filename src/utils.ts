import type { Hash, Params, Route, Title, Token } from './types';

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
  for (let i of Object.keys(hashTokens)) {
    const hashToken = hashTokens[Number(i)];
    const routeToken = routeTokens[Number(i)];
    if (isParameterRouteToken(routeToken)) {
      const { parameter, type } = parseParameterRouteToken(routeToken);
      if (type === 'int') {
        if (!isInt(hashToken)) return false;
        params[parameter] = parseInt(hashToken);
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

export const getRouteAndParamsFromHash = (hash: Hash, routes: Route[]) => {
  for (const route of routes) {
    const match = getMatch(hash, route);
    if (match) {
      const { params, reconstructedHash } = match;
      return { route, params, reconstructedHash };
    }
  }
  return { route: '', params: {}, reconstructedHash: '' };
};
