import { useEffect, useState } from 'react';
import { ChangeListener, Router } from './types';

export const useRouter = (router: Router) => {
  const [route, setRoute] = useState(router.route);
  const [matchedRoute, setMatchedRoute] = useState(router.matchedRoute);
  const [params, setParams] = useState(router.params);

  useEffect(() => {
    const changeListener: ChangeListener = ({
      route,
      matchedRoute,
      params,
    }) => {
      setRoute(route);
      setMatchedRoute(matchedRoute);
      setParams(params);
    };
    router.addChangeListener(changeListener);
    return () => router.removeChangeListener(changeListener);
  }, []);

  return { route, matchedRoute, params };
};
