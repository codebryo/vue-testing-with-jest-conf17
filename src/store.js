import uuidV4 from 'uuid/v4'

export default {

  state: {
		items: []
	},

  mutations: {
		record(state, item) {
			state.items.push(item)
		},

		completed(state, item) {
      let index = state.items.indexOf(item)
      state.items[index].done = true
		},

		remove(state, item) {
			let index = state.items.indexOf(item)
			state.items.splice(index, 1)
		}
	},

	actions: {
    /**
     * This record action is deeply bound into the Store,
     * so we need to be sure that our commit function works,
     * and it uses an imported npm package
     */
		record({ commit }, text) {
      commit('record', { text, done: false, uuid: uuidV4() })
    },

    /**
     * Delayed record does the same thing as above, but it
     * will allow us to mock a timeout call :)
     */
		delayedRecord({ commit }, text) {
			setTimeout(() => {
				commit('record', { text, done: false, uuid: uuidV4() })
			}, 10000)
		}
	}
}


