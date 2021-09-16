import React, {FC, useEffect} from 'react';
import {useLocation, Switch, Redirect, Route} from 'react-router-dom';
import config from './config';

const Page: FC = () => {
  useEffect(() => {
  });

  const location = useLocation();

  if (location.pathname === '/') {
    return <Redirect to='/corpus' />;
  }

  return (
    <Switch>
      <Route exact path='/404' render={(): React.ReactNode => <div>404</div>} />
      {config.map((conf, index) => {
        const {path, component: Component} = conf;
        return <Route {...{[['key'][0]]: index}} path={path} render={(props): React.ReactNode => <Component {...props} />} />;
      })}
    </Switch>
  );
};

export default Page;