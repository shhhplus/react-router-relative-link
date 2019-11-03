# react-router-relative-link

## Introduction

- A wrapper around react-router's Link and NavLink that allows relative paths.

- **Supports react-router-dom 5.x.x**

## Install

`npm install @shhhplus/react-router-relative-link --save`

## How to use

```jsx
import { Link, NavLink } from '@shhhplus/react-router-relative-link';

const Com = props => {
  return (
    <div>
      <div>
        <Link to="..">back to parent</Link>
        <Link to="../../">back to parent's parent</Link>
        <Link to="/child">to child</Link>
        <Link to="child">to child</Link>
      </div>
      <div>
        <NavLink to="..">back to parent</NavLink>
        <NavLink to="../../">back to parent's parent</NavLink>
        <NavLink to="/child">to child</NavLink>
        <NavLink to="child">to child</NavLink>
      </div>
    </div>
  );
};
```
