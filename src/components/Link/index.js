import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import path from 'path';

export default ({ to, ...rest }) => {
  const { url } = useRouteMatch();
  const realTo = path.join(url, to);
  return <Link {...rest} to={realTo} />;
};
