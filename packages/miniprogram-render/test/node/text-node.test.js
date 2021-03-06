const mock = require('../mock');
const Node = require('../../src/node/node');

let document;

beforeAll(() => {
  const res = mock.createPage('home');
  document = res.document;
});

test('text-node: nodeName/nodeType', () => {
  const node = document.createTextNode('haha e hehe');
  expect(node.nodeType).toBe(Node.TEXT_NODE);
  expect(node.nodeName).toBe('#text');
});

test('text-node: nodeValue/textContent', () => {
  const node1 = document.createElement('div');
  const node2 = document.createTextNode('haha');
  document.body.appendChild(node1);

  let updateCount = 0;
  const onUpdate = function () {
    updateCount++;
  };
  node1.addEventListener('$$childNodesUpdate', onUpdate);

  node1.appendChild(node2);
  expect(node2.textContent).toBe('haha');
  expect(node2.nodeValue).toBe('haha');
  expect(updateCount).toBe(1);

  node2.textContent = 'hehe';
  expect(node2.textContent).toBe('hehe');
  expect(node2.nodeValue).toBe('hehe');
  expect(updateCount).toBe(2);

  node2.nodeValue = 'hoho';
  expect(node2.textContent).toBe('hoho');
  expect(node2.nodeValue).toBe('hoho');
  expect(updateCount).toBe(3);

  node1.removeEventListener('$$childNodesUpdate', onUpdate);
  document.body.removeChild(node1);
});

test('text-node: cloneNode', () => {
  const node1 = document.createTextNode('abc');
  const node2 = node1.cloneNode();
  expect(node2).not.toBe(node1);
  expect(node2.$$nodeId).not.toBe(node1.$$nodeId);
  expect(node2.$$pageId).toBe(node1.$$pageId);
  expect(node2.textContent).toBe(node1.textContent);
  expect(node2.nodeType).toBe(Node.TEXT_NODE);
});
