const _ = require('./utils');

test('ad-custom', async () => {
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
  node.setAttribute('behavior', 'ad-custom');
  page.document.body.appendChild(node);
  await _.sleep(10);

  // unitId
  await _.checkString(body, node, 'unitId', 'unit-id', '');

  // adIntervals
  await _.checkNumber(body, node, 'adIntervals', 'ad-intervals', 0);

  // event
  await _.checkEvent(body.querySelector('.h5-wx-component'), node, ['load', 'error']);

  page.document.body.removeChild(node);
  document.body.removeChild(wrapper);
});
