import React, { useMemo } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import path from 'path';

const withRelative = Comp => {
  return ({ to, dynamic = false, ...rest }) => {
    const { url } = useRouteMatch();
    const location = useLocation();

    const pathname = useMemo(() => {
      return location.pathname;
    }, [location]);

    const realTo = useMemo(() => {
      return path.join(dynamic ? pathname : url, to);
    }, [dynamic, pathname, url, to]);

    return <Comp {...rest} to={realTo} />;
  };
};

export default withRelative;
