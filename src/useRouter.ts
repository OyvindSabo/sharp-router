import Router from '.';
import { useEffect, useState } from 'react';
import { ChangeListener } from './types';

export const useRouter = (router: Router) => {
  const [matchedRoute, setMatchedRoute] = useState(router.matchedRoute);
  const [params, setParams] = useState(router.params);

  useEffect(() => {
    const changeListener: ChangeListener = ({ matchedRoute, params }) => {
      setMatchedRoute(matchedRoute);
      setParams(params);
    };
    router.addChangeListener(changeListener);
    return () => router.removeChangeListener(changeListener);
  }, []);

  return { matchedRoute, params };
};
