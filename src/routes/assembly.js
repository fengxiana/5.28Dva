import dynamic from 'dva/dynamic' //组件异步加载

const app = window.app

const Home = dynamic({
  app,
  component: () => import('../pages/home'),
})

export {
  Home
}