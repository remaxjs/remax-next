import * as React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <div>hello world!!!</div>;
};

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);
const root = createRoot(container);

root.render(<App />);
