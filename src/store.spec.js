// Be sure to mock the external package
jest.mock('uuid/v4')

import store from './store'
import Vue from 'vue'
import Vuex from 'vuex'
import uuidV4 from 'uuid/v4'

jest.useFakeTimers();

describe('shopping list store', () => {

  /**
   * That would be an exmple for testing a default value,
   * but I think it honestly makes no sense.
   * This spec will probably never save your bacon
   */
  test('defaults', () => {
    expect(store.state.items).toEqual([])
  })

  /**
   * Let's test our mutations,
   * the nice thing here is, we can completely mock everything to our needs.
   */
  describe('mutations', () => {

    test('#record adds passed value to items', () => {
      let mockEntry = {text: 'Milk', done: false}
      let state = { items: [] }

      store.mutations.record(state, mockEntry)

      expect(state.items).toEqual([mockEntry])
    })

    test('#completed updates the `done` attribute', () => {
      let mockEntry = {text: 'Milk', done: false}
      let state = { items: [mockEntry] }

      store.mutations.completed(state, mockEntry)

      expect(state.items[0].done).toBeTruthy()
    })

    test('#remove will remove given entry from the items array', () => {
      let mockEntry = {text: 'Milk', done: false}
      let state = { items: [mockEntry] }

      store.mutations.remove(state, mockEntry)

      expect(state.items.length).toBe(0)
    })

  })

  /**
   * Let's test our actions now.
   * Actions are a little more challenging,
   * so either we mock all the commit methods and assert against those,
   * or we instantiate a Vuex instance and just assert in that context, what is preferable in most cases.
   */
  describe('actions', () => {
    let $store

    beforeAll(() => {
      Vue.use(Vuex) // We need to call Vue.use once to satisfy Vuex
      $store = new Vuex.Store(store)
    })

    beforeEach(() => {
      uuidV4.mockImplementation(() => 23);
    })

    afterEach(() => {
      uuidV4.mockReset()
    })

    /**
     * Let's start with  a simple assertion, that
     * will just verify that we have one entry.
     */
    test('#record should prepare and object -- bad version', () => {
      // In this case we have uuidV4 already mocked,
      // but let's bring some randomness back into the game

      // IMPORTANT: Do to a bug in jest this inflicts all mocks
      // uuidV4.mockImplementation(() => Math.ceil(Math.random() * 10000))

      $store.dispatch('record', 'Hello')
      console.log(
        'The object with a random value:',
        JSON.stringify($store.state.items[0])
      )
      expect($store.state.items.length).toBe(1)
    })

    /**
     * Now let's verify that the actual generated object
     * behaves like we expect. For that we need to mock the
     * external npm package that's coming in.
     */
    test('#record should prepare an object -- good version', () => {
      $store.dispatch('record', 'Hello')

      expect(uuidV4).toHaveBeenCalled()
      expect($store.state.items[0]).toEqual({
        text: 'Hello',
        done: false,
        uuid: 23
      })
    })

     /**
       * Let's test our delay function.
       * This demonstrates how easy it actually is to mock Timers.
       */
    test('#recorddelay should prepare the object after 10 seconds', () => {
      $store.dispatch('delayedRecord', 'Hello')

      jest.runAllTimers();

      // We can even assert agains the setTimeout function
      // https://facebook.github.io/jest/docs/en/timer-mocks.html#content
      expect(setTimeout.mock.calls.length).toBe(1)
      expect(setTimeout.mock.calls[0][1]).toBe(10000)


      expect($store.state.items[0]).toEqual({
        text: 'Hello',
        done: false,
        uuid: 23,
      })

      // If the object maybe is quite complex
      // and the assertion in place makes it hard to read,
      // you could use a Snapshot
      expect(JSON.stringify($store.state.items[0])).toMatchSnapshot()
    })

  })

})
