// ref: https://umijs.org/config/
import { primaryColor } from '../src/defaultSettings';
import pageRoutes from './router.config';
import theme from '../src/theme/index';
// 默认扩展配置
let prodConfig = {
  // outputPath: './dist',
  // base: '/',
  // publicPath:  '/',
}
// 打包到home目录，且后端目录配置是会配置成home
if (process.env.Build_PATH === 'home') {
  prodConfig = {
    outputPath: './' + process.env.Build_PATH,
    base: '/'+ process.env.Build_PATH, // 部署到非根目录(home)时配置的目录名。
    publicPath:  '/'+ process.env.Build_PATH + '/', // 静态资源文件，部署到非根目录。
  }
}
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  ...prodConfig,
  targets: {
    ie: 11,
  },

  /**
   * 路由相关配置
   */
  // 路由配置
  routes: pageRoutes,
  disableRedirectHoist: true,

  /**
   * webpack 相关配置
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: theme,
  externals: {
    '@antv/data-set': 'DataSet',
  },
  proxy: {
    // '/server/api/': {
    //   target: 'https://preview.pro.ant.design/',
    //   changeOrigin: true,
    //   pathRewrite: { '^/server': '' },
    // },
    // 代理接口
    '/web': {
      // target: 'http://172.16.13.83:8080', // 陈煜平
      // target: 'http://172.16.14.112:8080', // 陈阳滨
      target: 'http://172.16.13.93:83', // 洪一凯
      // target: 'http://172.16.14.16:8080', // 洪跃宗
      // target: 'http://172.16.13.83:80', // 刘晓鹏
      // target: 'https://www.easy-mock.com/mock/5c66587232c17d1aea8143b8', // 'http://172.16.13.6:8080',//
      changeOrigin: true,
      // pathRewrite: { '^/web': '/' },
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/app/',
  },

};
