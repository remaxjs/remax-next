import * as t from '@babel/types';
import type { Plugin, Meta, HostComponent, Platform, Options } from '@remax/types';
import { merge } from 'lodash';
import yargs from 'yargs';

export default class API {
  public plugins: Plugin[] = [];
  public adapter = {
    name: '',
    target: '',
    packageName: '',
    options: {},
  };
  public meta = {
    global: '',
    template: {
      extension: '',
      tag: '',
      src: '',
    },
    style: '',
    jsHelper: {
      extension: '',
      tag: '',
      src: '',
    },
    include: {
      tag: '',
      src: '',
    },
  };

  public getMeta() {
    let meta: Meta = {
      global: '',
      template: {
        extension: '',
        tag: '',
        src: '',
      },
      style: '',
      jsHelper: {
        extension: '',
        tag: '',
        src: '',
      },
      ejs: {
        page: '',
      },
    };

    this.plugins.forEach(plugin => {
      meta = merge(meta, plugin.meta || {});
    });

    return meta;
  }

  extendCLI(cli: yargs.Argv) {
    this.plugins.forEach(plugin => {
      if (typeof plugin.extendCLI === 'function') {
        plugin.extendCLI({ cli });
      }
    });
  }

  public processProps(componentName: string, props: string[], additional?: boolean, node?: t.JSXElement) {}

  onBuildStart(config: Options) {}

  onAppConfig(config: any) {}

  onPageConfig({ page, config }: { page: string; config: any }) {}

  configWebpack(params: any) {}

  configBabel(params: { config: any }) {}

  onPageTemplate({ template, page }: { template: string; page: string }) {}

  getRuntimePluginFiles() {}

  loadBuiltinPlugins(options: Options) {}

  public registerAdapterPlugins(targetName: Platform) {}

  public registerPlugins(plugins: Plugin[]) {}

  private registerHostComponents(components?: Map<string, HostComponent>) {}
}
