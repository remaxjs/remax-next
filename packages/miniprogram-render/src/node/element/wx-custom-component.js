const Element = require('../element');
const Pool = require('../../util/pool');
const cache = require('../../util/cache');

const pool = new Pool();

class WxCustomComponent extends Element {
  /**
   * 创建实例
   */
  static $$create(options, tree) {
    const config = cache.getConfig();

    if (config.optimization.elementMultiplexing) {
      // 复用 element 节点
      const instance = pool.get();

      if (instance) {
        instance.$$init(options, tree);
        return instance;
      }
    }

    return new WxCustomComponent(options, tree);
  }

  /**
   * 覆写父类的 $$init 方法
   */
  $$init(options, tree) {
    this.$_behavior = options.componentName;

    super.$$init(options, tree);
  }

  /**
   * 覆写父类的 $$destroy 方法
   */
  $$destroy() {
    super.$$destroy();

    this.$_behavior = null;
  }

  /**
   * 覆写父类的回收实例方法
   */
  $$recycle() {
    this.$$destroy();

    const config = cache.getConfig();

    if (config.optimization.elementMultiplexing) {
      // 复用 element 节点
      pool.add(this);
    }
  }

  get behavior() {
    return this.$_behavior;
  }

  setAttribute(name, value) {
    if (name.indexOf('kbone-func-') === 0) {
      // 特殊属性，用于传入函数
      const realName = name.slice('kbone-func-'.length);
      if (typeof value === 'function') {
        super.setAttribute(realName, value);
      } else {
        const window = cache.getWindow(this.$_pageId);
        super.setAttribute(realName, window[value]);
      }
    } else {
      super.setAttribute(name, value);
    }
  }
}

module.exports = WxCustomComponent;
