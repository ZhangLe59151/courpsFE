import AsyncComponent from '../components/AsyncComponent';

export default [
  {
    path: '/corpus',
    component: AsyncComponent(() => import(/* webpackChunkName: "CarbonPortfolio" */ './CourpusPage'))
  }
];
