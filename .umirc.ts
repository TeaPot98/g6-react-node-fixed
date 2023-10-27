import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'G6 React Node Fixed',
  favicon:
    'https://gw.alipayobjects.com/zos/antfincdn/cfg5jFqgVt/DiceGraph.png',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/cfg5jFqgVt/DiceGraph.png',
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
