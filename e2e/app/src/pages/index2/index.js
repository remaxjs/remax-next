import * as React from 'react';
import { render } from 'react-dom';

const App = () => {
  return <div>hello world</div>;
};

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

render(<App />, container);
