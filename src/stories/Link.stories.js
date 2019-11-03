import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs/react';
import { Link as RelativeLink } from '../components';

const ChildA = props => {
  return (
    <div style={{ margin: '0 0 20px 40px' }}>
      <div>这里是子页面A</div>
      <div>这里是子页面A</div>
      <div>这里是子页面A</div>
      <div>这里是子页面A</div>
      <div>这里是子页面A</div>
      <div style={{ margin: '20px 0 0 0' }}>
        <RelativeLink to="..">返回父页面</RelativeLink>
        <span style={{ display: 'inline-block', margin: '0 20px' }}></span>
        <RelativeLink to="../b">返回兄弟页面B</RelativeLink>
      </div>
    </div>
  );
};

const ChildB = props => {
  return (
    <div style={{ margin: '0 0 20px 40px' }}>
      <div>这里是子页面B</div>
      <div>这里是子页面B</div>
      <div>这里是子页面B</div>
      <div>这里是子页面B</div>
      <div>这里是子页面B</div>
      <div style={{ margin: '20px 0 0 0' }}>
        <RelativeLink to="..">返回父页面</RelativeLink>
        <span style={{ display: 'inline-block', margin: '0 20px' }}></span>
        <RelativeLink to="../a">返回兄弟页面A</RelativeLink>
      </div>
    </div>
  );
};

const Parent = props => {
  const { url } = useRouteMatch();
  return (
    <div>
      <div
        style={{ background: '#F6F9FC', padding: '20px', margin: '0 0 30px 0' }}
      >
        <div style={{ margin: '0 0 10px 0' }}>这里是父页面</div>
        <div>
          <RelativeLink to="./a">去子页面A</RelativeLink>
          <span style={{ display: 'inline-block', margin: '0 20px' }}></span>
          <RelativeLink to="./b">去子页面B</RelativeLink>
        </div>
      </div>
      <Switch>
        <Route path={`${url}/a`} component={ChildA} />
        <Route path={`${url}/b`} component={ChildB} />
      </Switch>
    </div>
  );
};

storiesOf('Link', module)
  .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return <Link to="/parent">进入</Link>;
            }}
          />
          <Route path="/parent" component={Parent} />
        </Switch>
      </Router>
    );
  });
