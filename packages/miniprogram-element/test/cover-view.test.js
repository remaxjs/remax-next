const _ = require('./utils');

test('cover-view', async () => {
  const page = global.$$page;
  const componentId = _.load(
    {
      template: `<element class="h5-body" style="width: 100%; height: 100%;" data-private-node-id="e-body" data-private-page-id="${page.pageId}"></element>`,
      usingComponents: {
        element: _.elementId,
      },
    },
    'page'
  );
  const component = _.render(componentId);

  const wrapper = document.createElement('wrapper');
  document.body.appendChild(wrapper);
  component.attach(wrapper);
  expect(
    _.match(
      component.dom,
      `<element class="h5-body" style="width: 100%; height: 100%;" data-private-node-id="e-body" data-private-page-id="${page.pageId}"></element>`
    )
  ).toBe(true);

  const body = component.querySelector('.h5-body');
  const node = page.document.createElement('wx-component');
  node.setAttribute('behavior', 'cover-view');
  page.document.body.appendChild(node);
  await _.sleep(10);

  // scrollTop
  expect(body.data.childNodes[0].extra.scrollTop).toBe(undefined);
  node.setAttribute('scroll-top', 20);
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.scrollTop).toBe('20');
  node.setAttribute('scroll-top', 0);
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.scrollTop).toBe('0');
  node.setAttribute('scroll-top', '30');
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.scrollTop).toBe('30');
  node.setAttribute('scroll-top', '0');
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.scrollTop).toBe('0');
  node.setAttribute('scroll-top', '10px');
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.scrollTop).toBe('10px');
  node.setAttribute('scroll-top', 'abc');
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.scrollTop).toBe('abc');
  node.setAttribute('scroll-top', undefined);
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.scrollTop).toBe(null);

  // markerId
  expect(body.data.childNodes[0].extra.markerId).toBe(undefined);
  node.setAttribute('marker-id', 12);
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.markerId).toBe('12');
  node.setAttribute('marker-id', 0);
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.markerId).toBe('0');
  node.setAttribute('marker-id', 'abc');
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.markerId).toBe('abc');
  node.setAttribute('marker-id', undefined);
  await _.sleep(10);
  expect(body.data.childNodes[0].extra.markerId).toBe(null);

  page.document.body.removeChild(node);
  document.body.removeChild(wrapper);
});
