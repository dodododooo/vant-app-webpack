import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, ModuleTree } from 'vuex'


export interface State {
  count: number
}

const files = require.context('./modules', false, /\.ts$/);
const modules: ModuleTree<State> = {};

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
})

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0
  },
  modules: {
    ...modules
  }
})

console.log(store)
export function useStore() {
  return baseUseStore(key)
}
