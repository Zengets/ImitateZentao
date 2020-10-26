import { defineConfig } from 'umi';
import initialRouter from './config/router.config';
let { NODE_ENV, APP_TYPE, TEST, npm_config_argv } = process.env;
let allOk = JSON.parse(npm_config_argv).original,
  allStr = allOk[allOk.length - 1];
let IpAndPort = '';

if (allStr) {
  if (allStr.indexOf('9000') != -1) {
    IpAndPort = 'http://172.21.3.155:8081/';
  } else if (allStr.indexOf('9001') != -1) {
    IpAndPort = 'http://172.21.3.96:8501/';
  } else if (allStr.indexOf('9003') != -1) {
    IpAndPort = 'http://172.21.3.85:8088/';
  } else {
    IpAndPort = 'http://172.21.3.8/zentao/'; //http://172.21.3.5/zentao/
  }
}

export default defineConfig({
  request: {
    dataField: '',
  },
  targets: {
    ie: 11,
  },
  hash: true,
  publicPath: './',
  manifest: {
    basePath: './',
  },
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    skipModelValidate: true,
    immer: true,
  },
  antd: {
    dark: false,
    compact: false,
  },
  title: '南高项目管理云平台',
  theme: {
    'primary-color': '#1183fb',
    'font-size-base': '12px',
  },
  routes: initialRouter,
  //favicon: '/assets/favicon.ico',
  proxy: {
    '/zentao/': {
      target: IpAndPort,
      changeOrigin: true,
      pathRewrite: { '^/zentao': '' },
    },
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    },
  ],
});
