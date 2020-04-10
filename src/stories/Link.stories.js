import React, { useMemo } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs/react';
import { Link as RelativeLink } from '../components';

const StandardDemo = () => {
  const ChildA = props => {
    return (
      <div style={{ margin: '0 0 20px 40px' }}>
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
          style={{
            background: '#F6F9FC',
            padding: '20px',
            margin: '0 0 30px 0',
          }}
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
};

const DynamicDemo = () => {
  const data = useMemo(() => {
    return [
      {
        name: 'china',
        provinces: ['beijing', 'shanghai', 'jiangsu'],
      },
      {
        name: 'us',
        provinces: ['california', 'seattle', 'florida'],
      },
    ];
  }, []);

  const Countries = props => {
    const { url } = useRouteMatch();
    return (
      <div>
        <div style={{ margin: '0 0 10px 0' }}>这里是国家列表</div>

        <ul>
          {data.map(({ name }) => {
            return (
              <li key={name}>
                <RelativeLink to={name}>{name}</RelativeLink>
              </li>
            );
          })}
        </ul>

        <Switch>
          <Route path={`${url}/:name`} component={Country} />
        </Switch>
      </div>
    );
  };

  const Country = () => {
    const { name } = useParams();
    const { url } = useRouteMatch();
    const country = useMemo(() => {
      return data.find(i => i.name === name);
    }, [name]);

    return (
      <div
        style={{
          padding: '20px',
        }}
      >
        <div style={{ margin: '0 0 20px 0' }}>
          <RelativeLink to="..">返回</RelativeLink>
          <span style={{ display: 'inline-block', margin: '0 20px' }}></span>
          <RelativeLink to=".." dynamic={true}>
            返回(dynamic=true)
          </RelativeLink>
        </div>

        <div style={{ margin: '0 0 10px 0' }}>国家：{country.name}</div>

        <ul>
          {country.provinces.map(name => {
            return (
              <li key={name}>
                <RelativeLink to={name}>{name}</RelativeLink>
              </li>
            );
          })}
        </ul>

        <Switch>
          <Route path={`${url}/:name`} component={Province} />
        </Switch>
      </div>
    );
  };

  const Province = () => {
    const { name } = useParams();

    return (
      <div
        style={{
          padding: '20px',
        }}
      >
        <div>省份：{name}</div>
      </div>
    );
  };

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return <Link to="/country">进入国家列表</Link>;
          }}
        />
        <Route path="/country" component={Countries} />
      </Switch>
    </Router>
  );
};

storiesOf('Link', module)
  .addDecorator(withKnobs)
  .add('标准', StandardDemo)
  .add('动态', DynamicDemo);
