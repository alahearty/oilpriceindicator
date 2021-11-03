import { createStore } from 'vuex'

import oilPrice from "./modules/oilPrice.js"

const store = createStore({
  modules: {oilPrice}
})

export default store;