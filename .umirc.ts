import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    skipModelValidate: true,
    immer: true,
  },
  routes: [{ path: '/', component: '@/pages/index' }],
});
