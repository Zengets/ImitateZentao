import { defineConfig } from 'umi';
import initialRouter from './config/router.config';

export default defineConfig({
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
  routes: initialRouter,
});
