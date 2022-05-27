import yargs from 'yargs';
import yargsParser from 'yargs-parser';
import type { Options } from '@remax/types';
import { internalBuildApp } from './build';
import getConfig from './config/getConfig';
import API from './api';

export default class RemaxCLI {
  options?: Options;
  api?: API;

  run(args: any, callback?: yargs.ParseCallback) {
    const argv: any = yargsParser(args);
    process.env.REMAX_PLATFORM = argv.t || argv.target || 'ali';

    // 获取配置数据
    this.options = getConfig();
    const cli = this.initCLI();
    this.api = new API();

    this.api.registerPlugins(this.options.plugins);
    this.api.extendCLI(cli);

    if (args.length === 0) {
      cli.showHelp();
    }
    return cli.parse(args, callback);
  }

  initCLI() {
    return (
      yargs
        .scriptName('remax')
        .usage('Usage: $0 <command> [options]')
        .command<any>(
          'build',
          '编译项目',
          y => {
            y.option('watch', {
              describe: '监听文件变化',
              alias: 'w',
              type: 'boolean',
              default: false,
            })
              .option('target', {
                describe: '目标平台',
                alias: 't',
                type: 'string',
                default: 'ali',
              })
              .option('notify', {
                describe: '编译错误提醒',
                alias: 'n',
                type: 'boolean',
                default: false,
              })
              .option('port', {
                describe: '指定端口号',
                alias: 'p',
                type: 'number',
              })
              .option('minimize', {
                describe: '最小化文件',
                alias: 'm',
                type: 'boolean',
                default: false,
              })
              .option('analyze', {
                describe: '编译分析',
                alias: 'a',
                type: 'boolean',
                default: false,
              })
              .option('loglevel', {
                describe: '展示日志级别',
                type: 'string',
                default: 'verbose',
              });
          },
          (argv: any) => {
            internalBuildApp({ ...this.options, ...argv }, this.api!);
          }
        )
        /*
      .command<any>('mini-plugin', '插件相关命令', y => {
        y.command(
          'build',
          '编译插件',
          y => {
            y.option('watch', {
              describe: '监听文件变化',
              alias: 'w',
              type: 'boolean',
              default: false,
            }).option('target', {
              describe: '目标平台',
              alias: 't',
              type: 'string',
            });
          },
          (argv: any) => {
            buildMiniPlugin({ ...this.options, ...argv });
          }
        );
      })
*/
        .help()
    );
  }
}
