import Router from '..';
import { useEffect, useState } from 'react';
import { ChangeListener } from '../types';

export const useRouter = (router: Router) => {
  const [currentRoute, setCurrentRoute] = useState(router.currentRoute);
  const [params, setParams] = useState(router.params);

  useEffect(() => {
    const changeListener: ChangeListener = ({ currentRoute, params }) => {
      setCurrentRoute(currentRoute);
      setParams(params);
    };
    router.addChangeListener(changeListener);
    return () => router.removeChangeListener(changeListener);
  }, []);

  return { currentRoute, params };
};
