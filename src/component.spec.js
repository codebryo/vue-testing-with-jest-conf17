import Vue from 'vue/dist/vue.common'
// As we use standard templates we'll need to use that version
import Component from './component'

/**
 * Group your specs with
 * - describe
 *    - it/test
 * For a readable output
 */

describe('Shopping-list component', () => {
  let $mounted

  beforeEach(() => {
    $mounted = new Vue(Component).$mount()
  })

  /**
   * Here we want to test the output of the rendered HTML
   * Also, you can do multiple Snapshots in a row
   *
   * The snapshots are stored in the __snapshots__ directory,
   * and get checked in to your repo along the specs.
   *
   * Notice: Here we use Snapshots for testing HTML output,
   * though you can snapshot any kind of string, like a
   * stringified Object
   */
  test('snapshot', () => {
    let $html = $mounted.$el.outerHTML
    expect($html).toMatchSnapshot()

    $mounted.items[1].done = true

    Vue.nextTick(() => {
      // Get the latest HTML as it has changed now
      $html = $mounted.$el.outerHTML
      expect($html).toMatchSnapshot()
    })

  })

  /**
   * Let's test two things at once.
   * 1. We want to be sure that the click event is correctly set on the button elements
   * 2. The click should call the completed method, so we can assert the result of that call at the same time
   */
  test('click', () => {
    let lis = $mounted.$el.querySelectorAll('li')
    let button = lis[1].querySelector('button')

    let customEvent = new Event('click')
    button.dispatchEvent(customEvent)

    expect($mounted.items[1].done).toBeTruthy()
  })
})
