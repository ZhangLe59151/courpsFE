import {fisrtToLowercase} from '../common/js/tools';

type Stores = {}

function getStores(context): Stores {
  const stores: Stores = {};
  const keys = context.keys();
  // eslint-disable-next-line
  keys.forEach(k => {
    if (k !== './index.js') {
      const match = k.match(/\.\/([a-zA-Z]*)*\./);
      if (!!match && match.length >= 1) {
        const storeName = fisrtToLowercase(match[1]);
        stores[storeName] = context(k).default || context(k);
      }
    }
  });

  return stores;
}

export default getStores(require.context('./', false, /Store\.(ts|js)$/));
