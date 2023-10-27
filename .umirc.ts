import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'G6 React Node Fixed',
  outputPath: 'docs',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  resolve: { includes: ['doc', 'src'] },
  publicPath: '/g6-react-node-fixed/',
  base: '/g6-react-node-fixed/',
  dynamicImport: {
    loading: '@/Loading',
  },
  // more config: https://d.umijs.org/config
});
